const productoId = document.getElementById('idProducto')
const cantidad = document.getElementById('cantidad')
const fechaDeEntrega = document.getElementById('date')
const submitButton = document.getElementById('submit')
const form = document.getElementById('create-order-form')

submitButton.addEventListener('click',(e)=>{
    e.preventDefault()
    if (form.checkValidity() === false && !(Date.value > new Date)) {
        event.stopPropagation();
        console.log('hola')
    }else{
        console.log('name: ' + productoId.value)
        console.log('cantidad: ' + cantidad.value)
        console.log('serial: ' + fechaDeEntrega.value)
    }
    form.classList.add('was-validated');
})
