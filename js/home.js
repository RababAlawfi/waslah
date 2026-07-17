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