function conectar() {
    let email = document.querySelector(".email");
    let cpf = document.querySelector(".cpf");
    let nova_senha = document.querySelector(".senhaNova");
    let data = JSON.stringify({
        email: email.value,
        cpf: cpf.value,
        nova_senha: md5(nova_senha.value),
    });

    fetch(`${url}/funcionario/reset_senha`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        })
        .then((resp) => {
            if (resp.status == 401) {
                alert("Email ou Senha Invalido");
            }
            return resp.json();
        })
        .then((data) => {
            window.location.href = "../../Login/"
        });
}

function olharSenha() {
    let img = document.querySelector(".olhar");
    let input = document.querySelector(".senha");

    if (input.type == "password") {
        input.type = "text";
        img.src = "../Assets/icones/visibility.png";
    } else {
        input.type = "password";
        img.src = "../Assets/icones/view.png";
    }
}