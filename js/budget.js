/* =========================================================
   وصلة — منطق صفحة الميزانية
   ========================================================= */

const defaultUser = {
name:"رباب",
income:15000,
expenses:5380,
categories:[
{ key:"restaurants", label:"المطاعم", icon:"restaurant", amount:1200 },
{ key:"shopping", label:"التسوق", icon:"shopping_bag", amount:860 },
{ key:"transport", label:"المواصلات", icon:"directions_car", amount:540 }
]
};

let user = null;

try{
const stored = JSON.parse(localStorage.getItem("waslahUser"));
if(stored && typeof stored.income === "number" && typeof stored.expenses === "number"){
user = stored;
}
}catch(err){
user = null;
}

if(!user){
user = defaultUser;
}

// يدعم كل من الصيغة الجديدة (categories: []) والقديمة (حقول مسطحة)
const categories = Array.isArray(user.categories) && user.categories.length
? user.categories
: [
{ key:"restaurants", label:"المطاعم", icon:"restaurant", amount:user.restaurants ?? 0 },
{ key:"shopping", label:"التسوق", icon:"shopping_bag", amount:user.shopping ?? 0 },
{ key:"transport", label:"المواصلات", icon:"directions_car", amount:user.transport ?? 0 }
];

const income = Number(user.income) || 0;
const expenses = Number(user.expenses) || 0;
const remaining = income - expenses;
const percent = income > 0 ? Math.round((expenses / income) * 100) : 0;

function formatCurrency(value){
return Math.round(value).toLocaleString("en-US");
}

document.getElementById("incomeValue").textContent = formatCurrency(income);
document.getElementById("expenseValue").textContent = formatCurrency(expenses);
document.getElementById("remainingValue").textContent = formatCurrency(remaining) + " ر.س";
document.getElementById("budgetPercent").textContent = percent + "%";

const progressNote = document.getElementById("progressNote");
if(progressNote){
progressNote.textContent = `أنت أنفقت ${percent}٪ من ميزانيتك الشهرية حتى الآن.`;
}

// تحريك شريط الاستهلاك بعد رسم الصفحة لإعطاء إحساس بصري بالتقدم
requestAnimationFrame(() => {
document.getElementById("progressFill").style.width = Math.min(percent, 100) + "%";
});

// بناء بنود الفئات ديناميكيًا مع شريط نسبي لكل فئة
const list = document.getElementById("categoriesList");

if(list){

const sorted = [...categories].sort((a, b) => b.amount - a.amount);

sorted.forEach(cat => {
const share = expenses > 0 ? Math.round((cat.amount / expenses) * 100) : 0;

const item = document.createElement("div");
item.className = "category-item";
item.innerHTML = `
<div class="category-icon">
<span class="material-icons-outlined" aria-hidden="true">${cat.icon}</span>
</div>
<div class="category-info">
<div class="category-top">
<h4>${cat.label}</h4>
<strong>${formatCurrency(cat.amount)} ر.س</strong>
</div>
<div class="category-meta">
<div class="category-bar">
<div class="category-bar-fill" style="width:0%" data-target="${share}"></div>
</div>
<small>${share}%</small>
</div>
</div>
`;

list.appendChild(item);
});

requestAnimationFrame(() => {
list.querySelectorAll(".category-bar-fill").forEach(bar => {
bar.style.width = bar.dataset.target + "%";
});
});

}