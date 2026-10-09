import { fields, validate, simulate, readRunRecord } from './model.js?v=4';
const $ = selector => document.querySelector(selector);
const form = $('#simulation');
const status = $('#status');
const results = $('#results');
const number = value => value.toLocaleString('en-US', {maximumFractionDigits:2});
let current, output, page=0;
$('#fields').innerHTML = Object.entries(fields).map(([name, field]) => `<div class="field"><label for="${name}">${field.label}</label><input id="${name}" name="${name}" type="number" inputmode="numeric" min="${field.min}" max="${field.max}" step="1" required value="${field.value}" aria-describedby="${name}-error"><span id="${name}-error" class="error"></span></div>`).join('');
const fill = value => value === null ? 'N/A (no demand)' : `${(value*100).toFixed(1)}%`;
function tableRow(values) {
  const tr=document.createElement('tr');
  for (const value of values) {const td=document.createElement('td');td.textContent=value;tr.append(td);}
  return tr;
}
function ledger() {
  $('#ledger').replaceChildren(...output.rows.slice(page*15,(page+1)*15).map(row => {
    const values=[row.day,row.opening,row.arrivals,row.demand,row.sales,row.unmet,row.closing,row.onOrder,row.position,row.ordered].map(number);
    values.push(row.nextDue || '—',`${row.closing} + ${row.onOrder} = ${row.position} ${row.ordered ? '≤' : '>'} ${current.reorder}: ${row.ordered ? `order ${row.ordered}` : 'no order'}`);
    return tableRow(values);
  }));
  $('#page-status').textContent=`Days ${page*15+1}–${Math.min((page+1)*15,output.rows.length)} of ${output.rows.length}`;
  $('#previous').disabled=page===0;$('#next').disabled=(page+1)*15>=output.rows.length;
}
function timeline() {
  const max=Math.max(1,...output.rows.flatMap(r=>[r.closing,r.arrivals]));
  const x=day=>40+(day-1)*520/Math.max(1,output.rows.length-1), y=value=>170-140*value/max;
  const line=output.rows.map(r=>`${x(r.day)},${y(r.closing)}`).join(' ');
  $('#timeline').innerHTML=`<svg viewBox="0 0 600 220" role="img" aria-label="Closing stock and morning arrivals over the run. Exact values in the paginated ledger."><path d="M40 30V170H565" fill="none" stroke="#666"/><text x="4" y="35">${max}</text><text x="12" y="175">0</text><text x="40" y="200">Day 1</text><text x="490" y="200">Day ${output.rows.length}</text><polyline points="${line}" fill="none" stroke="#012169" stroke-width="3"/>${output.rows.length===1?`<circle cx="${x(1)}" cy="${y(output.rows[0].closing)}" r="5" fill="#012169"/>`:""}${output.rows.filter(r=>r.arrivals).map(r=>`<circle cx="${x(r.day)}" cy="${y(r.arrivals)}" r="4" fill="#C84E00"/>`).join('')}</svg>`;
}
function run() {
  const input=Object.fromEntries(new FormData(form)), errors=validate(input);
  for (const name of Object.keys(fields)) {form.elements[name].setAttribute('aria-invalid',String(Boolean(errors[name])));$(`#${name}-error`).textContent=errors[name]||'';}
  if(Object.keys(errors).length){results.hidden=true;current=null;status.textContent='Correct the marked inputs, then run again.';form.elements[Object.keys(errors)[0]].focus();return;}
  current=Object.fromEntries(Object.keys(fields).map(key=>[key,Number(input[key])]));output=simulate(current);page=0;
  $('#fill').textContent=fill(output.fillRate);$('#unmet').textContent=number(output.unmet);$('#orders').textContent=number(output.ordersPlaced);$('#stock').textContent=number(output.endingStock);
  $('#run-label').textContent=`${current.days} days · Seed ${current.seed} · Demand ${current.minimum}–${current.maximum} units/day`;
  $('#summary').textContent=`${number(output.sales)} of ${number(output.demand)} units demanded were sold; ${number(output.received)} received; ${number(output.outstanding)} remain on order beyond the final day. Ending on-hand stock is separate from pipeline stock.`;
  $('#service-note').textContent=`${output.stockoutDays} of ${current.days} days had unmet demand; ${current.days-output.stockoutDays} days had none. Unit fill uses units sold ÷ units demanded, not the fraction of days without a stockout. Average closing inventory: ${number(output.averageStock)} units. ${output.demand ? '' : 'N/A is not evidence of good service: no demand tested the policy.'}`;
  $('#comparison').replaceChildren();$('#compare-status').textContent='';ledger();timeline();results.hidden=false;
  status.textContent=`Run complete. Unit fill ${fill(output.fillRate)}. Use View sample-path result to inspect the answer.`;
}
form.addEventListener('submit',e=>{e.preventDefault();run();});
function invalidate(){current=null;results.hidden=true;status.textContent='Inputs changed. Run simulation to update the outcome.';}
form.addEventListener('input',invalidate);
window.addEventListener('pageshow',()=>setTimeout(()=>{if(current&&Object.keys(fields).some(key=>form.elements[key].value===''||Number(form.elements[key].value)!==current[key]))invalidate();},0));
$('#reset-defaults').onclick=()=>{form.reset();run();};
$('#delayed-example').onclick=()=>{for(const [key,value] of Object.entries({initial:5,minimum:4,maximum:4,reorder:3,quantity:6,lead:2,days:5,seed:42}))form.elements[key].value=value;run();};
$('#previous').onclick=()=>{page--;ledger();};$('#next').onclick=()=>{page++;ledger();};
$('#compare').onclick=()=>{
  const input={...current,reorder:$('#compare-reorder').value,quantity:$('#compare-quantity').value};
  const errors=validate(input);if(Object.keys(errors).length){$('#comparison').replaceChildren();$('#compare-status').textContent=Object.values(errors).join(' ');return;}
  const other=simulate(input),table=document.createElement('table');
  table.innerHTML='<caption>Same demand path; service and stock consequences</caption><thead><tr><th>Policy (point / order units)</th><th>Unit fill</th><th>Average closing stock</th><th>Ending stock</th><th>Pipeline stock</th></tr></thead>';
  const body=document.createElement('tbody');
  for(const [label,p,r] of [['Current',current,output],['Comparison',input,other]])body.append(tableRow([`${label}: ${p.reorder} / ${p.quantity}`,fill(r.fillRate),number(r.averageStock),number(r.endingStock),number(r.outstanding)]));
  table.append(body);$('#comparison').replaceChildren(table);$('#compare-status').textContent='Compared on the identical sequence of daily demand. Costs are not modeled.';
};
for(const id of ['#compare-reorder','#compare-quantity'])$(id).oninput=()=>{$('#comparison').replaceChildren();$('#compare-status').textContent='Comparison inputs changed. Compare policies to update.';};
$('#save-run').onclick=()=>{
  const blob=new Blob([JSON.stringify({format:'inventory-policy-lab-v1',inputs:current,eventOrder:'Opening stock; morning arrivals; demand/sales; closing stock + outstanding orders; at most one order if position <= point. Due day = order day + lead.',summary:output,source:location.href},null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`inventory-seed-${current.seed}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
};
$('#restore-run').onchange=async event=>{
  const file=event.target.files[0];if(!file)return;
  try{if(file.size>1000000)throw Error('Use a run record under 1 MB.');const restored=readRunRecord(await file.text());for(const key of Object.keys(fields))form.elements[key].value=restored[key];run();status.textContent=`Restored inputs from ${file.name}; recalculated locally rather than trusting saved results.`;}
  catch(error){status.textContent=`Record rejected: ${error.message} Previous inputs and result retained.`;}event.target.value='';
};
run();
