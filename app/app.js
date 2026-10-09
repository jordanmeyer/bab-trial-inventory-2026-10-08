import { fields, validate, simulate } from './model.js';

const form = document.querySelector('#simulation');
const status = document.querySelector('#status');
const results = document.querySelector('#results');
const number = value => value.toLocaleString('en-US');

document.querySelector('#fields').innerHTML = Object.entries(fields).map(([name, field]) => `
  <div class="field"><label for="${name}">${field.label}</label>
  <input id="${name}" name="${name}" type="number" inputmode="numeric" min="${field.min}" max="${field.max}" step="1" required value="${field.value}" aria-describedby="${name}-error">
  <span id="${name}-error" class="error"></span></div>`).join('');

function run() {
  const input = Object.fromEntries(new FormData(form));
  const errors = validate(input);
  for (const name of Object.keys(fields)) {
    form.elements[name].setAttribute('aria-invalid', String(Boolean(errors[name])));
    document.querySelector(`#${name}-error`).textContent = errors[name] || '';
  }
  if (Object.keys(errors).length) {
    results.hidden = true;
    status.textContent = 'Correct the marked inputs, then run again.';
    form.elements[Object.keys(errors)[0]].focus();
    return;
  }
  const output = simulate(input);
  document.querySelector('#fill').textContent = output.fillRate === null ? 'N/A' : `${(output.fillRate * 100).toFixed(1)}%`;
  document.querySelector('#unmet').textContent = number(output.unmet);
  document.querySelector('#orders').textContent = number(output.ordersPlaced);
  document.querySelector('#stock').textContent = number(output.endingStock);
  document.querySelector('#run-label').textContent = `${input.days} days · Seed ${input.seed} · Demand ${input.minimum}–${input.maximum} units/day`;
  document.querySelector('#summary').textContent = `${number(output.sales)} units sold of ${number(output.demand)} demanded. ${number(output.received)} units received; ${number(output.outstanding)} units still on order after the final day.`;
  document.querySelector('#ledger').innerHTML = output.rows.map(row => `<tr${row.unmet ? ' class="shortage"' : ''}>${Object.values(row).map(value => `<td>${number(value)}</td>`).join('')}</tr>`).join('');
  results.hidden = false;
  status.textContent = `Simulation complete: ${input.days} days. Results updated.`;
}

form.addEventListener('submit', event => { event.preventDefault(); run(); });
form.addEventListener('input', () => {
  results.hidden = true;
  status.textContent = 'Inputs changed. Run simulation to update the outcome.';
});
document.querySelector('#reset-defaults').addEventListener('click', () => {
  form.reset();
  run();
  status.textContent = 'Defaults restored. Results updated.';
});
run();
