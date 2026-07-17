let user = JSON.parse(localStorage.getItem("waslahUser"));

if (!user) {
    user = {
        name: "رباب",
        income: 15000,
        expenses: 5380,
        restaurants: 1200,
        shopping: 860,
        transport: 540,
        savings: 22000
    };
}

const income = user.income;
const expenses = user.expenses;
const remaining = income - expenses;
const percent = Math.round((expenses / income) * 100);

document.getElementById("incomeValue").textContent =
income.toLocaleString("en-US");

document.getElementById("expenseValue").textContent =
expenses.toLocaleString("en-US");

document.getElementById("remainingValue").textContent =
remaining.toLocaleString("en-US") + " ر.س";

document.getElementById("budgetPercent").textContent =
percent + "%";

document.getElementById("progressFill").style.width =
percent + "%";

const tips = [

"أنت تسير ضمن ميزانيتك بشكل ممتاز، استمر بنفس الوتيرة.",

"خفض إنفاق المطاعم بنسبة 15٪ قد يوفر لك أكثر من 180 ريال هذا الشهر.",

"زيادة الادخار الشهري بمقدار 500 ريال تساعدك على الوصول لهدفك بشكل أسرع.",

"مصروفاتك أقل من متوسط الشهر الماضي، وهذا مؤشر إيجابي."

];

document.getElementById("budgetAdvice").innerHTML =
tips[Math.floor(Math.random() * tips.length)];