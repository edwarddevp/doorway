const submitButtom = document.getElementById('submit-buttom')
const nombre = document.getElementById('nombre')
const correo = document.getElementById('correo')
const contraseña = document.getElementById('contraseña')
const confirmar = document.getElementById('confirmar')

const validarNombre = () => {
    nombre.classList.remove("border-red")
    if (nombre.value == ""  ||  nombre.value == null) {
        nombre.classList.add("border-red")
       return false
    }
    return true
}

const validarCorreo = () => {
    correo.classList.remove("border-red")
    if (correo.value == ""  ||  correo.value == null || validarEmail(correo.value)) {
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

const validarConfirmar = () => {
    confirmar.classList.remove("border-red")
    if (confirmar.value == ""  ||  confirmar.value == null || confirmar.value !== contraseña.value) {
        confirmar.classList.add("border-red")
        return false
     }
     return true
}

const validarFormularioRegistro = async (e) => {
    e.preventDefault()
    validarNombre(e);
    validarCorreo(e);
    validarContraseña(e);
    validarConfirmar(e);
    const correoValidacion = validarCorreo()
    const contraseñaValidacion = validarContraseña()
    const correoNombre = validarNombre()
    const contraseñaConfirmar = validarConfirmar()
    if(correoValidacion && contraseñaValidacion && correoNombre&& contraseñaConfirmar){
        try{
            const res = await fetch('https://doorway-api.herokuapp.com/register', {
                method: 'POST',
                body: JSON.stringify({ 
                    email:correo.value,
                    password:contraseña.value,
                    name:nombre.value
                 }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const resJson = await res.json();
    
            if(typeof resJson !== 'string'){
                document.cookie = "login_token_id="+resJson+'; path=/';
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