function list() {
    let input = document.querySelector('input');
    let filterText = input.value
    let names = []
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

                names.push(fun.nome_completo)
                console.log(names)

                cardfuncionario.className = "cardFuncionario"
                img.className = "fotoUsuario"
                divimg.className = "img"
                divnome.className = "nome"

                if (fun.foto == null) {
                    img.src = "../../Assets/icones/user.png"
                } else {
                    img.src = fun.foto
                }

                if (!fun.status == 0) {
                    matricula.innerHTML = `Ativo`
                    matricula.style.color = `green`
                } else {
                    matricula.innerHTML = `Inativo`
                    matricula.style.color = `red`
                }

                nome.innerHTML = `${fun.nome_completo}`


                divimg.appendChild(img)
                divnome.appendChild(nome)
                divnome.appendChild(matricula)
                cardfuncionario.appendChild(divimg)
                cardfuncionario.appendChild(divnome)
                cont.appendChild(cardfuncionario)


            })


        })
}

function buscar() {}