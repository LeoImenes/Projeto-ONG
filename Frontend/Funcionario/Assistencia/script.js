function openModal() {
    let modal = document.querySelector(".modal");
    let close = document.querySelector(".closeRel");

    modal.style.display = "flex"

    // close.addEventListener("click", () => {
    //     modal.style.display = "none"
    // })

}

function list() {
    let names = []
    var body = document.querySelector(body)

    fetch(`${url}/Assistidos`)
        .then(response => {
            if (response.ok) {} else {
                alert("Falha ao carregar dados")
            }
            return response.json()
        })
        .then(data => {
    
            data.forEach(fun => {

                var divimg = document.createElement("div")
                var divnome = document.createElement("div")
                var cont = document.querySelector(".content")
                var img = document.createElement("img");
                var cardAssistido = document.createElement("div");
                var nomeFun = document.createElement("h1");


                names.push(fun.nome_completo)

                nomeFun.className = "buscarFiltro"
                cardAssistido.className = "cardAssistido"
                cardAssistido.style.cursor = "pointer"

                img.className = "fotoUsuario"
                divimg.className = "img"
                divnome.className = "nome"

                if ((fun.foto_antes === null) || (fun.foto_antes === "undefined") || (fun.foto_antes === "null") || (fun.foto_antes === "")) {
                    img.src = "../../Assets/icones/user.png"
                } else {
                    img.src = fun.foto_antes
                }

                nomeFun.innerHTML = `${fun.nome_completo}`

                divimg.appendChild(img)
                divnome.appendChild(nomeFun)
                cardAssistido.appendChild(divimg)
                cardAssistido.appendChild(divnome)
                cont.appendChild(cardAssistido)

                cardAssistido.addEventListener("click", (e) => {
                })


            })


        })
}

function buscar() {
    let input = document.getElementById("inp").value.toLowerCase();
    let filtro = document.querySelectorAll(".buscarFiltro");
    let card = document.querySelectorAll(".cardAssistido")

    filtro.forEach((item, index) => {
        (item.innerHTML.toLowerCase().includes(input)) ? card[index].style.display = "grid": card[index].style.display = "none";
    })
}