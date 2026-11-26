/* Line diff for `tearsheet diff`. Zero dependencies: a longest-common-subsequence table,
 * which is plenty fast for component files (a few hundred lines at most).
 */
'use strict';

/* Returns [{ op: ' ' | '-' | '+', line }] turning `a` into `b`. */
function diffLines(a, b) {
  const A = a.replace(/\r\n/g, '\n').split('\n');
  const B = b.replace(/\r\n/g, '\n').split('\n');
  const n = A.length, m = B.length;
  const L = Array.from({ length: n + 1 }, () => new Uint32Array(m + 1));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) L[i][j] = A[i] === B[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  }
  const out = [];
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (A[i] === B[j]) { out.push({ op: ' ', line: A[i] }); i++; j++; }
    else if (L[i + 1][j] >= L[i][j + 1]) out.push({ op: '-', line: A[i++] });
    else out.push({ op: '+', line: B[j++] });
  }
  while (i < n) out.push({ op: '-', line: A[i++] });
  while (j < m) out.push({ op: '+', line: B[j++] });
  return out;
}

/* Groups changes into hunks with `context` unchanged lines around each. */
function hunks(ops, context = 2) {
  const keep = new Array(ops.length).fill(false);
  ops.forEach((o, k) => {
    if (o.op === ' ') return;
    for (let d = -context; d <= context; d++) if (ops[k + d]) keep[k + d] = true;
  });
  const groups = [];
  let cur = null;
  ops.forEach((o, k) => {
    if (!keep[k]) { cur = null; return; }
    if (!cur) groups.push((cur = []));
    cur.push(o);
  });
  return groups;
}

const changed = (ops) => ops.some((o) => o.op !== ' ');

module.exports = { diffLines, hunks, changed };
