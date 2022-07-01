var content = document.querySelector(".content");
var relatorio_id;

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
    var assis = localStorage.getItem("assistido");
    let names = []

    try {
        fetch(`${url}/relatorio/assistido/${assis}`)
            .then(response => {
                if (!response.ok) {
                    alert("Falha ao carregar dados");
                    window.location.reload();

                } else return response.json();
            })
            .then(data => {
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
                        let store = localStorage.setItem("rela", Assist.relatorio);
                        openModal(),
                            localStorage.setItem("rela", JSON.stringify(Assist.id_relatorio))
                        if (Assist.id_relatorio !== 0) {
                            modalInfo()
                        } else {
                            alert("Não foi possivel realizar operação")
                        }
                    })

                    img.className = "fotoAssistido"
                    divimg.className = "img"
                    divData.className = "dataRelat"
                    idRelatorio.innerHTML = `Relatório ${Assist.id_relatorio}`
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
    } catch (e) {
        console.log(e)
    }
}


function buscarData() {
    let input = document.querySelector('#inp').value;
    let cardRelatorio = document.querySelectorAll('.cardRelatorio');
    let card = document.querySelectorAll('.dataRelat h1')

    card.forEach((item, index) => {!item.innerHTML.includes(dataCoverter(input)) ? cardRelatorio[index].style.display = "none" : cardRelatorio[index].style.display = "flex" })

}

function modalInfo() {
    let local = localStorage.getItem("rela");

    try {
        fetch(`${url}/relatorio/assistido/get/${local}`)
            .then(res => { return res.json() })
            .then(data => {
                data.forEach(item => {
                    relatorio_id = item.Numero
                    let relnum = document.querySelector(".Relnum")
                    let textarea = document.querySelector("#textarea")
                    let reldata = document.querySelector(".Reldata")
                    let relfunc = document.querySelector(".RelFunc")
                    let relassis = document.querySelector(".RelAssis")
                    let relimg = document.querySelector(".RelImg")

                    if (item.foto === null || item.foto === undefined || item.foto === 'undefined') {
                        relimg.src = "../../Assets/icones/user.png"
                    } else {
                        relimg.src = item.foto
                    }
                    relassis.innerHTML = item.assistido
                    relnum.innerHTML = `Relatório: ${item.id_relatorio}`
                    relfunc.innerHTML = `Funcionario: ${item.funcionario}`
                    reldata.innerHTML = `Data:  ${dataCoverter(item.data_relatorio)}`
                    textarea.value = item.relatorio
                })
            })
    } catch (e) {
        console.log(e)
    }
}

function updataeRelatorio() {
    let local = localStorage.getItem("rela");
    var id_func = localStorage.getItem("userdata")
    let textarea = document.querySelector("#textarea")

    var data = JSON.stringify({
        "id_relatorio": local,
        "id_funcionario": JSON.parse(id_func).id_funcionario,
        "relatorio": textarea.value
    })

    try {
        fetch(`${url}/relatorio/put`, {
                method: "Put",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data,
            }).then(response => {
                if (response.status === 200) {
                    alert("Atualiazado com sucesso")
                    return response.json
                } else {
                    alert("Falha ao atualizar")
                }
            })
            .then(data => {
                window.location.reload()
            })
    } catch (e) {
        console.log(e)
    }

}