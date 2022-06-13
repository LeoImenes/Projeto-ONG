var alimentos = [];
var itens = [];
var assistidos = [];
var func = localStorage.getItem('userdata');


function openModal() {
    let modal = document.querySelector(".modal");
    

    modal.style.display = "flex"

    let close = document.querySelector(".btnClose")

    close.addEventListener('click',()=>{
        window.location.reload()
    })
    
}



function getAll() {
    list()
    getCheckassistencia()
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
                cardAssistido.className = "selected"
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

                cardAssistido.addEventListener("click", () => {
                    cardAssistido.classList.toggle("selected")
                    if (cardAssistido.className.includes("selected")) {
                        assistidos.push({"id_assistido": fun.id_assistido})

                    } else {
                        assistidos.pop(fun.id_assistido)

                    }

                })


            })


        })
}



function getCheckassistencia() {
    let cardAlimentos = document.querySelector(".AssistenciaAlimentos")
    
    fetch(`${url}/itens`)
        .then(response => { 
            return response.json() 
        })
        .then(data => {
            data.forEach((item, index) => {
                cardAlimentos.addEventListener("click", () => {
                    openModal();
                })
                if (item.tipo === 1) {
                    let cardAlimentos = document.querySelector(".AssistenciaAlimentos").addEventListener ("click", () => {
                        let inputOutros = document.querySelector(".inputs");
                        let div = document.createElement("div");
                        let input = document.createElement("input");
    
                        input.value = item.id_item
    
                        let p = document.createElement("p");
                        div.className = "divAlimentos"
                        input.className = "checkAlimentos"
                        input.type = "checkbox"
                        p.className = "tipoAlimentos"
                        p.innerHTML = item.item
    
                        div.appendChild(input)
                        div.appendChild(p)
                        inputOutros.appendChild(div)
    
                        input.addEventListener("change", () => {
                            if (input.checked === true) {
                                itens.push({"id_item": parseInt(input.value)})
    
                            } else {
                                itens.pop(item.id_tem)
    
                            }
                        })
                    })

                } else {
                    let cardOutros = document.querySelector(".AssistenciaOutros").addEventListener("click", () => {
                        let inputOutros = document.querySelector(".inputs");
                    let div = document.createElement("div");
                    let input = document.createElement("input");

                    input.value = item.id_item

                    let p = document.createElement("p");
                    div.className = "divOutros"
                    input.className = "checkOutros"
                    input.type = "checkbox"
                    p.className = "tipoOutros"
                    p.innerHTML = item.item

                    div.appendChild(input)
                    div.appendChild(p)
                    inputOutros.appendChild(div)

                    input.addEventListener("change", () => {
                        if (input.checked === true) {
                            itens.push({"id_item": parseInt(input.value)})

                        } else {
                            itens.pop(item.id_tem)

                        }
                    })
                    })
                    

                }

            })

        })
}


function registrarAssistencia() {
    data = JSON.stringify({
        "id_funcionario": JSON.parse(func).id_funcionario,
        "assistidos": assistidos,
        "itens": itens

    })

    fetch(`${url}/funcionario/assistencias`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: data
    }).then(response => {
        if(response.status === 200) {
            alert("Assistencia Cadastrada com sucesso")
            return response.json()
        }else {
            alert("Falha ao Cadastrar Assistencia")
        }
        }
       
        )
    .then(data => console.log(data))

}


function buscar() {
    let input = document.getElementById("inp").value.toLowerCase();
    let filtro = document.querySelectorAll(".buscarFiltro");
    let card = document.querySelectorAll(".cardAssistido")

    filtro.forEach((item, index) => {
        (item.innerHTML.toLowerCase().includes(input)) ? card[index].style.display = "grid": card[index].style.display = "none";
    })
}