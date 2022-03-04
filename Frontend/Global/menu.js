let menu = document.querySelector(".menu")

function showMenu() {
    let menuJS = document.querySelector(".menuJS");
    menuJS.style.marginLeft = "0"
    menuJS.style.transition = "all 0.5s cubic";
}

function closeMenu() {
    let menuJS = document.querySelector(".menuJS");
    menuJS.style.marginLeft = "-250px"
    menuJS.style.transition = "all 1s linear";

}