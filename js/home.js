// بيانات المستخدم
const userData = {
    name: "رباب",
    balance: 58420,
    financialScore: 92,
    income: 15000,
    expenses: 5380,
    restaurants: 1200,
    shopping: 860,
    savings: 22000,
    savingsGoal: 30000
};

// حفظ البيانات ليستخدمها التطبيق كله
localStorage.setItem("waslahUser", JSON.stringify(userData));

// عداد الرصيد
const balance = document.getElementById("balanceCounter");

if (balance) {

    let current = 0;

    const counter = setInterval(() => {

        current += Math.ceil(userData.balance / 350);

        if (current >= userData.balance) {

            current = userData.balance;
            clearInterval(counter);

        }

        balance.textContent = current.toLocaleString();

    }, 5);

}

// رؤى وصلة
const tips = [

    `يمكنك توفير ${Math.round(userData.restaurants * 0.2)} ريال هذا الشهر إذا خفضت إنفاق المطاعم.`,

    `الصحة المالية لديك ${userData.financialScore}/100 وهي ممتازة.`,

    "لاحظنا زيادة في إنفاق التسوق هذا الأسبوع.",

    "أنت قريب من تحقيق هدف الادخار.",

    "يمكنك تقليل الاشتراكات الشهرية لتوفير 150 ريال."

];

const aiTip = document.getElementById("aiTip");

if (aiTip) {

    aiTip.textContent = tips[Math.floor(Math.random() * tips.length)];

}

// ===================================================
// آخر العمليات — عرض ديناميكي + ملخص محسوب تلقائياً
// ===================================================

const recentTransactions = [
    { name: "مطعم زاد", date: "اليوم", time: "2:30 م", amount: -120, icon: "restaurant", type: "expense" },
    { name: "راتب", date: "أمس", amount: 15000, icon: "payments", type: "income" },
    { name: "نون", date: "قبل يومين", amount: -340, icon: "shopping_bag", type: "expense" }
];

function renderTransactions(list) {

    const container = document.getElementById("txList");

    if (!container) return;

    let lastDate = null;
    let html = "";

    list.forEach((tx, index) => {

        if (tx.date !== lastDate) {
            html += `<span class="tx-date">${tx.date}</span>`;
            lastDate = tx.date;
        }

        const isExpense = tx.type === "expense";
        const sign = isExpense ? "-" : "+";
        const amountText = `${sign}${Math.abs(tx.amount).toLocaleString()} ر.س`;
        const metaText = tx.time ? `${tx.date} • ${tx.time}` : tx.date;

        html += `
        <div class="transaction-item" style="--i:${index}">
            <div class="transaction-left">
                <span class="material-icons-outlined icon ${tx.type}">${tx.icon}</span>
                <div>
                    <h4>${tx.name}</h4>
                    <small>${metaText}</small>
                </div>
            </div>
            <strong class="${isExpense ? "expense-text" : "income-text"}">${amountText}</strong>
        </div>`;

    });

    container.innerHTML = html;

}

function renderTransactionSummary(list) {

    const totalExpense = list
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const totalIncome = list
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const total = totalExpense + totalIncome;
    const expensePct = total ? Math.round((totalExpense / total) * 100) : 0;

    const bar = document.getElementById("txBarExpense");
    const expenseLabel = document.getElementById("txTotalExpense");
    const incomeLabel = document.getElementById("txTotalIncome");

    if (bar) {
        requestAnimationFrame(() => {
            bar.style.width = expensePct + "%";
        });
    }

    if (expenseLabel) expenseLabel.textContent = "-" + totalExpense.toLocaleString() + " ر.س";
    if (incomeLabel) incomeLabel.textContent = "+" + totalIncome.toLocaleString() + " ر.س";

}

renderTransactions(recentTransactions);
renderTransactionSummary(recentTransactions);