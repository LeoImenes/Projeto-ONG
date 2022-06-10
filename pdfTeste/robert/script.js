// const func = document.querySelector("#func");
// const btnSalvar = document.querySelector(".btnsavar");
// var id_assistido;

// const lista = document.querySelector("#lista");

// func.innerHTML = JSON.parse(window.localStorage.getItem("userdata")).nome_completo;

// const assistido = document.querySelector("#assistido");

// assistido.addEventListener("keyup", (e) => {
//     let val = e.target.value;

//     if (val.length >= 3) {
//         lista.style.display = "block";
//         fetch(`${url}/funcionario/getassistidos?busca=${val}`)
//             .then(response => {
//                 if (response.ok) { } else {
//                     alert("Falha...")
//                 }
//                 return response.json()
//             })
//             .then(data => {
//                 lista.innerHTML = "";
//                 data.forEach((item) => {
//                     let par = document.createElement("div");
//                     par.style.cursor = "pointer";
//                     par.addEventListener("click", () => {
//                         assistido.value = item.nome_completo;
//                         id_assistido = item.id_assistido;
//                         lista.style.display = "none";
//                     })
//                     par.innerHTML = item.nome_completo;
//                     lista.appendChild(par);
//                 })
//             })
//     } else {
//         lista.style.display = "none";
//     }
// })

// function clickImprimir() {
//     let funcionario = JSON.parse(localStorage.getItem("userdata")).id_funcionario;
//     let assistidoSelec = assistido.value
//     let textarea = document.querySelector(".encami").value;

//     var data = JSON.stringify({
//         "id_funcionario": funcionario,
//         "id_assistido": id_assistido,
//         "encaminhamento": "textarea",
//     })

//     fetch(`${url}/funcionario/encaminhamento`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",

//         },
//         body: data,
//     })
//         .then(response => {
//             if (response.ok) {
//                 alert("Encaminhamento gerado com sucesso")
//                 return response.json()
//             } else {
//                 alert("Falha ao gerar encaminhamento")
//             }
//         }).then(data => {
//             console.log(data)
//         });
// }

// GERAR pdf
var btn = document.querySelector("input")

btn.addEventListener("click", ()=>{
    CriaPDF()
})
function CriaPDF() {
    
    var minhaTabela = document.getElementById('pdf').innerHTML;
    // var style = "<style>";
    // style = style + "table {width: 100%;font: 20px Calibri;}";
    // style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    // style = style + "padding: 2px 3px;text-align: center;}";
    // style = style + "</style>";
    // CRIA UM OBJETO WINDOW
    var win = window.open('', '', 'height=700,width=700');
    win.document.write('<html><head>');
    // win.document.write('<title>Empregados</title>');   // <title> CABEÇALHO DO PDF.
    // win.document.write(style);                      // INCLUI UM ESTILO NA TAB HEAD
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write(minhaTabela);                   // O CONTEUDO DA TABELA DENTRO DA TAG BODY
    win.document.write('</body></html>');
    win.document.close(); 	                           // FECHA A JANELA
    win.print();                                       // IMPRIME O CONTEUDO
}

