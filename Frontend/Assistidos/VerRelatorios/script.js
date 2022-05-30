var content = document.querySelector(".content");

function getAll() {
    listarRelatorios()
    getRelModal()
    getfunc()
}

function openModal() {
    let modal = document.querySelector(".modal");
    let close = document.querySelector(".closeRel");

    modal.style.display = "flex"

    close.addEventListener("click", () => {
        modal.style.display = "none"
    })


}

function listarRelatorios() {
    let names = []
    fetch(`${url}/relatorio`)

    .then(response => { return response.json() })

    .then(data => {
        console.log(data)

        data.forEach(Assist => {
            var divimg = document.createElement("div");


            var divRela = document.createElement("div");


            var divData = document.createElement("div");


            var cardRelatorio = document.createElement("div");


            var cont = document.querySelector(".content");


            var img = document.createElement("img");
            var idRelatorio = document.createElement("h3");
            var dataRelat = document.createElement("h1");

            names.push(Assist.id_assistido)

            cardRelatorio.className = "cardRelatorio"
            divRela.className = "dataRelatorio"

            cardRelatorio.addEventListener("click", () => {
                openModal(),
                    console.log(cardRelatorio)
            })

            img.className = "fotoAssistido"
            divimg.className = "img"
            divData.className = "dataRelat"
            idRelatorio.innerHTML = `Relatório ${Assist.id_relatorio}`


            // if (fun.foto == null || assistido.foto.length == 0) {
            //     img.src = "../../Assets/icones/user.png"
            // } else {
            //     img.src = assistido.foto
            // }

            dataRelat.innerHTML = `${dataCoverter(Assist.data_relatorio)}`

            divimg.appendChild(img)
            divRela.appendChild(idRelatorio)
            divData.appendChild(dataRelat)
            cardRelatorio.appendChild(divimg)
            cardRelatorio.appendChild(divRela)
            cardRelatorio.appendChild(divData)
            cont.appendChild(cardRelatorio)
        })

    })
}


function buscarData() {
    let input = document.querySelector('#inp').value;
    let card = document.querySelectorAll('.dataRelat h1')

    card.forEach(item => {
        item.innerHTML.includes(dataCoverter(input)) ? console.log("sim") : console.log("Nao")
    })

}

function getRelModal() {
    let local = localStorage.getItem("assistido");
    fetch(`${url}/assistidos/${local}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Falha ao Listar Assistido")
            }
        })
        .then((data) => {
            if ((data.foto_depois === null) || (data.foto_depois === "undefined") || (data.foto_depois == "null") || (data.foto_depois == "null")) {
                document.querySelector(".fotoAssistido").src = "../../Assets/icones/user.png"
            } else {
                document.querySelector(".fotoAssistido").src = data.foto_depois
            }

            console.log(data)

        });

}