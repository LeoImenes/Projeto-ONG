 function conectar() {
     let email = document.querySelector(".email")
     let senha = document.querySelector(".senha")
     let data = JSON.stringify({
         email: email.value,
         senha: senha.value,
     });

     fetch("http://10.87.207.27:3000/funcionarios", {
             method: "POST",
             headers: {
                 "Content-Type": "application/json",
             },
             body: data,
         })
         .then((resp) => {
             if (resp.status == 400) {
                 alert("Usuario ou senha errados")
             }
             return resp.json();
         })
         .then((data) => {
             if (data.id_funcionario !== undefined) {
                 localStorage.setItem("userdata", JSON.stringify(data));
                 window.location.href = "../../Home";

             } else {
                 alert("Usuario ou Senha invalidos");
             }
         });
 }