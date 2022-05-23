var assis = localStorage.getItem("assistido");
var fotoAntes;
var getSexo;

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
        .then((data) => {

            // window.location.href = "http://127.0.0.1:5500/Assistidos/VerAssistido/index.html"

        });

}

function getAll(){
    getComorbidades();
    getAssistido();
    getComorbidadeAssistido();
}


function getAssistido() {
    
    var sexMasc = document.querySelector("#Masculino");
    var sexFem = document.querySelector("#Feminino");
    var sexOutr = document.querySelector("#Outro");

    fetch(`${url}/assistidos/${assis}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data)

        if(data.sexo.toLowerCase() === 'masculino'){
            sexMasc.checked = true;
        }else if(data.sexo.toLowerCase() === 'feminino'){
            sexFem.checked = true;
        }else{
            sexOutr.checked = true;
        }

            fotoAntes = data.foto_antes;
            getSexo = data.sexo;
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
}

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
    var inputs = document.querySelectorAll("input");


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
    } else if ((sex = getSexo))

        var data = JSON.stringify({
            id_assistido: JSON.parse(assis),
            nome_completo: nome.value,
            nome_social: nomesoc.value,
            rg: rg.value,
            cpf: cpf.value,
            data_nascimento: `${dataUS(nasc)}`,
            estado_civil: est.value,
            naturalidade: nat.value,
            sexo: sex === undefined ? getSexo : sex,
            cartao_cidadao: cartCid.value,
            cartao_sus: cartSus.value,
            foto_depois: fotinho,
            antecedente_criminal: ante.value,
            foto_antes: fotoAntes,
        });

    console.log(`%c ${data}`, "color:red")

    fetch(`${url}/assistido/update`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: data,
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                console.log("Falha ao atualizar");
            }
        })
        .then((data) => {
            if (data.ok) {
                getComorbidades()
                console.log("Deu certo")
            }

            // window.location.href = "../VerAssistido/index.html";
            console.log(data)
        });
}

function getComorbidades() {
    var listaComorbidade = document.querySelectorAll(".Comorbidade")
    let listaDrogas = document.querySelector(".listadrogas")
    let listaDoencas = document.querySelector(".listadoencas")
    let ulDoenca = document.createElement("ul")
    let ulDroga = document.createElement("ul")
    let liDoenca = document.createElement("p")
    let liDroga = document.createElement("p")

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

            })


        })

}

function updateComorbidades() {
    var listaComorbidade = document.querySelectorAll(".Comorbidade");
    listaComorbidade.forEach((item, index) => {

        if (item.checked === true) {
            var comor = {
                "id_assistido": JSON.parse(assis),
                "comorbidades": [{
                    "value": `${item.value}`
                }]
               
            }

            console.log(comor)
            fetch(`${url}/assistido/saude`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(comor)
            })
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        alert("Falha ao Cadastrar Comorbidades")
                    }
                })
                .then(data => {

                })
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

function getComorbidadeAssistido() {
    var listaComorbidade = document.querySelector(".droga").innerHTML
    var Comorbidadesinputs = document.querySelectorAll(".Comorbidade input")
    fetch(`${url}/assistido/saudeID/${assis}`)
    .then(response => { return response.json()})
    .then(data => {
        console.log(listaComorbidade)
        data.forEach(item => {
            
            if(listaComorbidade.contains(item.comorbidade)){
                console.log(item.comorbidade)
            }
        })
    })
}