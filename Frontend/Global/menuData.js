function getfunc() {
    var LocalStgFuncionario = localStorage.getItem('userdata')
    let funcionario = JSON.parse(LocalStgFuncionario)

    let user = document.querySelector(".Username");
    let foto = document.querySelector(".userimg");
    user.innerHTML = funcionario.nome_completo
    foto.src = funcionario.foto

    fetch(`${url}/funcionarios/${funcionario.matricula}`)
        .then(resp => { return resp.json() })
        .then(data => {
            user.innerHTML = data[0].nome_completo
            foto.src = data[0].foto


        }
    )
}

function dataCoverter(data) {
    var dia = data.split("T")[0].split("-")[2];
    var mes = data.split("T")[0].split("-")[1];
    var ano = data.split("T")[0].split("-")[0];

    return `${dia}/${mes}/${ano}`
}

function dataUS(data) {
    var dia = data.split("/")[0]
    var mes = data.split("/")[1]
    var ano = data.split("/")[2]

    return `${ano}-${mes}-${dia}`
}

function mascaraCPF(i) {
    var v = i.value;

    if (isNaN(v[v.length - 1])) {
        i.value = v.substring(0, v.length - 1);
        return;
    }

    i.setAttribute("maxlength", "14");
    if (v.length == 3 || v.length == 7) i.value += ".";
    if (v.length == 11) i.value += "-";
}


function mascaraData(i) {
    var v = i.value;
    if (isNaN(v[v.length - 1])) {
        i.value = v.substring(0, v.length - 1);
        return;
    }

    i.setAttribute("maxlength", "10");
    if (v.length == 2 || v.length == 5) i.value += "/";
}

function mascaraRG(i) {
    var v = i.value;
    if (isNaN(v[v.length - 1])) {
        i.value = v.substring(0, v.length - 1);
        return;
    }

    i.setAttribute("maxlength", "13");
    if (v.length == 2 || v.length == 6) i.value += ".";
    if (v.length == 10) i.value += "-";
}

function mascaraTEL(i) {
    var v = i.value;
    if (isNaN(v[v.length -1])) {
        i.value = v.substring(0, v.length - 1);
        return;
    }

    i.setAttribute("maxlength", "15");
    
    if (v.length == 1) i.value = "(";
    if (v.length == 3) i.value += ")";
    if (v.length == 5) i.value += ".";
    if (v.length == 10) i.value += "-";
}

function mascaraMoeda(i) {
    var v = i.value;
    if (isNaN(v[v.length - 1])) {
        i.value = v.substring(0, v.length - 1);
        return;
    }

    i.setAttribute("maxlength", "12");

    if(v.length == 3) i.value += ".";
}