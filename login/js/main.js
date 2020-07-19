const submitButtom = document.getElementById('submit-buttom')
const correo = document.getElementById('correo')
const contraseña = document.getElementById('contraseña')


const validarCorreo = () => {
    correo.classList.remove("border-red")
    if (correo.value == ""  ||  correo.value == null  || validarEmail(correo.value)) {
        correo.classList.add("border-red")
        return false
     }
     return true
}


const validarContraseña = () => {
    contraseña.classList.remove("border-red")
    if (contraseña.value == ""  ||  contraseña.value == null) {
        contraseña.classList.add("border-red")
        return false
     }
     return true
}


const validarFormularioRegistro = async (e) => {
    e.preventDefault()
    const correoValidacion = validarCorreo()
    const contraseñaValidacion = validarContraseña()
    if(correoValidacion && contraseñaValidacion){
        try{
            const res = await fetch('http://localhost:3000/signin', {
                method: 'POST',
                body: JSON.stringify({ 
                    email:correo.value,
                    password:contraseña.value
                 }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const resJson = await res.json();
    
            console.log(typeof resJson)
            if(typeof resJson !== 'string'){
                document.cookie = "login_token_id="+resJson.id+'; path=/';
                window.location.replace("/");
    
            }else{
                alert(resJson)
            }

        }catch(e){
            alert(e)
        }

    }else{
        return
    }

}


function validarEmail(valor) {
    if (/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(valor)){
     return false
    } else {
     return true
    }
  }
  
  submitButtom.addEventListener('click', validarFormularioRegistro);