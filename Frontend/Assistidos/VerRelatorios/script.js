function list(){
    var content = document.querySelector(".content");
    var body = document.querySelector(body)
    let relatorios = []

// LISTAR RELATÓRIO POR ASSISTIDO

function listarRelatorio() {
    fech(`${url}/relatorio/assistido/get`)    

    .then(response => { return reponse.json()})

    .then(data => {

        data.forEach (relats => {
            var dividrelatorio = document.creatElement("div");
            var divmatfuncionario = document.creatElement("div");
            var divdatarelatorio = document.creatElement("div");
            var conte = document.querySelector(".content");

            var idRelatorio = document.creatElement("h1");
            var dataRelatorio = document.createElement("h1");
            var matricFuncionario = document.createElement("h1");
            var relatorioAssistido = document.createElement("h1");

            relatorios.push(relats.idRelatorio);

            cardrelatorio.className = "CardRelatorio"
            cardrelatorio.addEventListener("click", () =>{

           })

           idrelatorio.className = "idRelatorio"
           datarelatorio.className = "dataRelatorio"
           matricfuncionario.className = "matricFuncionario"
           relatorioassistido.className = "relatorioAssistido"



           dividrelatorio.appendChild(idRelatorio)
           divdatarelatorio.appendChild(dataRelatorio)
           divmatricfuncionario.appendChild(matricFuncionario)
           divrelatorioassistido.appendChild(relatorioAssistido)
        })
    
    })
}



}


//LISTAR RELATÓRIOS DE TODOS OS ASSISTIDOS

// function listarRelatorios() {
//     let names = []
//     fetch(`${url}/relatorio`)

//         .then(response => { return response.json() })

//         .then(data => {
//             console.log(data)

//             data.forEach(Assist => {
//                 var divimg = document.createElement("div");
//                 var divnome = document.createElement("div");
//                 var cardRelatorio = document.createElement("div");
//                 var cont = document.querySelector(".content");
//                 var img = document.createElement("img");                
//                 var nomeAssistido = document.createElement("h1");
//                 var idRelatorio = document.createElement("h3");

//                 names.push(Assist.id_assistido)

//                 cardRelatorio.className = "cardRelatorio"
//                 cardRelatorio.addEventListener("click", () => {
                    
//                     let store = localStorage.setItem("relatorio", Assist.relatorio);
//                     window.location.href = "../FazerRelatorio/index.html"
//                 })

//                 img.className = "fotoAssistido"
//                 divimg.className = "img"
//                 divnome.className = "nomeAssistido"

//                 // if (fun.foto == null || assistido.foto.length == 0) {
//                 //     img.src = "../../Assets/icones/user.png"
//                 // } else {
//                 //     img.src = assistido.foto
//                 // }
                
//                 nomeAssistido.innerHTML = `${Assist.id_relatorio}`
            

//                 divimg.appendChild(img)
//                 divnome.appendChild(nomeAssistido)
//                 cardRelatorio.appendChild(divimg)
//                 cardRelatorio.appendChild(divnome)
//                 cont.appendChild(cardRelatorio)
//             })

//         })
// }

// function buscar() {
//     let input = document.getElementById("inp").value.toLowerCase();
//     let filtro = document.querySelectorAll("h1");
//     let card = document.querySelectorAll(".cardRelatorio")

//     filtro.forEach((item, index) => {
//         (item.innerHTML.toLowerCase().includes(input)) ? card[index].style.display = "flex" : card[index].style.display = "none";
//     })
// }