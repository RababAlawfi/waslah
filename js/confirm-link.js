const banks =
JSON.parse(localStorage.getItem("selectedBanks")) || [];

const list =
document.getElementById("banksList");

banks.forEach(bank=>{

const li=document.createElement("li");

li.innerHTML=`
<span class="material-icons-outlined">
check_circle
</span>
${bank}
`;

list.appendChild(li);

});

const agree=
document.getElementById("agreeCheck");

const btn=
document.getElementById("confirmBtn");

agree.addEventListener("change",()=>{

if(agree.checked){

btn.disabled=false;

btn.classList.add("enabled");

}else{

btn.disabled=true;

btn.classList.remove("enabled");

}

});

btn.onclick=()=>{

window.location.href="loading.html";

};