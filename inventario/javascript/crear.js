const name = document.getElementById('name')
const cantidad = document.getElementById('cantidad')
const serial = document.getElementById('serial')
const description = document.getElementById('description')
const submitButton = document.getElementById('submit')
const form = document.getElementById('create-product-form')

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
