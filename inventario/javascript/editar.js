const name = document.getElementById('name')
const cantidad = document.getElementById('cantidad')
const serial = document.getElementById('serial')
const description = document.getElementById('description')
const submitButton = document.getElementById('submit')
const form = document.getElementById('edit-product-form')
const buttonLoading = document.getElementById('buttonLoading')


submitButton.addEventListener('click',(e)=>{
    e.preventDefault()
    if (form.checkValidity() === false) {
        event.stopPropagation();
        console.log('hola')
    }else{
        console.log('name: ' + name.value)
        console.log('cantidad: ' + cantidad.value)
        console.log('serial: ' + serial.value)
        console.log('description: ' + description.value)
    }
    form.classList.add('was-validated');
})


window.addEventListener('load', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    const producto ={
        name:'producto',
        cantidad:'45',
        serial:'12457895563',
        description:'asdsadxsacsajbcjsahb'
    }

    name.value = producto.name
    cantidad.value = producto.cantidad
    serial.value = producto.serial
    description.value = producto.description

    submitButton.toggleAttribute('disabled')
    buttonLoading.classList.add('display-none')
})