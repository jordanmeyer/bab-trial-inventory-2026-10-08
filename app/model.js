export const fields = {
  initial: { label: 'Initial stock (units)', min: 0, max: 10000, value: 10 },
  minimum: { label: 'Minimum daily demand (units)', min: 0, max: 10000, value: 0 },
  maximum: { label: 'Maximum daily demand (units)', min: 0, max: 10000, value: 8 },
  reorder: { label: 'Reorder point (units)', min: 0, max: 10000, value: 5 },
  quantity: { label: 'Order quantity (units)', min: 1, max: 10000, value: 10 },
  lead: { label: 'Lead time (days)', min: 1, max: 365, value: 2 },
  days: { label: 'Horizon (days)', min: 1, max: 365, value: 30 },
  seed: { label: 'Random seed', min: 0, max: 4294967295, value: 42 },
};

export function validate(input) {
  const errors = {};
  for (const [name, field] of Object.entries(fields)) {
    const value = input[name];
    if (value === undefined || value === null || String(value).trim() === '' ||
        !Number.isInteger(Number(value)) || Number(value) < field.min || Number(value) > field.max) {
      errors[name] = `Enter a whole number from ${field.min.toLocaleString('en-US')} to ${field.max.toLocaleString('en-US')}.`;
    }
  }
  if (!errors.minimum && !errors.maximum && Number(input.minimum) > Number(input.maximum)) {
    errors.maximum = 'Maximum demand must be at least minimum demand.';
  }
  return errors;
}

export function simulate(input) {
  const errors = validate(input);
  if (Object.keys(errors).length) throw new Error(Object.values(errors).join(' '));
  const p = Object.fromEntries(Object.keys(fields).map(name => [name, Number(input[name])]));
  let stock = p.initial;
  let state = p.seed;
  let pending = [];
  const rows = [];
  const totals = { demand: 0, sales: 0, unmet: 0, received: 0, ordersPlaced: 0 };
  for (let day = 1; day <= p.days; day++) {
    const arrivals = pending.filter(order => order.due === day).reduce((sum, order) => sum + order.units, 0);
    pending = pending.filter(order => order.due > day);
    stock += arrivals;
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    const demand = p.minimum + Math.floor(state / 4294967296 * (p.maximum - p.minimum + 1));
    const sales = Math.min(stock, demand);
    const unmet = demand - sales;
    stock -= sales;
    const position = stock + pending.reduce((sum, order) => sum + order.units, 0);
    const ordered = position <= p.reorder ? p.quantity : 0;
    if (ordered) pending.push({ due: day + p.lead, units: ordered });
    rows.push({ day, arrivals, demand, sales, unmet, closing: stock, ordered });
    totals.demand += demand;
    totals.sales += sales;
    totals.unmet += unmet;
    totals.received += arrivals;
    totals.ordersPlaced += ordered ? 1 : 0;
  }
  return {
    rows, ...totals, endingStock: stock,
    outstanding: pending.reduce((sum, order) => sum + order.units, 0),
    fillRate: totals.demand ? totals.sales / totals.demand : null,
  };
}
