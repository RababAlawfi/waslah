// وصلة | الحسابات — مزامنة رزمة البطاقات مع النقاط ولوحة التفاصيل

const track = document.getElementById("cardTrack");
const dotsContainer = document.getElementById("cardDots");
const detail = document.getElementById("accountDetail");

// نجمع بيانات البطاقات الحقيقية فقط (بدون بطاقة "ربط حساب جديد")
const cards = track ? Array.from(track.querySelectorAll(".bank-card-visual:not(.add-card)")) : [];

function buildDots() {

    if (!dotsContainer) return;

    dotsContainer.innerHTML = cards
        .map((_, i) => `<span class="${i === 0 ? "active" : ""}"></span>`)
        .join("");

}

function renderDetail(card) {

    if (!detail || !card) return;

    detail.innerHTML = `
        <div class="stat">
            <label>رقم الحساب</label>
            <strong>${card.dataset.number}</strong>
        </div>
        <div class="stat">
            <label>الرصيد</label>
            <strong>${card.dataset.balance}</strong>
        </div>
        <div class="stat">
            <label>آخر تحديث</label>
            <strong>${card.dataset.updated}</strong>
        </div>
    `;

}

function getActiveIndex() {

    if (!track || !cards.length) return 0;

    const trackCenter = track.scrollLeft + track.clientWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, i) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(cardCenter - trackCenter);

        if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = i;
        }
    });

    return closestIndex;

}

function updateActiveCard() {

    const index = getActiveIndex();

    if (dotsContainer) {
        [...dotsContainer.children].forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });
    }

    renderDetail(cards[index]);

}

if (track && cards.length) {

    buildDots();
    updateActiveCard();

    let scrollTimeout;

    track.addEventListener("scroll", () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveCard, 80);
    });

}

// عدد البنوك المرتبطة فعليًا (بدون بطاقة الإضافة)
const bankCountEl = document.getElementById("bankCount");

if (bankCountEl) {
    bankCountEl.textContent = cards.length;
}