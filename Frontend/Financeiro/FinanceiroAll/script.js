const url = `http://localhost:3000/funcionario/financas`

var body = document.querySelector('body').addEventListener('onload', getfinanceiro())

function getfinanceiro(){
    fetch(url)
    .then(response => { return response.json()})
    .then(data => {
        data.forEach(item => {
            if(item.tipo === 0 ){
                console.log("Despesas")
            }else{
                console.log("Lancamentos")
            }
        })

       
    })

}