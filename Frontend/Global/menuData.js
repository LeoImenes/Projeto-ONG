function getfunc() {
    let user = document.querySelector(".Username");
    let foto = document.querySelector(".userimg");
    user.innerHTML = funcionario.nome_completo
    foto.src = funcionario.foto

    fetch(`https://app-ongdigital-backend.herokuapp.com/funcionarios/${funcionario.matricula}`)
        .then(resp => { return resp.json() })
        .then(data => {
            user.innerHTML = data[0].nome_completo
            foto.src = data[0].foto


        })
}