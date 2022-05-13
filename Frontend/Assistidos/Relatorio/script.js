let relatorio = document.querySelector(".relatorio");
let btn = document.querySelector(".btnLog");

relatorio.value;

function relatorio() {
<<<<<<< HEAD
        // fetch('https://app-ongdigital-backend.herokuapp.com/relatorio/assistido'), {
        fetch('https://localhost:3000/relatorio/assistido'), {
=======
    // fetch('localhost/relatorio/assistido'), {
    fetch(`${url}/relatorio/assistido`), {
>>>>>>> eac630cf1c7b14aa7e67fe7647e3a383b6aac1b7
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },

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

            }
        );
}