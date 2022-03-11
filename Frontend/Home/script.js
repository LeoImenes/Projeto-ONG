let dados = localStorage.getItem('userdata')
let funcionario = JSON.parse(dados).id_funcionario

console.log(funcionario)
async function getfunc() {
    let user = document.querySelector(".User");
    fetch(`http://10.87.207.27:3000/funcionarios/${funcionario}`)
        .then(resp => { return resp.json() })
        .then(data => {
            user.innerHTML = data[0].nome_completo

        })
}