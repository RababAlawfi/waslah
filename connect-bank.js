const cards = document.querySelectorAll(".bank-card");

const count = document.getElementById("count");

const continueBtn = document.getElementById("continueBtn");

// اختيار وإلغاء اختيار البنك

cards.forEach(card => {

    card.addEventListener("click", () => {

        card.classList.toggle("selected");

        count.textContent =

            document.querySelectorAll(".bank-card.selected").length;

    });

});

// زر المتابعة

continueBtn.addEventListener("click", () => {

    const selectedCards =

        document.querySelectorAll(".bank-card.selected");

    if (selectedCards.length === 0) {

        alert("اختر بنكًا واحدًا على الأقل");

        return;

    }

    const selectedBanks = [];

    selectedCards.forEach(card => {

        selectedBanks.push(

            card.querySelector("h3").textContent

        );

    });

    localStorage.setItem(

        "selectedBanks",

        JSON.stringify(selectedBanks)

    );

    window.location.href = "confirm-link.html";

});