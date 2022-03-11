let funcls = localStorage.getItem('userdata')
let funcionarioid = JSON.parse(funcls).id_funcionario

function dadosFunc() {

    fetch(`http://10.87.207.27:3000/funcionarios/${funcionarioid}`)
        .then(response => { return response.json() })
        .then(data => {
            let img = document.querySelector(".funcimg");

            if (data.foto !== null) {
                img.src = data[0].foto
            } else {
                img.src = "../../Assets/icones/user.png"

            }
        })

}