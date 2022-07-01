var assis = localStorage.getItem("assistido");
var met;
var fotoAntes;
var getSexo;
var fotogetAssisitdo;
var fotogetAssisitdoantes;
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


function getAll() {
    getComorbidades();
    getComorbidadeAssistido()
    getAssistido();

}


function getAssistido() {

    var sexMasc = document.querySelector("#Masculino");
    var sexFem = document.querySelector("#Feminino");
    var sexOutr = document.querySelector("#Outro");

    try {
        fetch(`${url}/assistidos/${assis}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {


                if (data.foto_depois === "null" || data.foto_depois === "undefined") {
                    fotogetAssisitdo = "../../Assets/icones/user.png"
                } else {
                    fotogetAssisitdo = (data.foto_depois);
                }
                if (data.sexo.toLowerCase() === 'masculino') {
                    sexMasc.checked = true;
                } else if (data.sexo.toLowerCase() === 'feminino') {
                    sexFem.checked = true;
                } else {
                    sexOutr.checked = true;
                }

                fotoAntes = data.foto_antes;
                getSexo = data.sexo;
                var newImg = document.querySelector(".foto").src = fotogetAssisitdo;
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


                nome.value = data.nome_completo;
                nomesoc.value = data.nome_social;
                rg.value = data.rg;
                cpf.value = data.cpf;
                est.value = data.estado_civil;
                nat.value = data.naturalidade;
                nasc.value = `${dataCoverter(data.data_nascimento)}`;
                cartCid.value = data.cartao_cidadao;
                cartSus.value = data.cartao_sus;
                ante.value = data.antecedente_criminal;
            });
    } catch (e) {
        console.log(e);
    }
}

function updateAssistido() {
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
    var inputs = document.querySelectorAll("input");
    var nomeerr = document.createElement("p")
    nomeerr.innerHTML = "* Preencha este campo"
    nomeerr.style.display = "flex"
    nomeerr.style.marginTop = "5px"
    nomeerr.style.color = "red"
    nomeerr.style.width = "100%"
    nomeerr.style.fontSize = "10px"


    var sexMasc = document.querySelector("#Masculino");
    var sexFem = document.querySelector("#Feminino");
    var sexOutr = document.querySelector("#Outro");


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
        alert("Selecione pelo menos uma opção (Sexo)")
    }
    if (fotinho === undefined) {
        fotinho = fotogetAssisitdo
    }

    var dadosAtt = JSON.stringify({
        id_assistido: assis,
        nome_completo: nome.value,
        nome_social: nomesoc.value,
        rg: rg.value,
        cpf: cpf.value,
        antecedente_criminal: ante.value,
        data_nascimento: `${dataUS(nasc.value)}`,
        naturalidade: nat.value,
        estado_civil: est.value,
        sexo: sex,
        cartao_cidadao: cartCid.value,
        cartao_sus: cartSus.value,
        foto_depois: fotinho,
        foto_antes: fotoAntes
    })

    if ((nome.value == "") && ((nasc.value == ""))) {
        inpNomeCom.appendChild(nomeerr)
        document.querySelector(".Nascimento").appendChild(nomeerr)
    } else if ((nome.value == "")) {
        inpNomeCom.appendChild(nomeerr)
    } else if ((nasc.value == "") || (nasc.value == 00 / 00 / 0000)) {
        document.querySelector(".Nascimento").appendChild(nomeerr)
    }

    try {
        fetch(`${url}/assistido/update`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: dadosAtt
            })
            .then(response => {
                if ((nome.value !== "") && ((nasc.value !== ""))) {
                    alert('Dados Atualizados com Sucesso')
                    return response.json()
                }
            })
            .then(data => {
                window.location.href = "../VerAssistido"
            })
    } catch (e) {
        console.log(e)
    }
}


function getComorbidades() {
    var listaComorbidade = document.querySelectorAll(".Comorbidade")
    let listaDrogas = document.querySelector(".listadrogas")
    let listaDoencas = document.querySelector(".listadoencas")
    let ulDoenca = document.createElement("ul")
    let ulDroga = document.createElement("ul")
    let liDoenca = document.createElement("p")
    let liDroga = document.createElement("p")
    try {
        fetch(`${url}/assistido/comorbidade`)
            .then(response => { return response.json() })
            .then(data => {
                data.forEach((item) => {
                    let inpDoenca = document.createElement("input")
                    let inpDroga = document.createElement("input")

                    inpDroga.type = "checkbox"
                    inpDoenca.type = "checkbox"
                    inpDroga.className = "Comorbidade"
                    inpDoenca.className = "Comorbidade"
                    liDoenca.className = "doenca"
                    liDroga.className = 'droga'

                    if (item.tipo === 1) {
                        liDoenca.innerHTML = item.comorbidade
                        inpDoenca.value = item.id_comorbidade
                        liDoenca.appendChild(inpDoenca)
                        ulDoenca.appendChild(liDoenca.cloneNode(true));
                        // ul.appendChild(liinp.cloneNode(true));
                        listaDoencas.appendChild(ulDoenca)
                    } else if (item.tipo === 0) {
                        inpDroga.value = item.id_comorbidade
                        liDroga.innerHTML = item.comorbidade
                        liDroga.appendChild(inpDroga)
                        ulDroga.appendChild(liDroga.cloneNode(true));
                        // ul.appendChild(liinp.cloneNode(true));
                        listaDrogas.appendChild(ulDroga)
                    }
                });
            });
    } catch (e) {
        console.log(e);
    }

}

function getComorbidadeAssistido() {
    try {
        fetch(`${url}/assistido/saudeID/${assis}`)
            .then(response => { return response.json() })
            .then(data => {
                if (data.length <= 0) met = "POST"
                else met = "PUT"
            })
    } catch (e) {
        console.log(e);
    }
}

function updateComorbidades() {
    var listaComorbidade = document.querySelectorAll(".Comorbidade");
    listaComorbidade.forEach((item, index) => {

        if (item.checked === true) {
            var comor = {
                "id_assistido": JSON.parse(assis),
                "comorbidades": [{ "value": parseInt(item.value) }]
            }

            try {
                fetch(`${url}/assistido/saude`, {
                    method: met,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(comor)
                }).then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        alert("Falha ao Cadastrar Comorbidades");
                    }
                }).then(data => {});

            } catch (e) { console.log(e) }
        }
    });
}

function showMenu() {
    let menuPsco = document.querySelector(".listadrogas")
    let menuimgPsco = document.querySelector(".pscArrow")
    menuPsco.classList.toggle("psDown")
    menuimgPsco.style.transform = "rotate(0deg)"

    if (menuPsco.classList.contains("psDown")) {
        menuPsco.style.display = "flex";
        menuimgPsco.style.transform = "rotate(180deg)"
    } else {
        menuPsco.style.display = "none"
        menuimgPsco.style.transform = "rotate(0deg)"
    }
}

function showMenuDoenca() {

    let menuDoenca = document.querySelector(".listadoencas")
    let menuimgDoen = document.querySelector(".doArrow")
    menuDoenca.classList.toggle("doDown")
    menuimgDoen.style.transform = "rotate(0deg)"

    if (menuDoenca.classList.contains("doDown")) {
        menuDoenca.style.display = "flex";
        menuimgDoen.style.transform = "rotate(180deg)"
    } else {
        menuDoenca.style.display = "none"
        menuimgDoen.style.transform = "rotate(0deg)"
    }
}

function cadastrarFotoDepois() {

    var local = localStorage.getItem("assistido");
    let data = JSON.stringify({
        'id_assistido': local,
        'foto_depois': fotinho,
    });

    if (fotinho === undefined) {
        alert("Foto não atualizada")
        fotinho = null;
    } else {
        alert("foto atualizada")
    }

    try {
        fetch(`${url}/assistido_foto_depois`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data
            })
            .then((response) => {
                return response.json();
            })
            .then((data));
    } catch (e) { console.log(e) }

}