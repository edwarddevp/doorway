const name = document.getElementById('name')
const cedula = document.getElementById('cedula')
const direccion = document.getElementById('direccion')
const email = document.getElementById('email')
const submitButton = document.getElementById('submit')
const form = document.getElementById('create-user-form')

submitButton.addEventListener('click',(e)=>{
    e.preventDefault()
    if (form.checkValidity() === false) {
        event.stopPropagation();
        console.log('hola')
    }else{
        console.log('Nombre: ' + name.value)
        console.log('Cedula: ' + cedula.value)
        console.log('Direccion: ' + direccion.value)
        console.log('Correo: ' + email.value)
    }
    form.classList.add('was-validated');
})
