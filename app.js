const ids = [
  "carPrice","downPayment","apr","loanYears","distancePerYear","efficiency","fuelPrice",
  "insuranceYear","maintenanceYear","taxesYear","parkingYear","depreciation5",
  "incomeMonth","otherExpensesMonth","currency","distanceUnit"
];

const $ = (id) => document.getElementById(id);
const num = (id) => Math.max(0, parseFloat($(id).value) || 0);

const currencySymbols = {
  EUR: "€",
  USD: "$",
  GBP: "£",
  CAD: "C$",
  AUD: "A$"
};

function money(value) {
  const cur = $("currency").value;
  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency: cur,
      maximumFractionDigits: 0
    }).format(value || 0);
  } catch {
    return `${currencySymbols[cur] || ""}${Math.round(value || 0)}`;
  }
}

function loanPayment(principal, annualRatePct, years) {
  const n = years * 12;
  if (principal <= 0 || n <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  if (r === 0) return principal / n;
  return principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
}

function fuelAnnual() {
  const unit = $("distanceUnit").value;
  const distance = num("distancePerYear");
  const eff = Math.max(0.0001, num("efficiency"));
  const price = num("fuelPrice");

  if (unit === "km") {
    const litres = distance * eff / 100;
    return litres * price;
  }

  // In miles mode, efficiency is entered as MPG (US).
  // 1 US gallon = 3.785411784 litres.
  const gallons = distance / eff;
  return gallons * price;
}

function calculate() {
  const carPrice = num("carPrice");
  const down = Math.min(num("downPayment"), carPrice);
  const principal = Math.max(0, carPrice - down);
  const loanMonthly = loanPayment(principal, num("apr"), num("loanYears"));

  const fuelMonthly = fuelAnnual() / 12;
  const insuranceMonthly = num("insuranceYear") / 12;
  const maintenanceMonthly = num("maintenanceYear") / 12;
  const taxesMonthly = num("taxesYear") / 12;
  const parkingMonthly = num("parkingYear") / 12;
  const depreciationMonthly = (carPrice * (num("depreciation5") / 100)) / 60;

  const monthlyTotal =
    loanMonthly + fuelMonthly + insuranceMonthly + maintenanceMonthly +
    taxesMonthly + parkingMonthly + depreciationMonthly;

  const annualTotal = monthlyTotal * 12;
  const fiveYearTotal = monthlyTotal * 60 + down;

  $("monthlyTotal").textContent = money(monthlyTotal);
  $("loanMonthly").textContent = money(loanMonthly);
  $("fuelMonthly").textContent = money(fuelMonthly);
  $("insuranceMonthly").textContent = money(insuranceMonthly);
  $("maintenanceMonthly").textContent = money(maintenanceMonthly);
  $("taxesMonthly").textContent = money(taxesMonthly);
  $("parkingMonthly").textContent = money(parkingMonthly);
  $("depreciationMonthly").textContent = money(depreciationMonthly);
  $("annualTotal").textContent = money(annualTotal);
  $("fiveYearTotal").textContent = money(fiveYearTotal);

  const income = num("incomeMonth");
  const other = num("otherExpensesMonth");
  const ratio = income > 0 ? monthlyTotal / income * 100 : 0;
  const leftover = income - other - monthlyTotal;

  $("incomeRatio").textContent = income > 0 ? `${ratio.toFixed(1)}%` : "—";
  $("incomeBar").style.width = `${Math.min(100, ratio)}%`;

  const badge = $("affordabilityBadge");
  const text = $("affordabilityText");

  if (income <= 0) {
    badge.className = "badge neutral";
    badge.textContent = "Add your income";
    text.textContent = "";
  } else if (leftover < 0 || ratio > 30) {
    badge.className = "badge bad";
    badge.textContent = "High financial pressure";
    text.textContent = `After your other expenses and this car, you would be ${money(Math.abs(leftover))} ${leftover < 0 ? "short" : "left"} each month.`;
  } else if (ratio > 20 || leftover < income * 0.15) {
    badge.className = "badge warn";
    badge.textContent = "Possible, but tight";
    text.textContent = `Estimated money left after other expenses and car costs: ${money(leftover)} per month.`;
  } else {
    badge.className = "badge good";
    badge.textContent = "Looks manageable";
    text.textContent = `Estimated money left after other expenses and car costs: ${money(leftover)} per month.`;
  }
}

function updateDistanceLabels() {
  const mi = $("distanceUnit").value === "mi";
  $("distanceLabel").textContent = mi ? "Distance per year (miles)" : "Distance per year (km)";
  $("efficiencyLabel").textContent = mi ? "Fuel economy (MPG, US)" : "Fuel economy (L/100 km)";
  $("fuelPriceLabel").textContent = mi ? "Fuel price per US gallon" : "Fuel price per litre";

  if (mi) {
    $("distancePerYear").value = 10000;
    $("efficiency").value = 35;
    $("fuelPrice").value = 3.80;
  } else {
    $("distancePerYear").value = 15000;
    $("efficiency").value = 7.0;
    $("fuelPrice").value = 1.55;
  }
  calculate();
}

function loadExample() {
  const example = {
    carPrice: 32000, downPayment: 6000, apr: 6.2, loanYears: 5,
    distancePerYear: $("distanceUnit").value === "mi" ? 12000 : 18000,
    efficiency: $("distanceUnit").value === "mi" ? 32 : 7.4,
    fuelPrice: $("distanceUnit").value === "mi" ? 3.65 : 1.60,
    insuranceYear: 1100, maintenanceYear: 800, taxesYear: 350,
    parkingYear: 420, depreciation5: 48, incomeMonth: 3200, otherExpensesMonth: 1700
  };
  for (const [k,v] of Object.entries(example)) $(k).value = v;
  calculate();
}

function resetForm() {
  $("currency").value = "EUR";
  $("distanceUnit").value = "km";
  $("carPrice").value = 25000;
  $("downPayment").value = 5000;
  $("apr").value = 5.5;
  $("loanYears").value = 5;
  $("distancePerYear").value = 15000;
  $("efficiency").value = 7.0;
  $("fuelPrice").value = 1.55;
  $("insuranceYear").value = 900;
  $("maintenanceYear").value = 700;
  $("taxesYear").value = 300;
  $("parkingYear").value = 300;
  $("depreciation5").value = 45;
  $("incomeMonth").value = 2500;
  $("otherExpensesMonth").value = 1400;
  updateDistanceLabels();
  calculate();
}

$("calculateBtn").addEventListener("click", calculate);
$("loadExample").addEventListener("click", loadExample);
$("resetForm").addEventListener("click", resetForm);
$("distanceUnit").addEventListener("change", updateDistanceLabels);

for (const id of ids) {
  const el = $(id);
  if (!el || id === "distanceUnit") continue;
  el.addEventListener("input", calculate);
  el.addEventListener("change", calculate);
}

calculate();
