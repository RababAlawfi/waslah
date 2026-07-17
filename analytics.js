const ctx = document.getElementById("expenseChart");

if (ctx) {
new Chart(ctx, {
type: "bar",
data: {
labels: ["يناير","فبراير","مارس","أبريل","مايو","يونيو"],
datasets: [{
label: "الإنفاق",
data: [7200,6800,8100,7600,8450,8250],
backgroundColor: "#D8AE55",
borderRadius: 10
}]
},
options: {
responsive: true,
maintainAspectRatio: false,
plugins: {
legend: {
display: false
}
},
scales: {
x: {
grid: {
display: false
}
},
y: {
beginAtZero: true
}
}
}
});
}

const tips = [
"يمكنك توفير 820 ريال هذا الشهر.",
"إنفاقك أقل من الشهر الماضي بـ 6٪.",
"أنت قريب من تحقيق هدف الادخار.",
"المطاعم هي أعلى فئة إنفاق لديك."
];

const aiTip = document.getElementById("aiTip");

if(aiTip){
aiTip.innerHTML=tips[Math.floor(Math.random()*tips.length)];
}