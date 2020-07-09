const name = document.getElementById('name')
const cedula = document.getElementById('cedula')
const direccion = document.getElementById('direccion')
const email = document.getElementById('email')
const submitButton = document.getElementById('submit')
const form = document.getElementById('edit-user-form')
const buttonLoading = document.getElementById('buttonLoading')


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


window.addEventListener('load', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log(id)

    const cliente ={
        name:'cliente',
        cedula:'51265123',
        email:'email@email.com',
        direccion:'asdsadxsacsajbcjsahb'
    }

    name.value = cliente.name
    cedula.value = cliente.cedula
    direccion.value = cliente.direccion
    email.value = cliente.email

    submitButton.toggleAttribute('disabled')
    buttonLoading.classList.add('display-none')
})