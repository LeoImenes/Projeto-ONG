function menuDown() {
    let menuFam = document.querySelector(".dadosFamilia")
    let littlearrow = document.querySelector(".faArrow")
    menuFam.classList.toggle(".faDown")


    if (menuFam.classList.contains(".faDown")) {
        menuFam.style.display = "flex";
        littlearrow.style.transform = "rotate(180deg)"


    } else {
        menuFam.style.display = "none"
        littlearrow.style.transform = "rotate(0deg)"
    }
}

function menuDownAco() {
    let menuAco = document.querySelector(".acolist")
    let littlearrow = document.querySelector(".acoArrow")
    menuAco.classList.toggle(".acoDown")


    if (menuAco.classList.contains(".acoDown")) {
        menuAco.style.display = "flex";
        littlearrow.style.transform = "rotate(180deg)"


    } else {
        menuAco.style.display = "none"
        littlearrow.style.transform = "rotate(0deg)"
    }
}

function menuDownPsco() {
    let menuAco = document.querySelector(".psclist")
    let littlearrow = document.querySelector(".pscArrow")
    menuAco.classList.toggle(".psDown")


    if (menuAco.classList.contains(".psDown")) {
        menuAco.style.display = "flex";
        littlearrow.style.transform = "rotate(180deg)"


    } else {
        menuAco.style.display = "none"
        littlearrow.style.transform = "rotate(0deg)"
    }
}

function menuDownDoenca() {
    let menuAco = document.querySelector(".doclist")
    let littlearrow = document.querySelector(".doArrow")
    menuAco.classList.toggle(".doDown")


    if (menuAco.classList.contains(".doDown")) {
        menuAco.style.display = "flex";
        littlearrow.style.transform = "rotate(180deg)"


    } else {
        menuAco.style.display = "none"
        littlearrow.style.transform = "rotate(0deg)"
    }
}

function list() {
    var body = document.querySelector(body)
    fetch("http://10.87.207.27:3000/funcionarios")
        .then(response => { return response.json() })
        .then(data => {
            data.forEach(fun => {
                var divimg = document.createElement("div")
                var divnome = document.createElement("div")
                var cont = document.querySelector(".content")
                var img = document.createElement("img");
                var cardfuncionario = document.createElement("div");
                var nome = document.createElement("h1");
                var matricula = document.createElement("h3");

                cardfuncionario.className = "cardFuncionario"
                img.className = "fotoUsuario"
                divimg.className = "img"

                if (fun.foto == null) {
                    img.src = "../../Assets/icones/user.png"
                } else {
                    img.src = fun.btoa(fun.foto)
                }

                nome.innerHTML = `${fun.nome_completo}`
                matricula.innerHTML = `${fun.matricula}`

                divimg.appendChild(img)
                divnome.appendChild(nome)
                divnome.appendChild(matricula)
                cardfuncionario.appendChild(divimg)
                cardfuncionario.appendChild(divnome)
                cont.appendChild(cardfuncionario)


            })
        })
}