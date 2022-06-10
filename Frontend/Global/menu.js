var cargo = localStorage.getItem('userdata')

let menuImg = document.querySelector(".menuJS")
let menuContent = document.querySelector(".menucontent")
let pgAssistencia = document.querySelector(".Assistencia")
let pgFuncionario = document.querySelector(".Funcionario")
let pgAssistido = document.querySelector(".Assistido")
let logout = document.querySelector(".logout")
let home = document.querySelector(".config")
menuContent.style.marginLeft = "-550px";

function abrirMenu() {

    menuImg.classList.toggle("down");
    if (!menuImg.classList.contains("down")) {
        menuContent.style.marginLeft = "0px";
        menuContent.style.transition = "all 0.2s ";
        menuImg.style.display = "none";
    }
}

function closeMenu() {
    menuContent.style.marginLeft = "-550px";
    menuContent.style.transition = "all 0.2s linear";
    menuImg.style.display = "flex";
    menuImg.classList.toggle("down");
}

if (JSON.parse(cargo).cargo.toLowerCase() === 'diretor') {
    let Funcionario = document.querySelector(".Funcionario")
    Funcionario.style.cursor = "pointer"
    Funcionario.addEventListener("click", () => {
        window.location.href = "../../Funcionario/OpcoesFuncionario/index.html"

    })
} else {
    let Funcionario = document.querySelector(".Funcionario")
    let p = document.querySelector(".Funcionario p")
    p.innerHTML = "Meu Perfil"
    Funcionario.style.cursor = "pointer"
    Funcionario.addEventListener("click", () => {
        window.location.href = "../../Funcionario/VerFuncionario/index.html"

    })
}

let sair = document.querySelector(".logout")
sair.style.cursor = "pointer"
sair.addEventListener("click", () => {
    window.location.href = "../../Login/index.html"
    localStorage.clear
})

let Assistencia = document.querySelector(".Assistencia")
Assistencia.style.cursor = "pointer"
Assistencia.addEventListener("click", () => {
    window.location.href = "../../Funcionario/Assistencia"
})

let Financeiro = document.querySelector(".Lancamentos")
Financeiro.style.cursor = "pointer"
Financeiro.addEventListener("click", () => {
    window.location.href = "../../Financeiro/FinanceiroAll"
})

home.style.cursor = "pointer"
home.addEventListener("click", () => {
    window.location.href = "../../Home/index.html"
})

let Assistido = document.querySelector(".Assistidos")
Assistido.style.cursor = "pointer"
Assistido.addEventListener("click", () => {
    window.location.href = "../../Assistidos/OpcoesAssistido/index.html"
    localStorage.clear
})

let Home = document.querySelector(".config")
Home.style.cursor = "pointer"
Home.addEventListener("click", () => {
    window.location.href = "../../Home/index.html"
})

let dados = localStorage.getItem('userdata')
let funcionario = JSON.parse(dados)
console.log(funcionario)