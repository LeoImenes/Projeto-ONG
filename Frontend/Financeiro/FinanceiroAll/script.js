function getfinanceiro() {

    var totalDespesas = 0;
    var totalReceitas = 0;

    fetch(`${url}/funcionario/financas`)
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
                    totalReceitas += item.valor
               

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
            var cardTotal = document.querySelector(".totalCont")
            var pTotalText = document.createElement("p")

            var cardTotalRec = document.querySelector(".totalreceitaContent")
            var pTotalRec = document.createElement("p")
            var pRectext = document.createElement("p")

            pDespText.innerHTML = "Total das Despesas: "
            pRectext.innerHTML = "Total das Receitas: "
            pTotalText.innerHTML = "Saldo: "
                // pRectext.style.marginRight = "20px"
                // pDespText.style.marginRight = "20px"
            pTotalDesp.innerHTML = `R$${totalDespesas.toFixed(2)}`
            pTotalRec.innerHTML = `R$${totalReceitas.toFixed(2)}`

            if (total < 0) {
                pTotal.style.color = "red"
            } else {
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


var receitasinputs = document.querySelector(".inputs").style.display = "none"

function cadastrarReceita() {
    var buttonDiv = document.querySelector(".button")

    var cardReceitas = document.querySelector(".cardReceitas")
    var receitasinputs = document.querySelector(".inputs")

    // var cardDespesas = document.querySelector(".cardDespesas")

    // cardDespesas.style.display = "none"
    receitasinputs.style.display = "grid"
    cardReceitas.style.display = "none";
    buttonDiv.style.display = "none"


    if (receitasinputs.style.display == "none") {
        receitasinputs.style.display = "grid"


    }

    var receitaSpan = document.querySelector(".closeRec").addEventListener(("click"), () => {
        receitasinputs.style.display = "none"
        cardReceitas.style.display = "grid"
        cardReceitas.style.flexDirection = "column"
        buttonDiv.style.display = "flex"
    });

}

function fetchReceitas() {
    var func = localStorage.getItem('userdata')

    var descricao = document.querySelector(".RecDesc").value;;
    var valor = document.querySelector(".valDesc").value;

   

    var data = JSON.stringify({
        "id_funcionario": JSON.parse(func).id_funcionario,
        "tipo": 1,
        "descricao": descricao,
        "valor": valor
    })

    fetch(`${url}/funcionario/financas`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        })
        .then(response => {
            if (response.ok) {
                alert("Cadastro efetuado com sucesso")
                return response.json()

            } else {
                alert("Falha ao Cadastrar")
            }

        })

    .then(data => {
        window.location.reload()
    })
}

var despesainput = document.querySelector(".inputsDesp").style.display = "none"

function cadastrarDespesa() {
    var buttonDiv = document.querySelector(".buttonDesp")

    var cardDespesas = document.querySelector(".cardDespesas")
    var despesainput = document.querySelector(".inputsDesp")

    // var cardDespesas = document.querySelector(".cardDespesas")

    // cardDespesas.style.display = "none"
    despesainput.style.display = "flex"
    cardDespesas.style.display = "none";
    buttonDiv.style.display = "none"


    if (despesainput.style.display == "none") {
        despesainput.style.display = "flex"

    }

    var receitaSpan = document.querySelector(".closeDesp").addEventListener(("click"), () => {
        despesainput.style.display = "none"
        cardDespesas.style.display = "grid"
            // cardDespesas.style.flexDirection = "column"
        buttonDiv.style.display = "flex"
    });

}

function fetchDespesas() {
    var func = localStorage.getItem('userdata')

    var descricao = document.querySelector(".DespDesc").value;;
    var valor = document.querySelector(".valDesp").value;

   

    var data = JSON.stringify({
        "id_funcionario": JSON.parse(func).id_funcionario,
        "tipo": 0,
        "descricao": descricao,
        "valor": valor
    })

    fetch(`${url}/funcionario/financas`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        })
        .then(response => {
            if (response.ok) {
                alert("Cadastro efetuado com sucesso")
                return response.json()

            } else {
                alert("Falha ao Cadastrar")
            }

        })

    .then(data => {
        window.location.reload()
    })
}