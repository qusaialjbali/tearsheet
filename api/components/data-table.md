# Data table (Tearsheet, Content)

Readable table with a caption, scoped headers, right-aligned numbers and status badges. Scrolls sideways on small screens.

**Why it works:** Right-align numbers and use tabular figures so digits line up. A <caption> names the table for screen-reader users.

**Checked:** axe clean in light and dark; tightest text contrast 4.79:1 (needs 4.5:1); 1 tab stop; fits a phone in RTL with Arabic: yes; with 40% longer text: yes; contrast holds with a fitted brand: yes.

Requires the shared design tokens once per project: https://qusaialjbali.github.io/tearsheet/api/tokens.css

## HTML + CSS

`index.html`

```html
<!-- tearsheet data-table v6d5190be · https://qusaialjbali.github.io/tearsheet/zine/parts/data-table.html -->
<div class="table-wrap" tabindex="0" role="region" aria-labelledby="invoices-caption">
  <table class="table">
    <caption id="invoices-caption">Recent invoices</caption>
    <thead>
      <tr>
        <th scope="col">Invoice</th>
        <th scope="col">Customer</th>
        <th scope="col">Status</th>
        <th scope="col" class="num">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>#1042</td>
        <td>Northwind Traders</td>
        <td><span class="status status-paid">Paid</span></td>
        <td class="num">$1,200.00</td>
      </tr>
      <tr>
        <td>#1041</td>
        <td>Globex Corp</td>
        <td><span class="status status-due">Due</span></td>
        <td class="num">$860.50</td>
      </tr>
      <tr>
        <td>#1040</td>
        <td>Initech</td>
        <td><span class="status status-late">Overdue</span></td>
        <td class="num">$3,075.00</td>
      </tr>
    </tbody>
  </table>
</div>
```

`styles.css`

```css
/* tearsheet data-table v6d5190be · https://qusaialjbali.github.io/tearsheet/zine/parts/data-table.html */
.table-wrap {
  width: 100%;
  overflow-x: auto;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
}
.table-wrap:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.table { width: 100%; min-width: 420px; border-collapse: collapse; font-size: 14px; }
.table caption {
  padding: 16px 20px 8px;
  font-size: 16px;
  font-weight: 700;
  text-align: start;
  color: var(--ui-text);
}
.table th, .table td { padding: 12px 16px; text-align: start; white-space: nowrap; }
.table th {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--ui-muted);
  border-bottom: 1px solid var(--ui-border);
}
.table td { color: var(--ui-text); border-bottom: 1px solid var(--ui-border); }
.table tbody tr:last-child td { border-bottom: 0; }
.table tbody tr:hover { background: var(--ui-surface-2); }
.table .num { text-align: right; font-variant-numeric: tabular-nums; }
.status { padding: 3px 10px; font-size: 12px; font-weight: 600; border-radius: 999px; }
.status-paid { color: var(--ui-success); background: var(--ui-success-soft); }
.status-due { color: var(--ui-warning); background: var(--ui-warning-soft); }
.status-late { color: var(--ui-danger); background: var(--ui-danger-soft); }
```

## React

`DataTable.jsx`

```jsx
/* tearsheet data-table v6d5190be · https://qusaialjbali.github.io/tearsheet/zine/parts/data-table.html */
import './DataTable.css';

export function DataTable() {
  return (
    <div className="table-wrap" tabIndex={0} role="region" aria-labelledby="invoices-caption">
      <table className="table">
        <caption id="invoices-caption">Recent invoices</caption>
        <thead>
          <tr>
            <th scope="col">Invoice</th>
            <th scope="col">Customer</th>
            <th scope="col">Status</th>
            <th scope="col" className="num">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#1042</td>
            <td>Northwind Traders</td>
            <td><span className="status status-paid">Paid</span></td>
            <td className="num">$1,200.00</td>
          </tr>
          <tr>
            <td>#1041</td>
            <td>Globex Corp</td>
            <td><span className="status status-due">Due</span></td>
            <td className="num">$860.50</td>
          </tr>
          <tr>
            <td>#1040</td>
            <td>Initech</td>
            <td><span className="status status-late">Overdue</span></td>
            <td className="num">$3,075.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
```

`DataTable.css`

```css
/* tearsheet data-table v6d5190be · https://qusaialjbali.github.io/tearsheet/zine/parts/data-table.html */
.table-wrap {
  width: 100%;
  overflow-x: auto;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
}
.table-wrap:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.table { width: 100%; min-width: 420px; border-collapse: collapse; font-size: 14px; }
.table caption {
  padding: 16px 20px 8px;
  font-size: 16px;
  font-weight: 700;
  text-align: start;
  color: var(--ui-text);
}
.table th, .table td { padding: 12px 16px; text-align: start; white-space: nowrap; }
.table th {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--ui-muted);
  border-bottom: 1px solid var(--ui-border);
}
.table td { color: var(--ui-text); border-bottom: 1px solid var(--ui-border); }
.table tbody tr:last-child td { border-bottom: 0; }
.table tbody tr:hover { background: var(--ui-surface-2); }
.table .num { text-align: right; font-variant-numeric: tabular-nums; }
.status { padding: 3px 10px; font-size: 12px; font-weight: 600; border-radius: 999px; }
.status-paid { color: var(--ui-success); background: var(--ui-success-soft); }
.status-due { color: var(--ui-warning); background: var(--ui-warning-soft); }
.status-late { color: var(--ui-danger); background: var(--ui-danger-soft); }
```

## Vue

`DataTable.vue`

```vue
<!-- tearsheet data-table v6d5190be · https://qusaialjbali.github.io/tearsheet/zine/parts/data-table.html -->
<template>
  <div class="table-wrap" tabindex="0" role="region" aria-labelledby="invoices-caption">
    <table class="table">
      <caption id="invoices-caption">Recent invoices</caption>
      <thead>
        <tr>
          <th scope="col">Invoice</th>
          <th scope="col">Customer</th>
          <th scope="col">Status</th>
          <th scope="col" class="num">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>#1042</td>
          <td>Northwind Traders</td>
          <td><span class="status status-paid">Paid</span></td>
          <td class="num">$1,200.00</td>
        </tr>
        <tr>
          <td>#1041</td>
          <td>Globex Corp</td>
          <td><span class="status status-due">Due</span></td>
          <td class="num">$860.50</td>
        </tr>
        <tr>
          <td>#1040</td>
          <td>Initech</td>
          <td><span class="status status-late">Overdue</span></td>
          <td class="num">$3,075.00</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-wrap {
  width: 100%;
  overflow-x: auto;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
}
.table-wrap:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.table { width: 100%; min-width: 420px; border-collapse: collapse; font-size: 14px; }
.table caption {
  padding: 16px 20px 8px;
  font-size: 16px;
  font-weight: 700;
  text-align: start;
  color: var(--ui-text);
}
.table th, .table td { padding: 12px 16px; text-align: start; white-space: nowrap; }
.table th {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--ui-muted);
  border-bottom: 1px solid var(--ui-border);
}
.table td { color: var(--ui-text); border-bottom: 1px solid var(--ui-border); }
.table tbody tr:last-child td { border-bottom: 0; }
.table tbody tr:hover { background: var(--ui-surface-2); }
.table .num { text-align: right; font-variant-numeric: tabular-nums; }
.status { padding: 3px 10px; font-size: 12px; font-weight: 600; border-radius: 999px; }
.status-paid { color: var(--ui-success); background: var(--ui-success-soft); }
.status-due { color: var(--ui-warning); background: var(--ui-warning-soft); }
.status-late { color: var(--ui-danger); background: var(--ui-danger-soft); }
</style>
```

## Svelte

`DataTable.svelte`

```svelte
<!-- tearsheet data-table v6d5190be · https://qusaialjbali.github.io/tearsheet/zine/parts/data-table.html -->
<div class="table-wrap" tabindex="0" role="region" aria-labelledby="invoices-caption">
  <table class="table">
    <caption id="invoices-caption">Recent invoices</caption>
    <thead>
      <tr>
        <th scope="col">Invoice</th>
        <th scope="col">Customer</th>
        <th scope="col">Status</th>
        <th scope="col" class="num">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>#1042</td>
        <td>Northwind Traders</td>
        <td><span class="status status-paid">Paid</span></td>
        <td class="num">$1,200.00</td>
      </tr>
      <tr>
        <td>#1041</td>
        <td>Globex Corp</td>
        <td><span class="status status-due">Due</span></td>
        <td class="num">$860.50</td>
      </tr>
      <tr>
        <td>#1040</td>
        <td>Initech</td>
        <td><span class="status status-late">Overdue</span></td>
        <td class="num">$3,075.00</td>
      </tr>
    </tbody>
  </table>
</div>

<style>
.table-wrap {
  width: 100%;
  overflow-x: auto;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
}
.table-wrap:focus-visible { outline: none; box-shadow: var(--ui-focus); }
.table { width: 100%; min-width: 420px; border-collapse: collapse; font-size: 14px; }
.table caption {
  padding: 16px 20px 8px;
  font-size: 16px;
  font-weight: 700;
  text-align: start;
  color: var(--ui-text);
}
.table th, .table td { padding: 12px 16px; text-align: start; white-space: nowrap; }
.table th {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--ui-muted);
  border-bottom: 1px solid var(--ui-border);
}
.table td { color: var(--ui-text); border-bottom: 1px solid var(--ui-border); }
.table tbody tr:last-child td { border-bottom: 0; }
.table tbody tr:hover { background: var(--ui-surface-2); }
.table .num { text-align: right; font-variant-numeric: tabular-nums; }
.status { padding: 3px 10px; font-size: 12px; font-weight: 600; border-radius: 999px; }
.status-paid { color: var(--ui-success); background: var(--ui-success-soft); }
.status-due { color: var(--ui-warning); background: var(--ui-warning-soft); }
.status-late { color: var(--ui-danger); background: var(--ui-danger-soft); }
</style>
```
