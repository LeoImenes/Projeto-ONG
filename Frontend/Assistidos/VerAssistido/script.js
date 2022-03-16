function menuDown() {
    let menuFam = document.querySelector(".dadosFamilia")
    let littlearrow = document.querySelector(".arrow")
    menuFam.classList.toggle(".faDown")


    if (menuFam.classList.contains(".faDown")) {
        menuFam.style.display = "flex";
        littlearrow.style.transform = "rotate(180deg)"


    } else {
        menuFam.style.display = "none"
        littlearrow.style.transform = "rotate(0deg)"
    }
}

function menuDownAco() {
    let menuAco = document.querySelector(".acompanhamento")
    let littlearrow = document.querySelector(".arrow")
    menuAco.classList.toggle(".acoDown")


    if (menuAco.classList.contains(".acoDown")) {
        menuAco.style.display = "flex";
        littlearrow.style.transform = "rotate(180deg)"


    } else {
        menuAco.style.display = "none"
        littlearrow.style.transform = "rotate(0deg)"
    }
}