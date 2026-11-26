/* Compiles every component in every format, so a broken conversion fails CI instead of a
 * visitor's build. Uses the real compilers: esbuild (JS, JSX, CSS), @vue/compiler-sfc, svelte.
 * Run: npm run check:code
 */
'use strict';

const esbuild = require('esbuild');
const vue = require('@vue/compiler-sfc');
const svelte = require('svelte/compiler');
const cat = require('../lib/catalog');
const { auditCode } = require('../lib/audit');

const failures = [];
const fail = (c, file, err) => failures.push(c.id + ' / ' + file + ': ' + String(err && err.message ? err.message : err).split('\n')[0]);

for (const c of cat.components()) {
  for (const format of cat.FORMATS) {
    const files = cat.files(c, format, false);
    const together = files.map((f) => f.code).join('\n');
    for (const file of files) {
      // the library has to pass its own audit
      auditCode(file.code, file.name, together).forEach((x) => fail(c, format + '/' + file.name, 'audit ' + x.rule + ' (line ' + x.line + '): ' + x.message));
      const ext = file.name.split('.').pop();
      try {
        if (ext === 'css') esbuild.transformSync(file.code, { loader: 'css' });
        else if (ext === 'js') esbuild.transformSync(file.code, { loader: 'js' });
        else if (ext === 'jsx') esbuild.transformSync(file.code, { loader: 'jsx', jsx: 'automatic' });
        else if (ext === 'vue') {
          const { descriptor, errors } = vue.parse(file.code, { filename: file.name });
          if (errors.length) throw errors[0];
          if (descriptor.script || descriptor.scriptSetup) esbuild.transformSync(vue.compileScript(descriptor, { id: c.id }).content, { loader: 'js' });
          const tpl = vue.compileTemplate({ source: descriptor.template.content, filename: file.name, id: c.id });
          if (tpl.errors.length) throw tpl.errors[0];
          descriptor.styles.forEach((s) => esbuild.transformSync(s.content, { loader: 'css' }));
        } else if (ext === 'svelte') svelte.compile(file.code, { filename: file.name, generate: 'client' });
        else if (ext === 'html') {
          if (!file.code.trim().startsWith('<')) throw new Error('markup does not start with a tag');
        }
      } catch (err) {
        fail(c, format + '/' + file.name, err);
      }
    }
  }
}

const total = cat.components().length;
if (failures.length) {
  console.error(failures.length + ' problem(s) in ' + total + ' components:\n  ' + failures.join('\n  '));
  process.exit(1);
}
console.log('All ' + total + ' components compile in ' + cat.FORMATS.join(', ') + ' and pass their own audit.');
