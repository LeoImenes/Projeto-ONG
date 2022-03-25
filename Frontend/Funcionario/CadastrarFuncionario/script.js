function cadastrarAssistido() {
    let inpNomeCom = document.querySelector(".nome-Completo")
    let nome = document.querySelector(".nome")
    let nomesoc = document.querySelector(".nome-soc");
    let rg = document.querySelector(".rg");
    let cpf = document.querySelector(".cpf");
    let est = document.querySelector(".estado");
    let nat = document.querySelector(".naturalidade");
    let nasc = document.querySelector(".nasc")
    let cartCid = document.querySelector(".cartcid");
    let cartSus = document.querySelector(".cartSus");


    if ((nome.value == "")) {
        var nomeerr = document.createElement("p")
        nomeerr.innerHTML = "* Preencha este campo"
        nomeerr.style.display = "flex"
        nomeerr.style.color = "red"
        nomeerr.style.width = "90%"
        inpNomeCom.appendChild(nomeerr)
    }


    let sexMasc = document.querySelector("#Masculino");
    let sexFem = document.querySelector("#Feminino");
    let sexOutr = document.querySelector("#Outro");

    var sex = [];

    if (sexMasc.checked == 1) {
        sexMasc.value = "Masculino";
        sex.push(sexMasc.value)
    } else if (sexFem.checked == 1) {
        sexFem.value = "Feminino";
        sex.push(sexFem.value)
    } else if (sexOutr.checked == 1) {
        sexOutr.value = "Outro";
        sex.push(sexOutr.value);
    } else if ((sexOutr.checked == 0) && (sexMasc.checked == 0) && (sexFem.checked == 0)) {
        alert("Selecione pelo menos um campo")
    }



    let data = JSON.stringify({
        "id_funcionario": 3,
        "nome_completo": nome.value,
        "nome_social": nomesoc.value,
        "rg": rg.value,
        "cpf": cpf.value,
        "data_nascimento": nasc.value,
        "estado_civil": est.value,
        "naturalidade": nat.value,
        "sexo": sex,
        "cartao_sus": cartSus.value,
    })

    fetch("http://10.87.207.27:3000/funcionarios", {
    // fetch("http://localhost:3000/funcionarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        })
        .then(response => { return response.json() })
        .then(data => {
            console.log(data)
        })



}