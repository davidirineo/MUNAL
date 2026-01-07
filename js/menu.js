const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementsById("menu");

menuBtn.addEventListener("click", ()=>{
    menu.classList.toggle("active");
    if(menu.classList.contains("active")){
        menuBtn.innerHTML = "X";
        menuBtn.setAttribute("aria-expanded", "true");
    }else{
        menuBtn.innerHTML="☰";
        menuBtn.setAttribute("aria-expanded", "false");
    }
})