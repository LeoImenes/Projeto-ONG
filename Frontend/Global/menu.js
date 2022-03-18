let menuImg = document.querySelector(".menuJS")
let menuContent = document.querySelector(".menucontent")
let pgAssistencia = document.querySelector(".Assistencia")
let pgFuncionario = document.querySelector(".Funcionario")
let pgAssistido = document.querySelector(".Assistido")
let logout = document.querySelector(".logout")



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