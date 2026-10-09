import { simulate, readRunRecord } from '../app/model.js';

const base = { initial: 10, minimum: 0, maximum: 8, reorder: 5, quantity: 10, lead: 2, days: 30, seed: 42 };
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const equal = (actual, expected) => assert(JSON.stringify(actual) === JSON.stringify(expected), `Expected ${JSON.stringify(expected)}; observed ${JSON.stringify(actual)}`);
let passed = 0;
let failed = 0;
function test(name, check) {
  const item = document.createElement('li');
  try { const detail = check(); passed++; item.textContent = `PASS — ${name}${detail ? `: ${detail}` : ''}`; }
  catch (error) { failed++; item.textContent = `FAIL — ${name}: ${error.message}`; }
  document.querySelector('#checks').append(item);
}

test('Five-day stock transitions, receipts, lost sales and outstanding-order protection', () => {
  const r = simulate({ ...base, initial: 5, minimum: 4, maximum: 4, reorder: 3, quantity: 6, days: 5 });
  equal(r.rows.map(({ arrivals, sales, unmet, closing, ordered }) => [arrivals, sales, unmet, closing, ordered]), [[0,4,0,1,6], [0,1,3,0,0], [6,4,0,2,6], [0,2,2,0,0], [6,4,0,2,6]]);
  equal([r.demand, r.sales, r.unmet, r.received, r.endingStock, r.ordersPlaced, r.outstanding, r.fillRate], [20,15,5,12,2,3,6,.75]);
  return 'sales 15; unmet 5; ending 2; orders 3; fill 75%';
});
test('Lead time one receives next morning, never on order day', () => {
  const r = simulate({ ...base, initial: 0, minimum: 1, maximum: 1, reorder: 0, quantity: 2, lead: 1, days: 3 });
  equal(r.rows.map(({ arrivals, sales, unmet, closing, ordered }) => [arrivals, sales, unmet, closing, ordered]), [[0,0,1,0,2], [2,1,0,1,0], [0,1,0,0,2]]);
  equal([r.sales, r.unmet, r.ordersPlaced, r.fillRate], [2,1,2,2/3]);
});
test('No demand has null fill rate and preserved stock', () => {
  const r = simulate({ ...base, initial: 7, minimum: 0, maximum: 0, reorder: 0 });
  equal([r.demand, r.sales, r.unmet, r.ordersPlaced, r.endingStock, r.fillRate], [0,0,0,0,7,null]);
});
test('Threshold is inclusive; arrivals beyond horizon stay outstanding', () => {
  const r = simulate({ ...base, initial: 5, minimum: 0, maximum: 0, quantity: 2, days: 1 });
  equal([r.endingStock, r.ordersPlaced, r.outstanding, r.received], [5,1,2,0]);
});
test('Seed 42 sequence from independent integer recurrence', () => {
  const r = simulate({ ...base, days: 5 });
  equal(r.rows.map(row => row.demand), [2,0,5,2,3]);
  equal(r.rows.map(row => row.closing), [8,8,3,1,8]);
  equal([r.demand, r.sales, r.unmet, r.ordersPlaced, r.endingStock], [12,12,0,1,8]);
});
test('Same seed repeats; fixed demand ignores seed; seed zero works', () => {
  equal(simulate(base), simulate(base));
  equal(simulate({ ...base, minimum: 4, maximum: 4, seed: 0 }), simulate({ ...base, minimum: 4, maximum: 4, seed: 4294967295 }));
  equal(simulate({ ...base, seed: 0, days: 1 }).rows[0].demand, 2);
  assert(JSON.stringify(simulate({ ...base, seed: 43 }).rows) !== JSON.stringify(simulate(base).rows), 'Different seed should change this sequence');
});
test('Conservation and integer boundaries across 365 days and 20 seeds', () => {
  for (let seed = 0; seed < 20; seed++) {
    const r = simulate({ ...base, days: 365, seed });
    let prior = base.initial;
    for (const day of r.rows) {
      equal(prior + day.arrivals - day.sales, day.closing);
      equal(day.demand, day.sales + day.unmet);
      assert(day.demand >= base.minimum && day.demand <= base.maximum, 'Demand escaped bounds');
      assert(Object.values(day).every(value => Number.isInteger(value) && value >= 0), 'Negative/fractional daily quantity');
      prior = day.closing;
    }
    equal(base.initial + r.received - r.sales, r.endingStock);
    equal(r.demand, r.sales + r.unmet);
    equal(r.ordersPlaced * base.quantity - r.received, r.outstanding);
  }
});
test('Uniform-demand mean sanity check with predeclared ±0.08 tolerance', () => {
  let total = 0;
  for (let seed = 0; seed < 100; seed++) total += simulate({ ...base, days: 365, seed }).demand;
  const mean = total / 36500;
  assert(Math.abs(mean - 4) <= .08, `Mean ${mean} outside [3.92, 4.08]`);
  return `mean ${mean.toFixed(6)} in [3.92, 4.08]`;
});
test('Upper limits remain finite with receipts outside horizon', () => {
  const r = simulate({ initial: 10000, minimum: 10000, maximum: 10000, reorder: 10000, quantity: 10000, lead: 365, days: 365, seed: 4294967295 });
  equal([r.demand, r.sales, r.unmet, r.received, r.ordersPlaced, r.outstanding], [3650000,10000,3640000,0,2,20000]);
});
test('Invalid, missing, fractional and out-of-range inputs are rejected', () => {
  const invalid = [{ initial: '' }, { seed: null }, { days: undefined }, { initial: -1 }, { minimum: .5 }, { maximum: Infinity }, { maximum: 'bad' }, { initial: 10001 }, { quantity: 0 }, { lead: 0 }, { lead: 366 }, { days: 366 }, { seed: 4294967296 }, { minimum: 9, maximum: 8 }];
  for (const change of invalid) {
    let threw = false;
    try { simulate({ ...base, ...change }); } catch { threw = true; }
    assert(threw, `Accepted invalid ${JSON.stringify(change)}`);
  }
  return `${invalid.length} invalid cases rejected`;
});

test('Position before ordering and next due dates explain delayed deliveries', () => {
  const r=simulate({...base,initial:5,minimum:4,maximum:4,reorder:3,quantity:6,days:5});
  equal(r.rows.map(x=>[x.opening,x.onOrder,x.position,x.nextDue]),[[5,0,1,3],[1,6,6,3],[0,0,2,5],[2,6,6,5],[0,0,2,7]]);
  equal([r.stockoutDays,r.averageStock],[2,1]);
});
test('Compared policies share demand but change inventory outcomes', () => {
  const input={...base,initial:5,minimum:4,maximum:4,reorder:3,quantity:6,days:5};
  const a=simulate(input),b=simulate({...input,reorder:6});
  equal(a.rows.map(x=>x.demand),b.rows.map(x=>x.demand));
  equal([b.sales,b.fillRate,b.averageStock,b.endingStock,b.outstanding],[17,.85,1.4,0,12]);
});
test('Saved run inputs reject coerced values before changing the form', () => {
  equal(readRunRecord(JSON.stringify({format:'inventory-policy-lab-v1',inputs:base})),base);
  for(const initial of [true,'0x10','10',null]) { let rejected=false; try{readRunRecord(JSON.stringify({format:'inventory-policy-lab-v1',inputs:{...base,initial}}));}catch{rejected=true;} assert(rejected,`Accepted ${initial}`); }
});
document.querySelector('#summary').textContent = `${passed} passed; ${failed} failed.`;
document.documentElement.dataset.testResult = failed ? 'fail' : 'pass';
