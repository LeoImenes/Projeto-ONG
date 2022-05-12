function getfunc() {
    let user = document.querySelector(".Username");
    let foto = document.querySelector(".userimg");
    user.innerHTML = funcionario.nome_completo
    foto.src = funcionario.foto

    fetch(`https://app-ongdigital-backend.herokuapp.com/funcionarios/${funcionario.matricula}`)
        .then(resp => { return resp.json() })
        .then(data => {
            user.innerHTML = data[0].nome_completo
            foto.src = data[0].foto


<<<<<<< HEAD
        }
    )
=======
        })
>>>>>>> 2e09b08f8494b527840579fbab2c400348d00275
}

function dataCoverter(data) {
    var dia = data.split("T")[0].split("-")[2];
    var mes = data.split("T")[0].split("-")[1];
    var ano = data.split("T")[0].split("-")[0];

<<<<<<< HEAD
=======

>>>>>>> 2e09b08f8494b527840579fbab2c400348d00275
    return `${dia}/${mes}/${ano}`
}

function dataUS(data) {
    var dia = data.split("/")[0]
    var mes = data.split("/")[1]
    var ano = data.split("/")[2]

<<<<<<< HEAD
=======

>>>>>>> 2e09b08f8494b527840579fbab2c400348d00275
    return `${ano}-${mes}-${dia}`
}

function mascaraCPF(i) {
<<<<<<< HEAD
=======

>>>>>>> 2e09b08f8494b527840579fbab2c400348d00275
    var v = i.value;

    if (isNaN(v[v.length - 1])) {
        i.value = v.substring(0, v.length - 1);
        return;
    }

    i.setAttribute("maxlength", "14");
    if (v.length == 3 || v.length == 7) i.value += ".";
    if (v.length == 11) i.value += "-";
<<<<<<< HEAD
=======

>>>>>>> 2e09b08f8494b527840579fbab2c400348d00275
}


function mascaraData(i) {
<<<<<<< HEAD
    var v = i.value;
=======

    var v = i.value;

>>>>>>> 2e09b08f8494b527840579fbab2c400348d00275
    if (isNaN(v[v.length - 1])) {
        i.value = v.substring(0, v.length - 1);
        return;
    }

    i.setAttribute("maxlength", "10");
    if (v.length == 2 || v.length == 5) i.value += "/";
<<<<<<< HEAD
}

function mascaraRG(i) {
    var v = i.value;
=======


}

function mascaraRG(i) {

    var v = i.value;

>>>>>>> 2e09b08f8494b527840579fbab2c400348d00275
    if (isNaN(v[v.length - 1])) {
        i.value = v.substring(0, v.length - 1);
        return;
    }

<<<<<<< HEAD
    i.setAttribute("maxlength", "13");
    if (v.length == 2 || v.length == 6) i.value += ".";
    if (v.length == 10) i.value += "-";
}

function mascaraTEL(i) {
    var v = i.value;
    if (isNaN(v[v.length - 1])) {
        i.value = v.substring(0, v.length - 1);
        return;
    }

    i.setAttribute("maxlength", "16");
    
    if (v.length == 1) i.value = "(";
    if (v.length == 3) i.value += ")";
    if (v.length == 5) i.value += ".";
    if (v.length == 10) i.value += "-";
=======
    i.setAttribute("maxlength", "12");
    if (v.length == 2 || v.length == 6) i.value += ".";
    if (v.length == 10) i.value += "-";


>>>>>>> 2e09b08f8494b527840579fbab2c400348d00275
}