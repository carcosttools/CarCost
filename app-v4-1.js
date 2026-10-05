const $=id=>document.getElementById(id);
const n=id=>Math.max(0,parseFloat($(id)?.value)||0);
const money=v=>new Intl.NumberFormat("en",{style:"currency",currency:$("currency").value,maximumFractionDigits:0}).format(v||0);

const t={
en:{privacyPill:"No account · Private",kicker:"CAR COST CALCULATOR",heroTitle:"Which car is <em>actually</em> cheaper?",heroCopy:"Compare two cars in under a minute — financing, fuel or electricity, insurance, maintenance and resale value included.",trust1:"✓ No sign-up",trust2:"✓ No bank details",trust3:"✓ Runs in your browser",region:"Region",currency:"Currency",distanceUnit:"Distance",example:"Try example",powertrain:"Powertrain",price:"Car price",down:"Down payment",apr:"Loan APR (%)",term:"Loan term (years)",advanced:"Advanced costs",insurance:"Insurance / year",maintenance:"Maintenance / year",tax:"Tax & registration / year",parking:"Parking & tolls / year",resale:"Estimated value after 5 years (%)",avgMonthly:"average ownership cost / month",fiveYear:"5-year cost",cashMonthly:"Monthly cash",share:"Share comparison",reset:"Reset",optional:"OPTIONAL",budgetTitle:"Can your budget handle it?",budgetCopy:"Add your monthly income only if you want an affordability check.",income:"Take-home income / month",otherExpenses:"Other expenses / month",trustTitle:"Simple, private, transparent.",trustCopy:"No account, no payment details, no CarCost database storing your calculator inputs. Results are estimates, not financial advice.",cheaper:"costs less over 5 years",saving:"Estimated saving",tie:"The two cars are almost equal over 5 years.",budgetGood:"Comfortable based on the numbers entered.",budgetMid:"Manageable, but keep a healthy buffer.",budgetTight:"This looks tight for your monthly budget.",budgetHigh:"High pressure on your monthly budget."},
el:{privacyPill:"Χωρίς λογαριασμό · Ιδιωτικό",kicker:"ΥΠΟΛΟΓΙΣΤΗΣ ΚΟΣΤΟΥΣ ΑΥΤΟΚΙΝΗΤΟΥ",heroTitle:"Ποιο αυτοκίνητο είναι <em>πραγματικά</em> φθηνότερο;",heroCopy:"Σύγκρινε δύο αυτοκίνητα σε λιγότερο από ένα λεπτό — χρηματοδότηση, καύσιμα ή ρεύμα, ασφάλιση, συντήρηση και μεταπωλητική αξία.",trust1:"✓ Χωρίς εγγραφή",trust2:"✓ Χωρίς τραπεζικά στοιχεία",trust3:"✓ Λειτουργεί στον browser σου",region:"Περιοχή",currency:"Νόμισμα",distanceUnit:"Απόσταση",example:"Δοκίμασε παράδειγμα",powertrain:"Κινητήριο σύστημα",price:"Τιμή αυτοκινήτου",down:"Προκαταβολή",apr:"Επιτόκιο δανείου (%)",term:"Διάρκεια δανείου (έτη)",advanced:"Πρόσθετα έξοδα",insurance:"Ασφάλιση / έτος",maintenance:"Συντήρηση / έτος",tax:"Φόροι & άδεια / έτος",parking:"Στάθμευση & διόδια / έτος",resale:"Εκτιμώμενη αξία μετά από 5 έτη (%)",avgMonthly:"μέσο κόστος ιδιοκτησίας / μήνα",fiveYear:"Κόστος 5 ετών",cashMonthly:"Μηνιαία επιβάρυνση",share:"Κοινοποίηση σύγκρισης",reset:"Επαναφορά",optional:"ΠΡΟΑΙΡΕΤΙΚΟ",budgetTitle:"Το αντέχει ο προϋπολογισμός σου;",budgetCopy:"Βάλε το μηνιαίο εισόδημά σου μόνο αν θέλεις έλεγχο οικονομικής επιβάρυνσης.",income:"Καθαρό εισόδημα / μήνα",otherExpenses:"Άλλα έξοδα / μήνα",trustTitle:"Απλό, ιδιωτικό, διαφανές.",trustCopy:"Χωρίς λογαριασμό, χωρίς στοιχεία πληρωμής και χωρίς βάση δεδομένων CarCost που αποθηκεύει τα στοιχεία του υπολογιστή. Τα αποτελέσματα είναι εκτιμήσεις.",cheaper:"κοστίζει λιγότερο σε 5 χρόνια",saving:"Εκτιμώμενη εξοικονόμηση",tie:"Τα δύο αυτοκίνητα έχουν σχεδόν ίδιο κόστος σε 5 χρόνια.",budgetGood:"Άνετη επιλογή με βάση τα στοιχεία που έβαλες.",budgetMid:"Φαίνεται διαχειρίσιμο, αλλά κράτα καλό οικονομικό περιθώριο.",budgetTight:"Φαίνεται πιεστικό για τον μηνιαίο προϋπολογισμό σου.",budgetHigh:"Υψηλή πίεση στον μηνιαίο προϋπολογισμό σου."},
"zh-CN":{privacyPill:"无需账户 · 注重隐私",kicker:"汽车成本计算器",heroTitle:"哪辆车<em>真正</em>更便宜？",heroCopy:"不到一分钟比较两辆车——包括融资、燃油或电费、保险、保养和转售价值。",trust1:"✓ 无需注册",trust2:"✓ 无需银行信息",trust3:"✓ 在浏览器中运行",region:"地区",currency:"货币",distanceUnit:"距离",example:"试用示例",powertrain:"动力类型",price:"车辆价格",down:"首付",apr:"贷款年利率 (%)",term:"贷款期限（年）",advanced:"更多成本",insurance:"保险 / 年",maintenance:"保养 / 年",tax:"税费与注册 / 年",parking:"停车与过路费 / 年",resale:"5 年后预计价值 (%)",avgMonthly:"平均每月持有成本",fiveYear:"5 年成本",cashMonthly:"每月现金支出",share:"分享比较",reset:"重置",optional:"可选",budgetTitle:"你的预算能承受吗？",budgetCopy:"只有在你想检查负担能力时才需要填写月收入。",income:"每月税后收入",otherExpenses:"其他每月支出",trustTitle:"简单、私密、透明。",trustCopy:"无需账户、无需支付信息，也没有 CarCost 数据库存储你的计算器输入。结果仅供估算。",cheaper:"在 5 年内成本更低",saving:"预计节省",tie:"两辆车的 5 年成本几乎相同。",budgetGood:"根据你输入的数据，负担较轻。",budgetMid:"看起来可以承受，但建议保留充足的财务缓冲。",budgetTight:"对你的月度预算来说有些紧张。",budgetHigh:"对你的月度预算压力较大。"}};


const studioT={
 en:{
  studioLabel:"BUILD WITH US",studioTitle:"Like CarCost? We can build something useful for you too.",
  studioText:"We’re a small independent team building simple web tools. For a limited number of early projects, we can create a small first prototype at no cost so you can judge the quality before deciding whether to continue with paid work.",
  studioButton:"Tell us how to reach you",studioNote:"No phone number, email or payment details needed.",
  studioStep1:"You share your public social handle",studioStep2:"We contact you there",studioStep3:"If it’s a fit, we build a small prototype",
  leadLabel:"PROJECT REQUEST",leadTitle:"How can we reach you?",leadIntro:"Use a public or business social account. Don’t enter passwords, private information or payment details.",
  leadName:"Username / name",leadPlatform:"Social platform",leadHandle:"Public social username",leadCreate:"Create contact request",cancel:"Cancel",
  requestReady:"Your contact request is ready.",copyRequest:"Copy request",openFeedback:"Open contact page",copied:"Copied"
 },
 el:{
  studioLabel:"ΦΤΙΑΞΕ ΚΑΤΙ ΜΑΖΙ ΜΑΣ",studioTitle:"Σου αρέσει το CarCost; Μπορούμε να φτιάξουμε κάτι χρήσιμο και για εσένα.",
  studioText:"Είμαστε μια μικρή ανεξάρτητη ομάδα που δημιουργεί απλά web εργαλεία. Για περιορισμένο αριθμό πρώτων projects, μπορούμε να ετοιμάσουμε ένα μικρό αρχικό prototype χωρίς χρέωση, ώστε να κρίνεις πρώτα την ποιότητα της δουλειάς μας και μετά να αποφασίσεις αν θέλεις να συνεχίσουμε επί πληρωμή.",
  studioButton:"Πες μας πώς να σε βρούμε",studioNote:"Δεν χρειάζεται τηλέφωνο, email ή στοιχεία πληρωμής.",
  studioStep1:"Μοιράζεσαι το δημόσιο social handle σου",studioStep2:"Επικοινωνούμε μαζί σου εκεί",studioStep3:"Αν ταιριάζει, φτιάχνουμε ένα μικρό prototype",
  leadLabel:"ΑΙΤΗΜΑ PROJECT",leadTitle:"Πώς μπορούμε να επικοινωνήσουμε μαζί σου;",leadIntro:"Χρησιμοποίησε δημόσιο ή επαγγελματικό social account. Μην βάλεις κωδικούς, ιδιωτικές πληροφορίες ή στοιχεία πληρωμής.",
  leadName:"Username / όνομα",leadPlatform:"Social πλατφόρμα",leadHandle:"Δημόσιο social username",leadCreate:"Δημιουργία αιτήματος",cancel:"Ακύρωση",
  requestReady:"Το αίτημα επικοινωνίας είναι έτοιμο.",copyRequest:"Αντιγραφή αιτήματος",openFeedback:"Άνοιγμα σελίδας επικοινωνίας",copied:"Αντιγράφηκε"
 },
 "zh-CN":{
  studioLabel:"与我们合作",studioTitle:"喜欢 CarCost？我们也可以为你制作实用的网页工具。",
  studioText:"我们是一个小型独立团队，专注于制作简洁实用的网页工具。对于少量早期项目，我们可以先免费制作一个小型原型，让你先判断我们的质量，再决定是否继续付费合作。",
  studioButton:"告诉我们如何联系你",studioNote:"无需电话号码、邮箱或支付信息。",
  studioStep1:"你提供公开的社交账号",studioStep2:"我们通过该平台联系你",studioStep3:"如果合适，我们制作一个小型原型",
  leadLabel:"项目请求",leadTitle:"我们如何联系你？",leadIntro:"请使用公开或商务社交账号。不要填写密码、私人信息或支付信息。",
  leadName:"用户名 / 名称",leadPlatform:"社交平台",leadHandle:"公开社交用户名",leadCreate:"创建联系请求",cancel:"取消",
  requestReady:"联系请求已准备好。",copyRequest:"复制请求",openFeedback:"打开联系页面",copied:"已复制"
 }
};
Object.keys(studioT).forEach(k=>Object.assign(t[k],studioT[k]));

function lang(){const q=new URLSearchParams(location.search).get("lang");return t[q]?q:(localStorage.getItem("carcost_lang")||"en")}
function applyLang(l){if(!t[l])l="en";localStorage.setItem("carcost_lang",l);document.documentElement.lang=l;$("language").value=l;document.querySelectorAll("[data-i18n]").forEach(el=>{const k=el.dataset.i18n;if(t[l][k])el.textContent=t[l][k]});document.querySelectorAll("[data-i18n-html]").forEach(el=>{const k=el.dataset.i18nHtml;if(t[l][k])el.innerHTML=t[l][k]});const u=new URL(location.href);u.searchParams.set("lang",l);history.replaceState(null,"",u);calculate()}

function payment(P,apr,years){const N=Math.round(years*12),r=apr/1200;if(!P||!N)return 0;if(!r)return P/N;return P*r*Math.pow(1+r,N)/(Math.pow(1+r,N)-1)}
function balance(P,apr,years,k){const N=Math.round(years*12);k=Math.min(k,N);if(!P||k>=N)return 0;const r=apr/1200;if(!r)return P*(N-k)/N;const pay=payment(P,apr,years);return P*Math.pow(1+r,k)-pay*(Math.pow(1+r,k)-1)/r}
function energyAnnual(p){const type=$(`${p}_type`).value,unit=$("distanceUnit").value,d=n(`${p}_distance`),eff=Math.max(.0001,n(`${p}_eff`)),price=n(`${p}_energyPrice`);if(type==="EV")return d*eff/100*price;if(unit==="km")return d*eff/100*price;return d/eff*price}
function calc(p){const price=n(`${p}_price`),down=Math.min(price,n(`${p}_down`)),P=price-down,apr=n(`${p}_apr`),years=n(`${p}_years`),loan=payment(P,apr,years),monthsPaid=Math.min(60,Math.round(years*12)),remain=balance(P,apr,years,60),energy=energyAnnual(p),ins=n(`${p}_insurance`),maint=n(`${p}_maintenance`),tax=n(`${p}_tax`),park=n(`${p}_parking`),runningAnnual=energy+ins+maint+tax+park,cashMonthly=loan+runningAnnual/12,resale=price*Math.min(100,n(`${p}_residual`))/100,five=down+loan*monthsPaid+remain+runningAnnual*5-resale,trueMonthly=five/60;return{name:$(`${p}_name`).value||`Car ${p.toUpperCase()}`,five,trueMonthly,cashMonthly}}

function calculate(){const a=calc("a"),b=calc("b"),l=lang();$("a_resultName").textContent=a.name;$("b_resultName").textContent=b.name;$("a_trueMonthly").textContent=money(a.trueMonthly);$("b_trueMonthly").textContent=money(b.trueMonthly);$("a_fiveYear").textContent=money(a.five);$("b_fiveYear").textContent=money(b.five);$("a_cashMonthly").textContent=money(a.cashMonthly);$("b_cashMonthly").textContent=money(b.cashMonthly);const diff=Math.abs(a.five-b.five);if(diff<1)$("winner").innerHTML=`<strong>${t[l].tie}</strong>`;else{const w=a.five<b.five?a:b;$("winner").innerHTML=`<strong>${w.name} ${t[l].cheaper}.</strong><span>${t[l].saving}: ${money(diff)}</span>`}renderBudget(a,b)}
function renderBudget(a,b){const income=n("income"),other=n("otherExpenses"),box=$("affordability"),l=lang();if(!income){box.classList.add("hidden");return}const worst=Math.max(a.cashMonthly,b.cashMonthly),left=income-other-worst,ratio=worst/income;let msg=t[l].budgetGood;if(left<0||ratio>.35)msg=t[l].budgetHigh;else if(ratio>.28||left/income<.15)msg=t[l].budgetTight;else if(ratio>.20)msg=t[l].budgetMid;box.classList.remove("hidden");box.innerHTML=`<strong>${msg}</strong><span>${money(Math.max(0,left))} left / month after other expenses + the more expensive car</span>`}

function updateLabels(p){const ev=$(`${p}_type`).value==="EV",mi=$("distanceUnit").value==="mi";document.querySelector(`[data-car="${p}"] .distance-label label`).textContent=`Distance / year (${mi?"miles":"km"})`;document.querySelector(`[data-car="${p}"] .eff-label label`).textContent=ev?`Efficiency (kWh/100 ${mi?"miles":"km"})`:(mi?"Fuel economy (MPG, US)":"Fuel economy (L/100 km)");document.querySelector(`[data-car="${p}"] .energy-label label`).textContent=ev?"Electricity price / kWh":(mi?"Fuel price / US gallon":"Fuel price / litre")}
function typeChanged(p){const ev=$(`${p}_type`).value==="EV",mi=$("distanceUnit").value==="mi";if(ev){$(`${p}_eff`).value=mi?30:18;$(`${p}_energyPrice`).value=.28}else{$(`${p}_eff`).value=mi?35:7;$(`${p}_energyPrice`).value=mi?3.8:1.55}updateLabels(p);calculate()}
function unitChanged(){const mi=$("distanceUnit").value==="mi";["a","b"].forEach(p=>{updateLabels(p);$(`${p}_distance`).value=mi?10000:15000;if($(`${p}_type`).value!=="EV"){$(`${p}_eff`).value=mi?35:7;$(`${p}_energyPrice`).value=mi?3.8:1.55}});calculate()}
function regionChanged(){const map={eu:["EUR","km"],uk:["GBP","mi"],us:["USD","mi"],ca:["CAD","km"],au:["AUD","km"]},v=map[$("regionPreset").value];if(!v)return;$("currency").value=v[0];$("distanceUnit").value=v[1];unitChanged()}
function example(){$("a_name").value="Used petrol";$("a_price").value=22000;$("a_down").value=5000;$("a_eff").value=7.2;$("b_name").value="New EV";$("b_type").value="EV";$("b_price").value=35000;$("b_down").value=6000;$("b_eff").value=17;$("b_energyPrice").value=.28;$("b_maintenance").value=400;$("b_tax").value=120;["a","b"].forEach(updateLabels);calculate();$("results").scrollIntoView({behavior:"smooth",block:"center"})}
function reset(){location.href=location.pathname+"?lang="+lang()}
function share(){const a=calc("a"),b=calc("b"),url=location.href,text=`CarCost: ${a.name} ${money(a.five)} vs ${b.name} ${money(b.five)} estimated 5-year cost.`;if(navigator.share)navigator.share({title:"CarCost comparison",text,url}).catch(()=>{});else if(navigator.clipboard)navigator.clipboard.writeText(url).then(()=>{$("shareBtn").textContent="Link copied";setTimeout(()=>applyLang(lang()),1400)});else prompt("Copy this link:",url)}

document.querySelectorAll("input,select").forEach(el=>{if(!["language","regionPreset","distanceUnit","a_type","b_type"].includes(el.id)){el.addEventListener("input",calculate);el.addEventListener("change",calculate)}})
$("language").addEventListener("change",e=>applyLang(e.target.value));$("regionPreset").addEventListener("change",regionChanged);$("distanceUnit").addEventListener("change",unitChanged);$("a_type").addEventListener("change",()=>typeChanged("a"));$("b_type").addEventListener("change",()=>typeChanged("b"));$("exampleBtn").addEventListener("click",example);$("resetBtn").addEventListener("click",reset);$("shareBtn").addEventListener("click",share);
["a","b"].forEach(updateLabels);applyLang(lang());calculate();

const leadDialog=$("leadDialog");
$("openLead").addEventListener("click",()=>leadDialog.showModal());
$("createRequest").addEventListener("click",()=>{
 const name=$("leadName").value.trim(),platform=$("leadPlatform").value,handle=$("leadHandle").value.trim(),l=lang();
 if(!name||!handle){$("leadResult").classList.remove("hidden");$("leadResult").innerHTML="<strong>Please complete both fields.</strong>";return}
 const msg=`CarCost project request\nName: ${name}\nPlatform: ${platform}\nHandle: ${handle}`;
 $("leadResult").classList.remove("hidden");
 $("leadResult").innerHTML=`<strong>${t[l].requestReady}</strong><p>${name} · ${platform} · ${handle}</p><div class="lead-result-actions"><button type="button" class="btn secondary" id="copyLead">${t[l].copyRequest}</button><a class="btn ghost link-btn" href="https://github.com/carcosttools/CarCost/issues/new" target="_blank" rel="noopener">${t[l].openFeedback}</a></div><small>This website does not currently send or store this form. Copy the request, then send it through our contact page.</small>`;
 $("copyLead").addEventListener("click",async e=>{try{await navigator.clipboard.writeText(msg);e.target.textContent=t[l].copied}catch{prompt("Copy this request:",msg)}})
});
