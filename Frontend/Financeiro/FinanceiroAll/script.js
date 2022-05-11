const url = `http://localhost:3000/funcionario/financas`

var body = document.querySelector('body').addEventListener('onload', getfinanceiro())

function getfinanceiro() {
    fetch(url)
        .then(response => { return response.json() })
        .then(data => {
            data.forEach(item => {
                if (item.tipo === 0) {
                    console.log("Despesas")
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


                } else {
                    console.log("Lancamentos")
                    var card = document.querySelector(".ReceitaContent")
                }
            })


        })

}