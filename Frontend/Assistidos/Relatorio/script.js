let relatorio = document.querySelector(".relatorio");
let btn = document.querySelector(".btnLog");

relatorio.value;

function relatorio() {
<<<<<<< HEAD
    fetch(`${url}/relatorio/assistido`), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
=======
    // fetch('localhost/relatorio/assistido'), {
    fetch(`${url}/relatorio/assistido`), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
>>>>>>> aa90b4f3d8e2996a64d6095aaeba4ac309ca09a7

            body: data
        }
        .then((resp) => {
            if (resp.status == 400) {
                alert("Falha ao enviar relatório")
            }
            return resp.json();
        })
        .then((data) => {
            localStorage.setItem("userdata", JSON.stringify(data));
            window.location.href = "../../Assistidos/VerAssistido";

        });
}