let menuImg = document.querySelector(".menuJS")
let menuContent = document.querySelector(".menucontent")
menuContent.style.marginLeft = "-550px";

function abrirMenu() {

    menuImg.classList.toggle("down");
    if (!menuImg.classList.contains("down")) {
        menuContent.style.marginLeft = "0px";
        menuContent.style.transition = "all 0.5s linear";
        menuImg.style.display = "none";
    }



}

function closeMenu() {
    menuContent.style.marginLeft = "-550px";
    menuContent.style.transition = "all 0.2s linear";
    menuImg.style.display = "flex";
    menuImg.classList.toggle("down");
}