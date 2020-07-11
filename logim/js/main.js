var formulario = document.getElementById('formulario'),
nombre = formulario.nombre,
correo = formulario.correo,
contraseña = formulario.contraseña,
confirmar = formulario.confirmar;


function validarNombre(e) {
    if (nombre.value == ""  ||  nombre.value == null) {
       console.log('Por favor  ingrese su nombre');
       alert('Por favor ingrese su nombre');
        e.preventDefault();
    }
}

function validarCorreo(e) {
    if (correo.value == ""  ||  Correo.value == null) {
        console.log('Por Favor ingrese su Correo');
        alert('Por favor ingrese su Correo');
         e.preventDefault();
     }
}


function validarContraseña(e) {
    if (contraseña.value == ""  ||  correo.value == null) {
        console.log('Por Favor ingrese su Contraseña');
        alert('Por favor ingrese su Contraseña');
         e.preventDefault();
     }
}

function validarConfirmar(e) {
    if (confirmar.value == ""  ||  confirmar.value == null) {
        console.log('Por Favor ingrese su Confirmación de Contraseña');
        alert('Por favor ingrese su Confirmación de Contraseña');
         e.preventDefault();
     }
}

function validarFormulario(e) {
   
    validarNombre(e);
    validarCorreo(e);
    validarContraseña(e);
    validarConfirmar(e);

}

formulario.addEventListener('submit', validarFormulario);

