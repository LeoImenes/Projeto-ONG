function menuDown() {
    let menuFam = document.querySelector(".dadosFamilia")
    let littlearrow = document.querySelector(".faArrow")
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
    let menuAco = document.querySelector(".acolist")
    let littlearrow = document.querySelector(".acoArrow")
    menuAco.classList.toggle(".acoDown")


    if (menuAco.classList.contains(".acoDown")) {
        menuAco.style.display = "flex";
        littlearrow.style.transform = "rotate(180deg)"


    } else {
        menuAco.style.display = "none"
        littlearrow.style.transform = "rotate(0deg)"
    }
}

function menuDownPsco() {
    let menuAco = document.querySelector(".psclist")
    let littlearrow = document.querySelector(".pscArrow")
    menuAco.classList.toggle(".psDown")


    if (menuAco.classList.contains(".psDown")) {
        menuAco.style.display = "flex";
        littlearrow.style.transform = "rotate(180deg)"


    } else {
        menuAco.style.display = "none"
        littlearrow.style.transform = "rotate(0deg)"
    }
}

function menuDownDoenca() {
    let menuAco = document.querySelector(".doclist")
    let littlearrow = document.querySelector(".doArrow")
    menuAco.classList.toggle(".doDown")


    if (menuAco.classList.contains(".doDown")) {
        menuAco.style.display = "flex";
        littlearrow.style.transform = "rotate(180deg)"


    } else {
        menuAco.style.display = "none"
        littlearrow.style.transform = "rotate(0deg)"
    }
}