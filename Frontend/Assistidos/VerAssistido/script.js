function menuDown() {
    let menuFam = document.querySelector(".dadosFamilia");
    let littlearrow = document.querySelector(".faArrow");
    menuFam.classList.toggle(".faDown");

    if (menuFam.classList.contains(".faDown")) {
        menuFam.style.display = "flex";
        littlearrow.style.transform = "rotate(180deg)";
    } else {
        menuFam.style.display = "none";
        littlearrow.style.transform = "rotate(0deg)";
    }
}

function getFamiliares() {
    let dadosFamilia = document.querySelector(".dadosFamilia");
    var local = localStorage.getItem("assistido");
    // fetch(`http://10.87.207.27:3000/assistido/busca_familiar/${local}`)
    fetch(`http://localhost:3000/assistido/busca_familiar/${local}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {


            data.forEach((item, index) => {
                var familia = document.createElement('div')
                var familias = document.createElement('div')

                var divnome = document.createElement('div')
                var ulnome = document.createElement('ul')
                var linome = document.createElement('h2')

                var divrg = document.createElement('div')
                var ulrg = document.createElement('ul')
                var lirg = document.createElement('h2')


                var divpar = document.createElement('div')
                var ulpar = document.createElement('ul')
                var lipar = document.createElement('h2')


                var divtl = document.createElement('div')
                var ultl = document.createElement('ul')
                var litel = document.createElement('h2')


                var divemail = document.createElement('div')
                var ulemail = document.createElement('ul')
                var li_email = document.createElement('h2')


                var divend = document.createElement('div')
                var ulend = document.createElement('ul')
                var liend = document.createElement('h2')



                linome.innerHTML = "Nome: " + `${item.nome_familiar}`;
                lirg.innerHTML = "RG: " + ` ${item.rg_familiar}`;
                lipar.innerHTML = "Parentesco: " + `${item.parentesco}`;
                litel.innerHTML = "Telefone: " + `${item.telefone_familiar}`;
                li_email.innerHTML = "Email: " + `${item.email_familiar}`;
                liend.innerHTML = "Endereco: " + `${item.endereco_familiar}`;



                divnome.appendChild(linome)
                divrg.appendChild(lirg)
                divpar.appendChild(lipar)
                divtl.appendChild(litel)
                divemail.appendChild(li_email)
                divend.appendChild(liend)


                familia.appendChild(divnome)
                familia.appendChild(divrg)
                familia.appendChild(divpar)
                familia.appendChild(divpar)
                familia.appendChild(divtl)
                familia.appendChild(divemail)
                familia.appendChild(divend)

                familia.className = "familiaMembros"
                familias.appendChild(familia)
                familias.className = "familias"
                dadosFamilia.appendChild(familias)
            });
        });
}

function menuDownPsco() {
    let menuAco = document.querySelector(".psclist");
    let littlearrow = document.querySelector(".pscArrow");
    menuAco.classList.toggle(".psDown");

    if (menuAco.classList.contains(".psDown")) {
        menuAco.style.display = "flex";
        menuAco.style.width = "100%";
        menuAco.style.height = "100%";
        littlearrow.style.transform = "rotate(180deg)";
    } else {
        menuAco.style.display = "none";
        littlearrow.style.transform = "rotate(0deg)";
    }
}

function menuDownDoenca() {
    let menuAco = document.querySelector(".doclist");
    let littlearrow = document.querySelector(".doArrow");
    menuAco.classList.toggle(".doDown");

    if (menuAco.classList.contains(".doDown")) {
        menuAco.style.display = "flex";
        littlearrow.style.transform = "rotate(180deg)";
    } else {
        menuAco.style.display = "none";
        littlearrow.style.transform = "rotate(0deg)";
    }
}

function list() {
    getComorbidadeAssistido()

    var local = localStorage.getItem("assistido");

    var body = document.querySelector(body);
    // fetch(`http://10.87.207.27:3000/assistidos/${local}`)
    fetch(`http://localhost:3000/assistidos/${local}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            var antes = document.querySelector("#assistidoAntes");
            antes.src = data.foto_antes;
            antes.style.borderRadius = "50%";
            var depois = document.querySelector("#assistidoDepois");
            depois.src = data.foto_depois;
            depois.style.borderRadius = "50%";

            var dataNascimento;
            var newData = data.data_nascimento.split("T");
            newData.forEach((item, index) => {
                if (index === 0) {
                    var ano = item.split("-")[0];
                    var mes = item.split("-")[1];
                    var dia = item.split("-")[2];
                    dataNascimento = `${dia}/${mes}/${ano}`;
                }
            });

            let nome = document.querySelector(".nomeCom");
            let nomeSoc = document.querySelector(".nomeSoc");
            let rg = document.querySelector(".rg-con");
            let cpf = document.querySelector(".cpf-con");
            let datanasc = document.querySelector(".data");
            let cartCid = document.querySelector(".cartcid");
            let cartSUs = document.querySelector(".cartSus");
            let sex = document.querySelector(".sex");

            nome.innerHTML = data.nome_completo;
            nomeSoc.innerHTML = data.nome_social;
            rg.innerHTML = data.rg;
            cpf.innerHTML = data.cpf;
            datanasc.innerHTML = dataNascimento;
            cartCid.innerHTML = data.cartao_cidadao;
            cartSUs.innerHTML = data.cartao_sus;
            sex.innerHTML = data.sexo;
        });
}

function getComorbidadeAssistido() {
    var ulDroga = document.querySelector(".psclist");
    var ulDoenca = document.querySelector(".doclist");
    var local = localStorage.getItem("assistido");

    fetch(`http://localhost:3000/assistido/saudeID/${local}`)
        // fetch(`http://10.87.207.27:3000/assistido/saudeID/${local}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            data.forEach((item, index) => {
                console.log(item, index);

                if (item.tipo === 0) {
                    var liDroga = document.createElement("li");
                    liDroga.innerHTML = item.comorbidade;
                    ulDroga.appendChild(liDroga);
                } else {
                    var liDoenca = document.createElement("li");
                    liDoenca.innerHTML = item.comorbidade;
                    ulDoenca.appendChild(liDoenca);
                }

                console.log(liDroga, liDoenca);
            });
        });
}
document.querySelector(".btn").addEventListener("click", () => {
    window.location.href = "../../Familiar/index.html";
});

var func = localStorage.getItem("userdata");
var fotinho;
var newImg = document.querySelector("#assistidoDepois");
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

    console.log(data);
    // fetch(`http://10.87.207.27:3000/assistido_foto_depois`, {
    fetch(`http://localhost:3000/assistido_foto_depois`, {
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
            if (data.err !== undefined) {
                alert("Error: " + data.err)
            } else {
                window.location.reload
            }
        });
}