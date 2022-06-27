var ulEditarDados = document.querySelector(".EditarDados");
ulEditarDados.style.display = "none"

var getFoto;
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
        var getDataNasc = document.querySelector(".getDataNasc").disabled = false
        var getCargo = document.querySelector(".getCargo").disabled = false
        var getDataAdmissao = document.querySelector(".getDataAdmissao").disabled = false
        var getDemissao = document.querySelector(".getDemissao ").disabled = false
        var getMatricula = document.querySelector(".getMatricula").disabled = false
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
                var liDataNasc = document.querySelector(".getDataNasc");
                var liMatricula = document.querySelector(".getMatricula");
                var liRg = document.querySelector(".getRG");
                var liCpf = document.querySelector(".getCPF");
                var liNasc = document.querySelector(".getDataNasc");
                var liCargo = document.querySelector(".getCargo");
                var liEstadoCivil = document.querySelector(".getEstadoCivil");
                var liSex = document.querySelector(".getSexo");
                var liDataAdmissao = document.querySelector(".getDataAdmissao");
                var liDatademissao = document.querySelector(".getDemissao");
                var liEmail = document.querySelector(".getEmail");

                

                if ((item.foto === null) || (item.foto === "undefined") || (item.foto == "null") || (item.foto == "")) {
                    Fotofuncionario.src = "../../Assets/icones/user.png"
                    fotinho = null
                } else {
                    Fotofuncionario.src = item.foto
                    fotinho = item.foto
                }

                

                if (item.data_demissao === null) {
                    liDatademissao.innerHTML = "NDA";
                } else {
                    liDatademissao.innerHTML = `${dataCoverter(item.data_demissao)}`;
                    botaoEditar.disabled = true;
                }

                liNome.value = item.nome_completo;
                liDataNasc.value = item.estado_civil;
                liMatricula.value = item.matricula;
                liEstadoCivil.value = item.estado_civil;
                liRg.value = item.rg;
                liCpf.value = item.cpf;
                cpf = item.cpf;
                liNasc.value = `${dataCoverter(item.data_nascimento)}`;
                liCargo.value = item.cargo;
                liSex.value = item.sexo;
                liEmail.value = item.email;
                liDataAdmissao.value = `${dataCoverter(item.data_admissao)}`;
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

            alert("Atualização realizada com sucesso");
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

function editarFunc() {
    var Fotofuncionario = document.querySelector("#Funcfoto");
    var liNome = document.querySelector(".getNome");
    var liDataNasc = document.querySelector(".getDataNasc");
    var liMatricula = document.querySelector(".getMatricula");
    var liRg = document.querySelector(".getRG");
    var liCpf = document.querySelector(".getCPF");
    var liNasc = document.querySelector(".getDataNasc");
    var liCargo = document.querySelector(".getCargo");
    var liEstadoCivil = document.querySelector(".getEstadoCivil");
    var liSex = document.querySelector(".getSexo");
    var liDataAdmissao = document.querySelector(".getDataAdmissao");
    var liDatademissao = document.querySelector(".getDemissao");
    var liEmail = document.querySelector(".getEmail");
    

    var data = JSON.stringify({
        "matricula": liMatricula.value,
		"nome_completo": liNome.value,
		"rg": liRg.value,
		"cpf": liCpf.value,
		"estado_civil": liEstadoCivil.value,
		"sexo": liSex.value,
        "data_nascimento":dataUS(liDataNasc.value),
        "foto":fotinho
    })

    fetch(`${url}/funcionario/dados`,{
        "method": "PUT",
        headers:{
            "Content-Type": "application/json"
        },
        body:data
    }).then(response => {return response.json()})
    .then(data => {
        console.log(data)
    })
    


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