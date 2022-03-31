var func = localStorage.getItem("assistido");

var fotinho;
var newImg = document.querySelector(".foto");
var adcFoto = document.querySelector(".adcFoto");
var fileInp = document.querySelector("#inpFoto");
fileInp.addEventListener("change", (e) => {
    var fr = new FileReader();
    fr.onloadend = (foto) => {
        fotinho = foto.target.result;
        newImg.src = foto.target.result;
        newImg.style.width = "70px";
        newImg.style.height = "70px";
        newImg.style.borderRadius = "50%";
    };
    fr.readAsDataURL(e.target.files[0]);
});

adcFoto.style.cursor = "pointer";

adcFoto.addEventListener("click", () => {
    fileInp.click();
});

function cadastrarAssistido() {
    var inpNomeCom = document.querySelector(".nome-Completo");
    var nome = document.querySelector(".nome");
    var nomesoc = document.querySelector(".nome-soc");
    var rg = document.querySelector(".rg");
    var cpf = document.querySelector(".cpf");
    var est = document.querySelector(".estado");
    var nat = document.querySelector(".naturalidade");
    var nasc = document.querySelector(".nasc").value;
    var cartCid = document.querySelector(".cartCid");
    var cartSus = document.querySelector(".cartSus");
    var ante = document.querySelector(".ant");

    var dia = nasc.split("/")[0];
    var mes = nasc.split("/")[1];
    var ano = nasc.split("/")[2];

    if (nome.value == "") {
        var nomeerr = document.createElement("p");
        nomeerr.innerHTML = "* Preencha este campo";
        nomeerr.style.display = "flex";
        nomeerr.style.color = "red";
        nomeerr.style.width = "90%";
        nomeerr.style.fontSize = "14px";
        inpNomeCom.appendChild(nomeerr);
    }

    var sexMasc = document.querySelector("#Masculino");
    var sexFem = document.querySelector("#Feminino");
    var sexOutr = document.querySelector("#Outro");

    var sex = [];

    if (sexMasc.checked == 1) {
        sexMasc.value = "Masculino";
        sex.push(sexMasc.value);
    } else if (sexFem.checked == 1) {
        sexFem.value = "Feminino";
        sex.push(sexFem.value);
    } else if (sexOutr.checked == 1) {
        sexOutr.value = "Outro";
        sex.push(sexOutr.value);
    } else if (
        sexOutr.checked == 0 &&
        sexMasc.checked == 0 &&
        sexFem.checked == 0
    ) {
        alert("Selecione pelo menos uma opção (Sexo)");
    }

    var data = JSON.stringify({
        "id_assistido": JSON.parse(func),
        "nome_completo": nome.value,
        "nome_social": nomesoc.value,
        "rg": rg.value,
        "cpf": cpf.value,
        "data_nascimento": `${ano}-${mes}-${dia}`,
        "estado_civil": est.value,
        "naturalidade": nat.value,
        "sexo": sex,
        "cartao_cidadao": cartCid.value,
        "cartao_sus": cartSus.value,
        "foto_depois": fotinho,
        "antecedente_criminal": ante.value,
        // "foto_depois": fotinho
    });

    console.log(data)

    // fetch("http://10.87.207.27:3000/assistido/update", {
    fetch("http://localhost:3000/assistido/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data)

        });
}

function getAssistido() {
    fetch(`http://localhost:3000/assistidos/${func}`)
        // fetch(`http://10.87.207.27:3000/assistidos/${func}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            var inpNomeCom = document.querySelector(".nome-Completo");
            var nome = document.querySelector(".nome");
            var nomesoc = document.querySelector(".nome-soc");
            var rg = document.querySelector(".rg");
            var cpf = document.querySelector(".cpf");
            var est = document.querySelector(".estado");
            var nat = document.querySelector(".naturalidade");
            var nasc = document.querySelector(".nasc");
            var cartCid = document.querySelector(".cartCid");
            var cartSus = document.querySelector(".cartSus");
            var ante = document.querySelector(".ant");

            nasc.placeholder = data.data_nascimento;
            var formatnasc = nasc.placeholder.split('T')[0];

            var dia = formatnasc.split("-")[2]
            var mes = formatnasc.split("-")[1]
            var ano = formatnasc.split("-")[0]




            nome.placeholder = "Nome:" + data.nome_completo;
            nomesoc.placeholder = "Nome Social: " + data.nome_social;
            rg.placeholder = "RG:" + data.rg;
            cpf.placeholder = "Cpf: " + data.cpf;
            est.placeholder = "Estado Civil:" + data.estado_civil;
            nat.placeholder = "Natural de: " + data.naturalidade;
            nasc.placeholder = "Nascimento: " + `${dia}/${mes}/${ano}`
            cartCid.placeholder = "Cartão Cidadão: " + data.cartao_cidadao;
            cartSus.placeholder = "Cartão Sus: " + data.cartao_sus;
            ante.placeholder = "Antecedente Criminal:" + data.antecedente_criminal;



        });
}