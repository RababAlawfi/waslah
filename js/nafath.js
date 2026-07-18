const btn = document.getElementById("loginBtn");

btn.addEventListener("click", () => {

    btn.textContent = "جاري تسجيل الدخول...";

    btn.disabled = true;

    setTimeout(() => {

       window.parent.document.getElementById("appFrame").src = "pages/connect-bank.html";

    }, 1800);

});