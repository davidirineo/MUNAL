const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");



menuBtn.addEventListener("click", ()=>{
    menu.classList.toggle("active");
    if(menu.classList.contains("active")){
        menuBtn.innerHTML = "X";
        menu.classList.toggle("aria-expanded", "true");
    }else{
        menuBtn.innerHTML="☰";
        menu.classList.toggle("aria-expanded", "false");
    }
})