const url = `http://localhost:3000/funcionario/financas`

var body = document.querySelector('body').addEventListener('onload', getfinanceiro())


function getfinanceiro() {
    var totalDespesas = 0;
    var totalReceitas = 0;

    fetch(url)
        .then(response => { return response.json() })
        .then(data => {

            data.forEach((item, index) => {

                dataLancamento = item.data_lancamento
                if (item.tipo === 0) {

                    totalDespesas += item.valor

                    var despesaCard = document.querySelector(".despesaContent")
                    var div = document.createElement("div")
                    div.className = `despesas`
                    var h2 = document.createElement("h2")
                    var p = document.createElement("p")
                    var pData = document.createElement("p")

                    h2.innerHTML = item.descricao
                    p.innerHTML = `R$ ${item.valor}`
                    p.style.color = "red"
                    pData.innerHTML = `${dataCoverter(item.data_lancamento)}`

                    div.appendChild(h2)
                    div.appendChild(p)
                    div.appendChild(pData)
                    despesaCard.appendChild(div)

                } else if (item.tipo === 1) {
                    console.log("Lancamentos")
                    totalDespesas += item.valor
                    console.log("total de despesas: ", totalDespesas, item.tipo, item.id_lancamento)

                    var despesaCard = document.querySelector(".receitasContent")
                    var div = document.createElement("div")
                    div.className = `receitas`
                    var h2 = document.createElement("h2")
                    var p = document.createElement("p")
                    var pData = document.createElement("p")

                    h2.innerHTML = item.descricao
                    p.innerHTML = `R$ ${item.valor}`
                    p.style.color = "green"
                    pData.innerHTML = `${dataCoverter(item.data_lancamento)}`

                    div.appendChild(h2)
                    div.appendChild(p)
                    div.appendChild(pData)
                    despesaCard.appendChild(div)
                }

            })

        })
}