var ulEditarDados = document.querySelector(".EditarDados");
ulEditarDados.style.display = "none"


var cpf;
var func = localStorage.getItem("userdata")
var matriculaLogado = JSON.parse(func).matricula
var getMatricula;
var getCargo;

let voltar = document.querySelector(".btn-voltar").addEventListener("click", () => {
    window.location.reload()

})

function list() {
    let local;
    if (JSON.parse(cargo).cargo.toLowerCase() === 'diretor') {
        local = localStorage.getItem("funcionario");
   
    } else {
        local = JSON.parse(cargo).id_funcionario
        let demissao = document.querySelector(".Demissao");
        demissao.style.display = "none"

    }


    fetch(`${url}/funcionarios/${local}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            data.forEach((item, index) => {
                getMatricula = item.matricula
                getCargo = item.cargo
                var botaoEditar = document.querySelector(".btn")
                var Fotofuncionario = document.querySelector("#Funcfoto");
                var liNome = document.querySelector(".getNome");
                var liEstadoCivil = document.querySelector(".getDataNasc");
                var liMatricula = document.querySelector(".getMatricula");
                var liRg = document.querySelector(".getRG");
                var liCpf = document.querySelector(".getCPF");
                var liNasc = document.querySelector(".getDataNasc");
                var liCargo = document.querySelector(".getCargo");
                var liSex = document.querySelector(".getSexo");
                var liDataAdmissao = document.querySelector(".getDataAdmissao");
                var liDatademissao = document.querySelector(".getDemissao");
                var liEmail = document.querySelector(".getEmail");

                if ((item.foto === null) || (item.foto === "undefined") || (item.foto == "null") || (item.foto == "")) {
                    Fotofuncionario.src = "../../Assets/icones/user.png"
                } else {
                    Fotofuncionario.src = item.foto
                }

                if (item.data_demissao === null) {
                    liDatademissao.innerHTML = "NDA";
                } else {
                    liDatademissao.innerHTML = `${dataCoverter(item.data_demissao)}`;
                    botaoEditar.disabled = true;
                }

                liNome.innerHTML = item.nome_completo;
                liEstadoCivil.innerHTML = item.estado_civil;
                liMatricula.innerHTML = item.matricula;
                liRg.innerHTML = item.rg;
                liCpf.innerHTML = item.cpf;
                cpf = item.cpf;
                liNasc.innerHTML = `${dataCoverter(item.data_nascimento)}`;
                liCargo.innerHTML = item.cargo;
                liSex.innerHTML = item.sexo;
                liEmail.innerHTML = item.email;
                liDataAdmissao.innerHTML = `${dataCoverter(item.data_admissao)}`;
            });
        });
}

var func = localStorage.getItem("userdata");
var fotinho;
var newImg = document.querySelector("#Funcfoto");
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
    let data = JSON.stringify({
        cpf: cpf,
        foto: fotinho,
    });

    fetch(`${url}/funcionario`, {
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
                alert("Falha ao Atualizar Foto")
            }
        })
        .then((data) => {

            alert("Foto Atualizada");
            window.location.reload()

        });
}

function editarDados() {
    var ulEditarDados = document.querySelector(".EditarDados");
    var ulDadosFunc = document.querySelector(".DadosFuncionario");
    var btnDadosFunc = document.querySelector(".btn");
    var btnAtualizarDados = document.querySelector(".btn-Updt");
    var Demissao = document.querySelector(".Demissao");
    var cargo = document.querySelector("#cargo");
    var matricula = document.querySelector("#Matricula")
    cargo.value = getCargo
    matricula.value = getMatricula

    ulDadosFunc.style.display = "none";

    if (ulDadosFunc.style.display === "none") {
        ulEditarDados.style.display = "flex";
        btnDadosFunc.style.display = "none";
        btnAtualizarDados.style.display = "block";
        Demissao.style.display = "none"
    }
}

function Atualizar() {
    var dataDemissao = document.querySelector("#Data").value;
    var cargo = document.querySelector("#cargo").value;
    var ulEditarDados = document.querySelector(".EditarDados");
    var ulDadosFunc = document.querySelector(".DadosFuncionario");
    var btnDadosFunc = document.querySelector(".btn");
    var btnAtualizarDados = document.querySelector(".btn-Updt");
    var matricula = document.querySelector("#Matricula").value

    cargo.placeholder = getCargo
    matricula.placeholder = getMatricula





    if (dataDemissao === "" || cargo === "" || matricula === "") {
        alert("todos os campos devem ser preenchidos")
    } else {
        const data = JSON.stringify({
            matricula: matriculaLogado,
            matricula_funcionario: matricula,
            cargo: cargo,
            data_demissao: `${dataUS(dataDemissao)}`,
        });

        fetch(`${url}/funcionarios`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data,
            })
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {

                alert("Atualizado com sucesso");
                ulDadosFunc.style.display = "flex";
                btnDadosFunc.style.display = "block";
                ulEditarDados.style.display = "none";
                btnAtualizarDados.style.display = "none";

                window.location.reload()




            });
    }



}