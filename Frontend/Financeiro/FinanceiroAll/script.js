const url = `http://localhost:3000/funcionario/financas`

var body = document.querySelector('body').addEventListener('onload', getfinanceiro())

function getfinanceiro() {
var totalDespesas = 0;
var totalReceitas = [];

    fetch(url)
        .then(response => { return response.json() })
        .then(data => {
            data.forEach((item, index) => {
                if (item.tipo === 0) {
                    // console.log(item.val, index)
                    totalDespesas += item.valor
                    console.log("total de despesas: ", totalDespesas, item.tipo, item.id_lancamento)
                    
                    var despesaCard = document.querySelector(".despesaContent")
                    var div = document.createElement("div")
                    div.className = `despesas`
                    var h2 = document.createElement("h2")
                    var p = document.createElement("p")

                    h2.innerHTML = item.descricao
                    p.innerHTML = `R$ ${item.valor}`
                    p.style.color = "red"

                    div.appendChild(h2)
                    div.appendChild(p)
                    despesaCard.appendChild(div)

                  
                 

                    


                } else if(item.tipo === 1){
                    console.log("Lancamentos")
                    var card = document.querySelector(".ReceitaContent")
                }
                

            })


        })

}