function cadastrarAssistido() {
    let inpNomeCom = document.querySelector(".nome-Completo")
    let nome = document.querySelector(".nome")
    let nomesoc = document.querySelector(".nome-soc");
    let rg = document.querySelector(".rg");
    let cpf = document.querySelector(".cpf");
    let est = document.querySelector(".estado");
    let nat = document.querySelector(".naturalidade");
    let nasc = document.querySelector(".nasc")
    let cartCid = document.querySelector(".cartcid").value;
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
        "cartao_cidadao": cartCid.value,
        "cartao_sus": cartSus.value,
    })

    fetch("http://10.87.207.27:3000/assistidos", {
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

function getComorbidades() {
    let listaDrogas = document.querySelector(".listadrogas")
    let listaDoencas = document.querySelector(".listadoencas")
    let ulDoenca = document.createElement("ul")
    let ulDroga = document.createElement("ul")
    let liDoenca = document.createElement("p")
    let liDroga = document.createElement("p")
    let inpDoenca = document.createElement("input")
    let inpDroga = document.createElement("input")

    inpDroga.type = "checkbox"
    inpDoenca.type = "checkbox"

    fetch("http://10.87.207.27:3000/assistido/comorbidade")
        .then(response => { return response.json() })
        .then(data => {
            data.forEach((item) => {
                if (item.tipo === 1) {
                    liDoenca.innerHTML = item.comorbidade
                    liDoenca.appendChild(inpDoenca.cloneNode(true))
                    ulDoenca.appendChild(liDoenca.cloneNode(true));
                    // ul.appendChild(liinp.cloneNode(true));
                    listaDoencas.appendChild(ulDoenca)
                } else if (item.tipo === 0) {
                    liDroga.innerHTML = item.comorbidade
                    liDroga.appendChild(inpDroga.cloneNode(true))
                    ulDroga.appendChild(liDroga.cloneNode(true));
                    // ul.appendChild(liinp.cloneNode(true));
                    listaDrogas.appendChild(ulDroga)
                }
            })
        })

}


let adcFoto = document.querySelector('.adcFoto')
let fileInp = document.querySelector("#inpFoto")

function ImgtoBase(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(error);
    });
}




adcFoto.addEventListener('click', () => {
    fileInp.click();
})