var content = document.querySelector(".content");

function getAll() {
    listarRelatorios()
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
                    localStorage.setItem("rela",JSON.stringify(Assist.id_relatorio))
                    if(Assist.id_relatorio !== 0){
                        modalInfo()
                    }else{
                        alert("Não foi possivel realizar operação")
                    }            })

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

function modalInfo(){
    let local = localStorage.getItem("rela");
    fetch(`${url}/relatorio/assistido/get/${local}`)
    .then(res => {return res.json()})
    .then(data => {
        data.forEach(item => {
            let relnum = document.querySelector(".Relnum")
            let textarea = document.querySelector("#textarea")

            textarea.value = item.relatorio
            console.log(item)
        })
    })
}

