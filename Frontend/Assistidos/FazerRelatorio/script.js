function Relatorio() {
    let relatorio = document.querySelector(".relatorio").value;
    let btn = document.querySelector(".btnLog");
    var local = localStorage.getItem("assistido");
    var funcionario = localStorage.getItem('userdata')

    var data = JSON.stringify({
        "id_funcionario": JSON.parse(funcionario).id_funcionario,
        "id_assistido": JSON.parse(local),
        "relatorio": relatorio
    })


    fetch(`${url}/relatorio/assistido`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },

        body: data
    })
        .then((resp) => {
            if(resp.ok){
                alert("Cadastrado com sucesso")
                return resp.json();
            }
            
        })
        .then((data) => {
            console.log(data)
            // localStorage.setItem("userdata", JSON.stringify(data));
            // window.location.href = "../../Assistidos/VerAssistido";

        }
        );
}

function getAssistido() {
    var h1 = document.querySelector("h1")
    var img = document.querySelector(".ImgAssistido")

    var local = localStorage.getItem("assistido");
    console.log(local)

    fetch(`${url}/assistidos/${local}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            h1.innerHTML = ` ${data.nome_completo}`
            img.src = `${data.foto_antes}`
            console.log(data)
        }
    )
}