// وصلة | التحليلات

// ===================================================
// 1) بوابة الصحة المالية — قوس نصف دائري محسوب من طول المسار الفعلي
// ===================================================

const financialScore = 92;

const gaugeFill = document.getElementById("gaugeFill");
const scoreValueEl = document.getElementById("scoreValue");

if (gaugeFill) {

    const arcLength = gaugeFill.getTotalLength();

    gaugeFill.style.strokeDasharray = arcLength;
    gaugeFill.style.strokeDashoffset = arcLength;

    requestAnimationFrame(() => {
        const offset = arcLength * (1 - financialScore / 100);
        gaugeFill.style.strokeDashoffset = offset;
    });

}

if (scoreValueEl) {
    scoreValueEl.textContent = financialScore;
}

// ===================================================
// 2) فئات الإنفاق — شريط مجزّأ + قائمة، من نفس المصدر
// ===================================================

const categories = [
    { name: "المطاعم", amount: 2640, pct: 32, icon: "restaurant", color: "#D8AE55" },
    { name: "التسوق", amount: 1980, pct: 24, icon: "shopping_bag", color: "#6EA8FF" },
    { name: "النقل", amount: 1485, pct: 18, icon: "directions_car", color: "#B48CFF" },
    { name: "الفواتير", amount: 990, pct: 12, icon: "home", color: "#5FD1C6" }
];

function renderSegmentedBar(list) {

    const bar = document.getElementById("segmentedBar");

    if (!bar) return;

    bar.innerHTML = list
        .map(c => `<span style="width:${c.pct}%; background:${c.color};"></span>`)
        .join("");

}

function renderCategoryList(list) {

    const container = document.getElementById("categoryList");

    if (!container) return;

    container.innerHTML = list.map((c, i) => `
        <div class="category-item${i === 0 ? " highlight" : ""}">
            <span class="category-icon" style="background:${c.color}22; color:${c.color};">
                <span class="material-icons-outlined">${c.icon}</span>
            </span>
            <div>
                <h4>${c.name}${i === 0 ? '<span class="top-tag">الأعلى</span>' : ""}</h4>
                <small>${c.amount.toLocaleString()} ر.س</small>
            </div>
            <strong>${c.pct}%</strong>
        </div>
    `).join("");

}

renderSegmentedBar(categories);
renderCategoryList(categories);

// ===================================================
// 3) ملاحظات سريعة — شريط شرائح أفقي
// ===================================================

const insights = [
    { icon: "trending_up", text: "ارتفع معدل الادخار مقارنة بالشهر الماضي" },
    { icon: "payments", text: "المطاعم أعلى نسبة من مصروفاتك" },
    { icon: "emoji_events", text: "أنت قريب من تحقيق هدف الادخار" },
    { icon: "bolt", text: "فواتيرك أقل من متوسط المستخدمين بـ 10٪" }
];

function renderInsightChips(list) {

    const container = document.getElementById("insightChips");

    if (!container) return;

    container.innerHTML = list.map(i => `
        <div class="insight-chip">
            <span class="material-icons-outlined">${i.icon}</span>
            <span>${i.text}</span>
        </div>
    `).join("");

}

renderInsightChips(insights);

// ===================================================
// 4) الرسم البياني — منحنى بتدرج لوني بدل أعمدة مسطحة
// ===================================================

const ctx = document.getElementById("expenseChart");

if (ctx) {

    const monthlySpend = [7200, 6800, 8100, 7600, 8450, 8250];

    const chartAvgEl = document.getElementById("chartAvg");

    if (chartAvgEl) {
        const avg = Math.round(monthlySpend.reduce((a, b) => a + b, 0) / monthlySpend.length);
        chartAvgEl.textContent = avg.toLocaleString() + " ر.س";
    }

    const gradient = ctx.getContext("2d").createLinearGradient(0, 0, 0, 220);
    gradient.addColorStop(0, "rgba(216,174,85,.35)");
    gradient.addColorStop(1, "rgba(216,174,85,0)");

    new Chart(ctx, {
        type: "line",
        data: {
            labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"],
            datasets: [{
                label: "الإنفاق",
                data: monthlySpend,
                borderColor: "#D8AE55",
                borderWidth: 2.5,
                pointRadius: 0,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#D8AE55",
                pointHoverBorderColor: "#0B2545",
                tension: 0.4,
                fill: true,
                backgroundColor: gradient
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: "#0B2545",
                    titleColor: "#8FA3B8",
                    bodyColor: "#F3F6FA",
                    borderColor: "rgba(216,174,85,.3)",
                    borderWidth: 1,
                    padding: 10,
                    displayColors: false,
                    callbacks: {
                        label: (item) => item.parsed.y.toLocaleString() + " ر.س"
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: "#8FA3B8", font: { family: "IBM Plex Sans Arabic", size: 11 } }
                },
                y: {
                    display: false,
                    beginAtZero: false
                }
            }
        }
    });

}