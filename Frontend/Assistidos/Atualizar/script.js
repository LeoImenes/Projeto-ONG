var func = localStorage.getItem("assistido");
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

    if(fotinho === undefined){
        alert("Foto não atualizada")
        fotinho = null;
    }else{
        alert("foto atualizada")
    }


    // fetch(`http://10.87.207.11:3000/assistido_foto_depois`, {
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


function getAssistido() {
    fetch(`${url}/assistidos/${func}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
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
        var datas = JSON.stringify({
            id_assistido: JSON.parse(func),
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

<<<<<<< HEAD
        console.log(`%c ${datas}`, "color:red")
=======
        console.log(data)
>>>>>>> aa90b4f3d8e2996a64d6095aaeba4ac309ca09a7

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
            // window.location.href = "../VerAssistido/index.html";
<<<<<<< HEAD
            console.log(data)
=======
>>>>>>> aa90b4f3d8e2996a64d6095aaeba4ac309ca09a7
        });
}