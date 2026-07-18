// عناصر الصفحة
const input = document.querySelector(".input-area input");
const sendBtn = document.querySelector(".input-area button");
const chatArea = document.querySelector(".chat-area");
const prompts = document.querySelectorAll(".prompt");

// قراءة بيانات المستخدم من الصفحة الرئيسية
let user = JSON.parse(localStorage.getItem("waslahUser"));

if (!user) {
    user = {
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
}

// إضافة رسالة للشات
function addMessage(text, sender) {

    const message = document.createElement("div");
    message.className = `message ${sender}`;

    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = text;

    message.appendChild(bubble);
    chatArea.appendChild(message);

    chatArea.scrollTop = chatArea.scrollHeight;

    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });

}

// رد الذكاء الاصطناعي
function botReply(question) {

    let reply = "";

    const restaurantsPercent = Math.round((user.restaurants / user.expenses) * 100);
    const shoppingPercent = Math.round((user.shopping / user.expenses) * 100);
    const savingProgress = Math.round((user.savings / user.savingsGoal) * 100);

    if (
        question.includes("حلل") ||
        question.includes("مصروف") ||
        question.includes("تحليل")
    ) {

        reply =
`📊 تحليل وضعك المالي

💰 الرصيد الحالي: ${user.balance.toLocaleString()} ريال

⭐ الصحة المالية: ${user.financialScore}/100

📉 إجمالي المصروفات: ${user.expenses.toLocaleString()} ريال

🍽️ المطاعم تمثل ${restaurantsPercent}% من إجمالي الإنفاق.

🛍️ التسوق يمثل ${shoppingPercent}% من الإنفاق.

💡 يمكنك توفير حوالي ${Math.round(user.restaurants * 0.2).toLocaleString()} ريال شهريًا إذا خفضت إنفاق المطاعم بنسبة 20%.`;

    }

    else if (
        question.includes("وفر") ||
        question.includes("توفير")
    ) {

        reply =
`💡 اقتراحات التوفير

✅ تقليل المطاعم.

✅ مراجعة الاشتراكات الشهرية.

✅ تحويل جزء من الدخل إلى الادخار مباشرة.

بهذه الخطوات تستطيع زيادة مدخراتك بشكل ملحوظ.`;

    }

    else if (
        question.includes("ميزانية")
    ) {

        reply =
`📊 أفضل ميزانية لك

50٪ للاحتياجات الأساسية

30٪ للرغبات

20٪ للادخار والاستثمار

وهذا التقسيم مناسب لدخلك الحالي.`;

    }

    else if (
        question.includes("طبيعي") ||
        question.includes("إنفاق")
    ) {

        reply =
`✅ إنفاقك جيد بشكل عام.

لكن الإنفاق على المطاعم أعلى من المتوسط.

أنصح بمراجعته خلال الشهر القادم لتحقيق ادخار أكبر.`;

    }

    else if (
        question.includes("ادخار") ||
        question.includes("هدف")
    ) {

        reply =
`🎯 تقدم الادخار

حققت ${savingProgress}% من هدف الادخار.

المبلغ المدخر:
${user.savings.toLocaleString()} ريال

المتبقي للوصول للهدف:
${(user.savingsGoal - user.savings).toLocaleString()} ريال.`;

    }

    else if (
        question.includes("رصيد")
    ) {

        reply =
`💰 رصيدك الحالي هو

${user.balance.toLocaleString()} ريال.`;

    }

    else if (
        question.includes("مرحبا") ||
        question.includes("السلام")
    ) {

        reply =
`أهلًا ${user.name} 👋

أنا وصلة AI.

أستطيع مساعدتك في تحليل الإنفاق، الادخار، الأهداف المالية والميزانية.`;

    }

    else {

        reply =
`أنا وصلة AI 🤖

يمكنني مساعدتك في:

• تحليل المصروفات
• تحليل الميزانية
• متابعة الادخار
• متابعة الأهداف
• اقتراح طرق للتوفير`;

    }

    setTimeout(() => {

        addMessage(reply, "bot");

    }, 700);

}

// إرسال الرسالة
function sendMessage() {

    const text = input.value.trim();

    if (text === "") return;

    addMessage(text, "user");

    input.value = "";

    botReply(text);

}

// زر الإرسال
sendBtn.addEventListener("click", sendMessage);

// زر Enter
input.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        sendMessage();

    }

});

// الأزرار السريعة
prompts.forEach(btn => {

    btn.addEventListener("click", () => {

        input.value = btn.innerText;

        sendMessage();

    });

});