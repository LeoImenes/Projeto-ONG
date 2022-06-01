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
        newImg.style.width = "120px";
        newImg.style.height = "120px";
        newImg.style.borderRadius = "50%";
    };
    fr.readAsDataURL(e.target.files[0]);
});
adcFoto.style.cursor = "pointer";
adcFoto.addEventListener("click", () => {
    fileInp.click();
});

function cadastrarFunc() {
    var data;
    var status = 1;
    var getNome = document.querySelector(".getNome").value
    var getEmail = document.querySelector(".getEmail").value
    var getMatricula = document.querySelector(".getMatricula").value
    var getRG = document.querySelector(".getRG").value
    var getCPF = document.querySelector(".getCPF").value
    var getDataNasc = document.querySelector(".getDataNasc").value
    var getCargo = document.querySelector(".getCargo").value
    var getSexo = document.querySelector(".getSexo").value
    var getDataAdmissao = document.querySelector(".getDataAdmissao").value
    var getSenha = document.querySelector(".getSenha").value
    var inputs = document.querySelectorAll(".DadosFuncionario input")

    var nomeerr = document.createElement("p")
    nomeerr.innerHTML = "* Preencha este campo"
    nomeerr.style.display = "flex"
    nomeerr.style.marginTop = "5px"
    nomeerr.style.color = "red"
    nomeerr.style.width = "100%"
    nomeerr.style.fontSize = "10px"

    inputs.forEach((item, index) => {(item.value == "")?data = null: console.log(data)})
    if(data == null){
        alert("Todos os campos estão em branco")
    }else if(getNome == "" || getEmail == "" || getMatricula || getRG ||
    getCPF || getDataNasc || getCargo || getDataAdmissao)



     data = JSON.stringify({
        "foto": fotinho,
        "matricula": getMatricula,
        "nome_completo": getNome,
        "rg": getRG,
        "cpf": getCPF,
        "data_nascimento": `${dataUS(getDataNasc)}`,
        "cargo": getCargo,
        "sexo": getSexo,
        "data_admissao": `${dataUS(getDataAdmissao)}`,
        "email": getEmail,
        "senha": md5(getSenha),
        "status": status,
        "estado_civil": ""
    })



    // fetch(`${url}/funcionario`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: data,
    //     })
    //     .then(response => {
    //         if (response.ok) {
    //             alert("Cadastro efetuado com sucesso")
    //             return response.json()

    //         } else {
    //             alert("Falha ao cadastrar, todos os campos são obrigatórios")
    //         }

    //     })

    // .then(data => {
    //     window.location.href = '../ListarFuncionarios/'
    // })
}