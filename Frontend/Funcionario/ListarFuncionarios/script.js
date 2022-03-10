function list() {
    var body = document.querySelector(body)
    fetch("http://10.87.207.27:3000/funcionarios")
        .then(response => { return response.json() })
        .then(data => {
            data.forEach(fun => {
                var divimg = document.createElement("div")
                var divnome = document.createElement("div")
                var cont = document.querySelector(".content")
                var img = document.createElement("img");
                var cardfuncionario = document.createElement("div");
                var nome = document.createElement("h1");
                var matricula = document.createElement("h3");

                cardfuncionario.className = "cardFuncionario"
                img.className = "fotoUsuario"
                divimg.className = "img"

                if (fun.foto == null) {
                    img.src = "../../Assets/icones/user.png"
                } else {
                    img.src = fun.foto
                }

                nome.innerHTML = `${fun.nome_completo}`
                matricula.innerHTML = `${fun.matricula}`

                divimg.appendChild(img)
                divnome.appendChild(nome)
                divnome.appendChild(matricula)
                cardfuncionario.appendChild(divimg)
                cardfuncionario.appendChild(divnome)
                cont.appendChild(cardfuncionario)
            })
        })
}