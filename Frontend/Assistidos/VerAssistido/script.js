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
    var local = localStorage.getItem("assistido")

    var body = document.querySelector(body)
    fetch(`http://10.87.207.27:3000/assistidos/${local}`)
        .then(response => { return response.json() })
        .then(data => {
            var antes = document.querySelector("#assistidoAntes")
            antes.src = data.foto_antes
            antes.style.borderRadius = "50%"

            var dataNascimento;
            var newData = data.data_nascimento.split("T")
            newData.forEach((item,index) => {
                if(index === 0) {
                    var ano = item.split("-")[0]
                    var mes =item.split("-")[1]
                    var dia =item.split("-")[2]
                    dataNascimento = `${dia}/${mes}/${ano}`
                }
            })
            
            let nome = document.querySelector(".nomeCom");
            let nomeSoc = document.querySelector(".nomeSoc");
            let rg = document.querySelector(".rg-con");
            let cpf = document.querySelector(".cpf-con");
            let datanasc = document.querySelector(".data");
            let cartCid = document.querySelector(".cartcid");
            let cartSUs = document.querySelector(".cartSus");
            let sex = document.querySelector(".sex");
            
            
            
            nome.innerHTML = data.nome_completo
            nomeSoc.innerHTML=data.nome_social
            rg.innerHTML=data.rg
            cpf.innerHTML=data.cpf
            datanasc.innerHTML=dataNascimento
            cartCid.innerHTML=data.cartao_cidadao
            cartSUs.innerHTML=data.cartao_sus
            sex.innerHTML=data.sexo

        })
}