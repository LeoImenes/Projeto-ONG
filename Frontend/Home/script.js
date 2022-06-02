var cargo = localStorage.getItem('userdata')
let linkAssistido = document.querySelector(".cardAssistido").addEventListener("click", () => {
    window.location.href = '../Assistidos/OpcoesAssistido/index.html'
})



let linkAssistencia = document.querySelector(`.cardAssistencia`).addEventListener("click", () => {
    window.location.href = '../Funcionario/Assistencia'
})
let linkFinanceiro = document.querySelector(`.cardLancamento`).addEventListener("click", () => {
    window.location.href = '../Financeiro/FinanceiroAll/index.html'
})



if (JSON.parse(cargo).cargo.toLowerCase() === 'diretor') {
    let linkFuncionario = document.querySelector(".cardFuncionario").addEventListener("click", () => {
        window.location.href = '../Funcionario/OpcoesFuncionario/index.html'
    })
} else {
    let linkFuncionario = document.querySelector(".cardFuncionario").addEventListener("click", () => {
        window.location.href = '../Funcionario/VerFuncionario/index.html'
    })
    let p = document.querySelector(".cardFuncionario p")
    p.innerHTML = "Meu Perfil"
        // let linkFinanceiro = document.querySelector(`.cardLancamento`)
        // linkFinanceiro.style.display = "none"

}