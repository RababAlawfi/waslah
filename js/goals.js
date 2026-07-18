/* =========================================================
   وصلة — منطق صفحة الأهداف
   ========================================================= */

const defaultGoals = [
{ id:"home", title:"شراء منزل", target:300000, remaining:84000, year:2028 },
{ id:"riyadh-trip", title:"السفر إلى الرياض", target:25000, remaining:15000, year:2027 },
{ id:"car", title:"شراء سيارة", target:120000, remaining:98400, year:2029 }
];

let goals = null;

try{
const stored = JSON.parse(localStorage.getItem("waslahGoals"));
if(Array.isArray(stored) && stored.length){
goals = stored;
}
}catch(err){
goals = null;
}

if(!goals){
goals = defaultGoals;
}

function formatCurrency(value){
return Math.round(value).toLocaleString("en-US");
}

function progressOf(goal){
const saved = goal.target - goal.remaining;
return goal.target > 0 ? Math.round((saved / goal.target) * 100) : 0;
}

function renderGoals(){

const list = document.getElementById("goalsList");
if(!list) return;

list.innerHTML = "";

goals.forEach(goal => {
const percent = Math.max(0, Math.min(100, progressOf(goal)));

const card = document.createElement("div");
card.className = "goal-card";
card.innerHTML = `
<div class="goal-header">
<div>
<h4>${goal.title}</h4>
<small>الهدف: ${formatCurrency(goal.target)} ريال</small>
</div>
<strong>${percent}%</strong>
</div>
<div class="progress">
<div class="progress-fill" style="width:0%" data-target="${percent}"></div>
</div>
<div class="goal-footer">
<span>المتبقي: ${formatCurrency(goal.remaining)} ريال</span>
<span>${goal.year}</span>
</div>
`;
list.appendChild(card);
});

requestAnimationFrame(() => {
list.querySelectorAll(".progress-fill").forEach(bar => {
bar.style.width = bar.dataset.target + "%";
});
});

}

function renderOverallScore(){

const totalTarget = goals.reduce((sum, g) => sum + g.target, 0);
const totalRemaining = goals.reduce((sum, g) => sum + g.remaining, 0);
const totalSaved = totalTarget - totalRemaining;
const score = totalTarget > 0 ? Math.round((totalSaved / totalTarget) * 100) : 0;

const ring = document.getElementById("scoreRing");
const value = document.getElementById("scoreValue");
const title = document.getElementById("scoreTitle");
const description = document.getElementById("scoreDescription");

if(value) value.textContent = score + "%";

requestAnimationFrame(() => {
if(ring) ring.style.setProperty("--score", score);
});

if(title && description){
if(score >= 70){
title.textContent = "تقدم ممتاز";
description.textContent = "اقتربت من تحقيق أهدافك المالية، استمر بنفس الوتيرة.";
}else if(score >= 40){
title.textContent = "تقدم جيد";
description.textContent = "أنت في المسار الصحيح، واصل الادخار للوصول لأهدافك في وقتها.";
}else{
title.textContent = "بداية الطريق";
description.textContent = "لا تزال في البداية، حدد مبلغًا شهريًا ثابتًا للادخار لتسريع تقدمك.";
}
}

}

renderGoals();
renderOverallScore();

// زر تحديث الخطة: يعيد حساب التقدم بعد أي تعديل يدوي على البيانات
const updatePlanBtn = document.getElementById("updatePlanBtn");
if(updatePlanBtn){
updatePlanBtn.addEventListener("click", () => {
renderGoals();
renderOverallScore();
});
}

// زر إضافة هدف جديد
const addGoalBtn = document.getElementById("addGoalBtn");
if(addGoalBtn){
addGoalBtn.addEventListener("click", () => {

const title = prompt("اسم الهدف الجديد:");
if(!title) return;

const targetInput = prompt("المبلغ المستهدف (بالريال):");
const target = Number(targetInput);
if(!targetInput || Number.isNaN(target) || target <= 0){
alert("الرجاء إدخال مبلغ صحيح.");
return;
}

goals.push({
id:"goal-" + Date.now(),
title,
target,
remaining:target,
year:new Date().getFullYear() + 1
});

try{
localStorage.setItem("waslahGoals", JSON.stringify(goals));
}catch(err){
/* تجاهل أخطاء التخزين المحلي بصمت */
}

renderGoals();
renderOverallScore();

});
}