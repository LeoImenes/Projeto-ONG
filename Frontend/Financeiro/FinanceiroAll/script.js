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
                    totalReceitas += item.valor
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
            var pTotalDesp = document.createElement("p")
            var cardTotalDesp = document.querySelector(".totaldespCont")
            var pDespText = document.createElement("p")

            var total = (-totalDespesas) + (totalReceitas)

            var pTotal = document.createElement("p")
            var cardTotal= document.querySelector(".totalCont")
            var pTotalText = document.createElement("p")

            var cardTotalRec = document.querySelector(".totalreceitaContent")
            var pTotalRec = document.createElement("p")
            var pRectext = document.createElement("p")

            pDespText.innerHTML = "Total das Despesas: "
            pRectext.innerHTML = "Total das Receitas: "
            pTotalText.innerHTML = "Diferença: "
            // pRectext.style.marginRight = "20px"
            // pDespText.style.marginRight = "20px"
            pTotalDesp.innerHTML = `R$${totalDespesas.toFixed(2)}`
            pTotalRec.innerHTML = `R$${totalReceitas.toFixed(2)}`

            if(total < 0){
                pTotal.style.color = "red"
            }else{
                pTotal.style.color = "green"
            }
            pTotal.innerHTML = `R$ ${total.toFixed(2)}`

            pTotalRec.style.color = "green"
            pTotalDesp.style.color = "red"

            cardTotalRec.appendChild(pRectext)
            cardTotalRec.appendChild(pTotalRec)
            cardTotalDesp.appendChild(pDespText)
            cardTotalDesp.appendChild(pTotalDesp)
            cardTotal.appendChild(pTotalText)
            cardTotal.appendChild(pTotal)



        })
}