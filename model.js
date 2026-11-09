(function(root,factory){const model=factory();if(typeof module==='object'&&module.exports)module.exports=model;else root.ReadinessModel=model})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const BASE='2026-11-09',DAY=86400000,KEY='skysupply-readiness-v2';
const day=s=>Date.parse(s+'T12:00:00Z');
const add=(s,n)=>new Date(day(s)+Math.round(n)*DAY).toISOString().slice(0,10);
const days=(a,b)=>Math.round((day(a)-day(b))/DAY);
const weeks=Array.from({length:12},(_,i)=>add(BASE,(i+1)*7));
const seedPlan=[8,9,10,10,11,12,12,13,14,14,15,16];
function initial(){return {version:2,plan:[...seedPlan],uplift:0,slippage:0,view:'Overview',role:'OEM',supplier:'s1',actions:[],events:[],parts:[
{id:'casting',code:'DEMO-CST-131',name:'APU cast housing',type:'Casting',model:'APU platform · example',art:'disk',supplier:'s1',supplierName:'Aster Foundry · demo',perBuild:1,stock:24,poQty:160,ordered:'2026-10-20',promised:'2026-12-12',lead:38,material:false,tooling:false,capacity:94,yield:91,spread:14,updated:BASE,share:{material:true,tooling:true,capacity:true,yield:true}},
{id:'bearing',code:'DEMO-BRG-131',name:'Precision bearing',type:'Bearing',model:'APU platform · example',art:'bearing',supplier:'s2',supplierName:'Northline Precision · demo',perBuild:2,stock:82,poQty:240,ordered:'2026-10-30',promised:'2026-11-26',lead:25,material:true,tooling:true,capacity:85,yield:97,spread:9,updated:BASE,share:{material:true,tooling:false,capacity:true,yield:true}},
{id:'fuel',code:'DEMO-FCU-131',name:'Fuel control unit',type:'Rotable',model:'APU platform · example',art:'pump',supplier:'s3',supplierName:'Vector Component Services · demo',perBuild:1,stock:25,poQty:140,ordered:'2026-10-28',promised:'2026-11-23',lead:24,material:true,tooling:true,capacity:89,yield:94,spread:10,updated:BASE,share:{material:true,tooling:true,capacity:true,yield:true}},
{id:'seal',code:'DEMO-SEAL-131',name:'Accessory seal kit',type:'Expendable',model:'APU platform · example',art:'seal',supplier:'s2',supplierName:'Northline Precision · demo',perBuild:3,stock:115,poQty:390,ordered:'2026-11-02',promised:'2026-11-27',lead:20,material:true,tooling:true,capacity:70,yield:99,spread:7,updated:BASE,share:{material:true,tooling:true,capacity:true,yield:true}},
{id:'liner',code:'DEMO-LNR-131',name:'Combustor liner',type:'Engine hardware',model:'APU platform · example',art:'liner',supplier:'s1',supplierName:'Aster Foundry · demo',perBuild:1,stock:50,poQty:110,ordered:'2026-10-19',promised:'2026-12-01',lead:42,material:true,tooling:true,capacity:91,yield:93,spread:12,updated:'2026-11-05',share:{material:true,tooling:true,capacity:true,yield:true}},
{id:'bolt',code:'DEMO-BOLT-131',name:'Drilled-head fastener',type:'Standard hardware',model:'Specification review required',art:'fastener',supplier:'s3',supplierName:'Vector Component Services · demo',perBuild:12,stock:220,poQty:2000,ordered:'2026-11-01',promised:'2026-11-22',lead:21,material:false,tooling:true,capacity:90,yield:98,spread:10,updated:BASE,share:{material:true,tooling:true,capacity:true,yield:true}}
],offers:[
{id:'o1',partId:'casting',supplier:'Western Aero Stock · demo',qty:50,ship:4,price:6800,condition:'New',location:'Phoenix, AZ',channel:'Independent',docs:'Sample trace pack; eligibility not verified'},
{id:'o2',partId:'bearing',supplier:'Northline Distribution · demo',qty:60,ship:3,price:1450,condition:'New',location:'Dallas, TX',channel:'Distributor',docs:'Sample trace pack; eligibility not verified'},
{id:'o3',partId:'fuel',supplier:'Vector Rotables · demo',qty:8,ship:2,price:22400,condition:'Overhauled',location:'Phoenix, AZ',channel:'Independent',docs:'Sample trace pack; eligibility not verified'},
{id:'o4',partId:'seal',supplier:'Northline Distribution · demo',qty:180,ship:3,price:155,condition:'New',location:'Dallas, TX',channel:'Distributor',docs:'Sample trace pack; eligibility not verified'},
{id:'o5',partId:'liner',supplier:'Western Aero Stock · demo',qty:12,ship:6,price:29750,condition:'New',location:'Miami, FL',channel:'Independent',docs:'Sample trace pack; eligibility not verified'},
{id:'o6',partId:'bolt',supplier:'Desert Hardware · demo',qty:150,ship:5,price:42,condition:'New',location:'Phoenix, AZ',channel:'Distributor',docs:'Sample trace pack; eligibility not verified'}
]}}
function signal(p,k){return p.share[k]?p[k]:null}
function forecast(p,s){let lead=p.lead+s.slippage;const drivers=[{label:'Historical lead-time baseline',days:p.lead}],missing=[];
for(const [key,label,delay]of [['material','Material not yet confirmed',7],['tooling','Tooling not ready',5]]){const value=signal(p,key);if(value===null)missing.push(key);else if(!value){lead+=delay;drivers.push({label,days:delay})}}
const cap=signal(p,'capacity');if(cap===null)missing.push('capacity');else if(cap>80){const v=Math.ceil((cap-80)/3);lead+=v;drivers.push({label:'Capacity pressure',days:v})}
const y=signal(p,'yield');if(y===null)missing.push('yield');else if(y<95){lead+=4;drivers.push({label:'Yield / rework allowance',days:4})}
if(s.slippage)drivers.push({label:'Scenario delivery shift',days:s.slippage});
const stale=!p.updated||days(BASE,p.updated)>2;
const spread=p.spread+missing.length*3+(stale?5:0),median=add(p.ordered,lead),early=add(median,-spread),late=add(median,spread),x=days(p.promised,median);
// A triangular scenario distribution, not a trained or calibrated predictive model.
const probability=x<=-spread?0:x>=spread?1:x<=0?Math.pow(x+spread,2)/(2*spread*spread):1-Math.pow(spread-x,2)/(2*spread*spread);
return {lead,median,early,late,spread,probability,drivers,missing,stale,confidence:missing.length||stale?'Limited signals':'Complete sample signals'};
}
function plan(s){return s.plan.map(n=>Math.ceil(n*(1+s.uplift/100)))}
function demandAt(p,s,index){return plan(s).slice(0,index+1).reduce((a,b)=>a+b,0)*p.perBuild}
function supplyAt(p,s,date){const f=forecast(p,s);let qty=p.stock+(f.median<=date?p.poQty:0);
for(const a of s.actions){if(a.partId!==p.id||a.kind!=='Purchase')continue;if(a.status==='Approved'&&a.eta<=date)qty+=a.qty;if(a.status==='Received'&&a.received<=date)qty+=a.qty}return qty}
function coverage(p,s){const points=weeks.map((date,i)=>({date,required:demandAt(p,s,i),supply:supplyAt(p,s,date)}));points.forEach(x=>x.gap=Math.max(0,x.required-x.supply));const first=points.find(x=>x.gap>0);return {points,firstGap:first?.date??null,maxGap:Math.max(...points.map(x=>x.gap)),required:points.at(-1).required,opening:p.stock}}
function buildCoverage(s){return weeks.map((date,i)=>{const demand=plan(s).slice(0,i+1).reduce((a,b)=>a+b,0);return {date,demand,supported:Math.min(demand,...s.parts.map(p=>Math.floor(supplyAt(p,s,date)/p.perBuild)))}})}
function offerRemaining(o,s){return Math.max(0,o.qty-s.actions.filter(a=>a.offerId===o.id&&a.status!=='Rejected').reduce((t,a)=>t+a.qty,0))}
function receiptMetrics(s){const rows=s.actions.filter(a=>a.kind==='Purchase'&&a.status==='Received');if(!rows.length)return {count:0,mae:null,promiseMae:null};return {count:rows.length,mae:rows.reduce((t,a)=>t+Math.abs(days(a.received,a.snapshot)),0)/rows.length,promiseMae:rows.reduce((t,a)=>t+Math.abs(days(a.received,a.eta)),0)/rows.length}}
function rental(daysCount,rate=1200){return {days:daysCount,daily:rate,rental:daysCount*rate,fees:500,shipping:600,deposit:15000,total:daysCount*rate+1100,due:daysCount*rate+16100}}
function validateImport(rows,s){const errors=[],changes=[];const ids=new Set();for(const [i,row]of rows.entries()){const p=s.parts.find(p=>p.code===row.part_number);if(!p){errors.push('Row '+(i+2)+': unknown DEMO part number');continue}if(ids.has(p.id)){errors.push('Row '+(i+2)+': duplicate part number');continue}ids.add(p.id);const val={id:p.id};for(const [key,target]of [['opening_stock','stock'],['incoming_qty','poQty'],['historical_lead_days','lead']]){const n=Number(row[key]);if(row[key]===''||!Number.isInteger(n)||n<(key==='historical_lead_days'?1:0)||n>1000000)errors.push('Row '+(i+2)+': invalid '+key);else val[target]=n}for(const [key,target]of [['ordered_date','ordered'],['promised_date','promised'],['updated_date','updated']]){const str=row[key];if(!/^\d{4}-\d{2}-\d{2}$/.test(str)||!Number.isFinite(day(str))||new Date(day(str)).toISOString().slice(0,10)!==str)errors.push('Row '+(i+2)+': invalid '+key);else val[target]=str}if(val.ordered>BASE)errors.push('Row '+(i+2)+': order date is after the scenario snapshot');if(val.updated>BASE)errors.push('Row '+(i+2)+': update date is after the scenario snapshot');if(val.promised<val.ordered)errors.push('Row '+(i+2)+': promise precedes order');changes.push(val)}return {errors,changes}}
return {BASE,KEY,weeks,seedPlan,initial,add,days,day,signal,forecast,plan,demandAt,supplyAt,coverage,buildCoverage,offerRemaining,receiptMetrics,rental,validateImport};
});
