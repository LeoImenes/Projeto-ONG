function list() {
    let input = document.querySelector('input');
    let filterText = input.value
    let names = []
    var body = document.querySelector(body)
        fetch("http://10.87.207.27:3000/Assistidos")
    // fetch("http://localhost:3000/Assistidos")
        .then(response => { return response.json() })
        .then(data => {
            data.forEach(fun => {
                var divimg = document.createElement("div")
                var divnome = document.createElement("div")
                var cont = document.querySelector(".content")
                var img = document.createElement("img");
                var cardAssistido = document.createElement("div");
                var nomeFun = document.createElement("h1");
                var matricula = document.createElement("h3");

                names.push(fun.nome_completo)


                cardAssistido.className = "cardAssistido"
                cardAssistido.style.cursor = "pointer"

                img.className = "fotoUsuario"
                divimg.className = "img"
                divnome.className = "nome"

                if (fun.foto_antes === null) {
                    img.src = "../../Assets/icones/user.png"
                } else {
                    img.src = fun.foto_antes
                }

                if (!fun.status == 0) {
                    matricula.innerHTML = `Ativo`
                    matricula.style.color = `green`
                } else {
                    matricula.innerHTML = `Inativo`
                    matricula.style.color = `red`
                }

                nomeFun.innerHTML = `${fun.nome_completo}`


                divimg.appendChild(img)
                divnome.appendChild(nomeFun)
                divnome.appendChild(matricula)
                cardAssistido.appendChild(divimg)
                cardAssistido.appendChild(divnome)
                cont.appendChild(cardAssistido)

                cardAssistido.addEventListener("click", (e) => {

                    let id = fun;
                    let store = localStorage.setItem("assistido", fun.id_assistido);
                    window.location.href = "../VerAssistido/index.html"
                })


            })


        })
}

function buscar() {
    let input = document.getElementById("inp").value.toLowerCase();
    let filtro = document.querySelectorAll("h1");
    let card = document.querySelectorAll(".cardAssistido")

    filtro.forEach((item, index) => {
        (item.innerHTML.toLowerCase().includes(input)) ? card[index].style.display = "flex": card[index].style.display = "none";
    })
}

function Ordem() {
    let filtro = document.querySelectorAll("h1");
    let card = document.querySelectorAll(".cardAssistido")
    let ativo = document.getElementById("ati")

    if (ativo.checked == 1) {

        ativo.value = "a"
        filtro.forEach((item, index) => {
            (item.innerHTML.toLowerCase().startsWith(ativo.value)) ? card[index].style.display = "flex": card[index].style.display = "flex";
        })
    } else {
        filtro.forEach((item, index) => {
            card[index].style.display = "flex";
        })
    }

}