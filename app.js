const $=id=>document.getElementById(id);
const ids=["currency","distanceUnit","income","otherExpenses",...["a","b"].flatMap(p=>["name","type","price","down","apr","years","distance","eff","energyPrice","insurance","maintenance","tax","parking","residual"].map(x=>`${p}_${x}`))];
const n=id=>Math.max(0,parseFloat($(id).value)||0);
const money=v=>new Intl.NumberFormat("en",{style:"currency",currency:$("currency").value,maximumFractionDigits:0}).format(v||0);

function payment(P,apr,years){const N=Math.round(years*12),r=apr/1200;if(!P||!N)return 0;if(!r)return P/N;return P*r*Math.pow(1+r,N)/(Math.pow(1+r,N)-1)}
function balance(P,apr,years,k){const N=Math.round(years*12);k=Math.min(k,N);if(!P||k>=N)return 0;const r=apr/1200;if(!r)return P*(N-k)/N;const pay=payment(P,apr,years);return P*Math.pow(1+r,k)-pay*(Math.pow(1+r,k)-1)/r}

function energyAnnual(p){
 const type=$(`${p}_type`).value,unit=$("distanceUnit").value,d=n(`${p}_distance`),eff=Math.max(.0001,n(`${p}_eff`)),price=n(`${p}_energyPrice`);
 if(type==="EV"){ return d*eff/100*price; } // kWh/100 distance units
 if(unit==="km") return d*eff/100*price;
 return d/eff*price; // MPG + price/US gallon
}
function calc(p){
 const price=n(`${p}_price`),down=Math.min(price,n(`${p}_down`)),P=price-down,apr=n(`${p}_apr`),years=n(`${p}_years`);
 const loan=payment(P,apr,years), monthsPaid=Math.min(60,Math.round(years*12));
 const remain=balance(P,apr,years,60);
 const energy=energyAnnual(p), ins=n(`${p}_insurance`),maint=n(`${p}_maintenance`),tax=n(`${p}_tax`),park=n(`${p}_parking`);
 const runningAnnual=energy+ins+maint+tax+park;
 const cashMonthly=loan+runningAnnual/12;
 const resale=price*Math.min(100,n(`${p}_residual`))/100;
 const five=down+loan*monthsPaid+remain+runningAnnual*5-resale;
 const trueMonthly=five/60;
 const income=n("income"), other=n("otherExpenses"), ratio=income?cashMonthly/income*100:0,left=income-other-cashMonthly;
 let score=0,status="Add income to see affordability.";
 if(income){
   const ratioScore=Math.max(0,100-ratio*2.6);
   const bufferPct=left/income*100;
   const bufferScore=Math.max(0,Math.min(100,bufferPct*3.2));
   score=Math.round(ratioScore*.65+bufferScore*.35);
   status=score>=75?"Strong fit for the income and expenses entered.":score>=55?"Potentially manageable, but keep a healthy emergency buffer.":score>=35?"Financially tight. Consider a cheaper car or larger down payment.":"High pressure on your monthly budget.";
 }
 return {name:$(`${p}_name`).value||`Car ${p.toUpperCase()}`,price,loan,energy,ins,maint,tax,park,runningAnnual,cashMonthly,resale,five,trueMonthly,ratio,left,score,status};
}
function render(p,r){
 $(`${p}_resultName`).textContent=r.name;
 $(`${p}_trueMonthly`).textContent=money(r.trueMonthly);
 $(`${p}_cashMonthly`).textContent=money(r.cashMonthly);
 $(`${p}_fiveYear`).textContent=money(r.five);
 $(`${p}_resale`).textContent=money(r.resale);
 $(`${p}_ratio`).textContent=n("income")?`${r.ratio.toFixed(1)}%`:"—";
 $(`${p}_score`).textContent=n("income")?`${r.score}/100`:"—";
 $(`${p}_scoreBar`).style.width=`${r.score}%`;
 $(`${p}_status`).textContent=r.status;
 const parts=[["Financing",r.loan*60],["Energy",r.energy*5],["Insurance",r.ins*5],["Maintenance",r.maint*5],["Tax",r.tax*5],["Parking/tolls",r.park*5]];
 const max=Math.max(...parts.map(x=>x[1]),1);
 $(`${p}_breakdown`).innerHTML=`<strong>5-year cost drivers</strong>`+parts.map(([label,val])=>`<div class="bar-row"><span>${label}</span><div class="bar"><i style="width:${Math.max(2,val/max*100)}%"></i></div><strong>${money(val)}</strong></div>`).join("");
}
function calculate(){
 const a=calc("a"),b=calc("b");render("a",a);render("b",b);
 const diff=Math.abs(a.five-b.five),winner=a.five<=b.five?a:b,other=a.five<=b.five?b:a;
 $("winner").innerHTML=diff<1?`<strong>It's effectively a tie.</strong><span>Both estimates are almost identical over five years.</span>`:`<strong>${winner.name} costs less over 5 years.</strong><span>Estimated saving: ${money(diff)} versus ${other.name}.</span>`;
}
function updateLabels(p){
 const ev=$(`${p}_type`).value==="EV",mi=$("distanceUnit").value==="mi";
 document.querySelector(`[data-car="${p}"] .distance-label`).firstChild.textContent=`Distance / year (${mi?"miles":"km"})`;
 document.querySelector(`[data-car="${p}"] .eff-label`).firstChild.textContent=ev?`Efficiency (kWh/100 ${mi?"miles":"km"})`:(mi?"Fuel economy (MPG, US)":"Fuel economy (L/100 km)");
 document.querySelector(`[data-car="${p}"] .energy-label`).firstChild.textContent=ev?"Electricity price / kWh":(mi?"Fuel price / US gallon":"Fuel price / litre");
}
function typeChanged(p){
 const ev=$(`${p}_type`).value==="EV",mi=$("distanceUnit").value==="mi";
 if(ev){$(`${p}_eff`).value=mi?30:18;$(`${p}_energyPrice`).value=.28}
 else{$(`${p}_eff`).value=mi?35:7;$(`${p}_energyPrice`).value=mi?3.8:1.55}
 updateLabels(p);calculate();
}
function unitChanged(){
 const mi=$("distanceUnit").value==="mi";
 ["a","b"].forEach(p=>{updateLabels(p);if($(`${p}_type`).value!=="EV"){$(`${p}_eff`).value=mi?35:7;$(`${p}_energyPrice`).value=mi?3.8:1.55}$(`${p}_distance`).value=mi?10000:15000});
 calculate();
}
function reset(){
 $("currency").value="EUR";$("distanceUnit").value="km";$("income").value=3000;$("otherExpenses").value=1500;
 const data={a:["Car A","Petrol",25000,5000,5.5,5,15000,7,1.55,900,700,300,300,55],b:["Car B","Petrol",32000,6000,5.5,5,15000,5.5,1.55,1000,650,300,300,55]};
 ["a","b"].forEach(p=>["name","type","price","down","apr","years","distance","eff","energyPrice","insurance","maintenance","tax","parking","residual"].forEach((k,i)=>$(`${p}_${k}`).value=data[p][i]));
 ["a","b"].forEach(updateLabels);calculate();
}
function example(){
 $("income").value=3600;$("otherExpenses").value=1700;
 Object.assign($("a_name"),{value:"Used petrol"});$("a_price").value=22000;$("a_down").value=5000;$("a_apr").value=6.2;$("a_eff").value=7.2;$("a_residual").value=48;
 $("b_name").value="New EV";$("b_type").value="EV";$("b_price").value=35000;$("b_down").value=6000;$("b_apr").value=5.4;$("b_eff").value=17;$("b_energyPrice").value=.28;$("b_maintenance").value=400;$("b_tax").value=120;$("b_residual").value=52;
 ["a","b"].forEach(updateLabels);calculate();
}
function share(){
 const params=new URLSearchParams();ids.forEach(id=>params.set(id,$(id).value));const url=`${location.origin}${location.pathname}?${params}`;
 const a=calc("a"),b=calc("b"),text=`CarCost comparison: ${a.name} ${money(a.five)} vs ${b.name} ${money(b.five)} estimated 5-year ownership cost.`;
 if(navigator.share) navigator.share({title:"CarCost comparison",text,url}).catch(()=>{});
 else navigator.clipboard?.writeText(url).then(()=>{$("shareBtn").textContent="Link copied!";setTimeout(()=>$("shareBtn").textContent="Share result",1500)});
}
function loadURL(){
 const q=new URLSearchParams(location.search);let found=false;ids.forEach(id=>{if(q.has(id)){$(id).value=q.get(id);found=true}});["a","b"].forEach(updateLabels);calculate();return found;
}
ids.forEach(id=>{const el=$(id);if(!el)return;el.addEventListener("input",calculate);el.addEventListener("change",calculate)});
$("a_type").addEventListener("change",()=>typeChanged("a"));$("b_type").addEventListener("change",()=>typeChanged("b"));
$("distanceUnit").addEventListener("change",unitChanged);$("resetBtn").addEventListener("click",reset);$("exampleBtn").addEventListener("click",example);$("shareBtn").addEventListener("click",share);
loadURL();