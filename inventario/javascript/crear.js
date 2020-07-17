const name = document.getElementById('name')
const cantidad = document.getElementById('cantidad')
const precio = document.getElementById('precio')
const description = document.getElementById('description')
const submitButton = document.getElementById('submit')
const form = document.getElementById('create-product-form')

submitButton.addEventListener('click',(e)=>{
    e.preventDefault()
    if (form.checkValidity() === false) {
        event.stopPropagation();
    }else{
        fetch('http://localhost:3000/product-create',{
            method: 'POST',
            body: JSON.stringify({
                nombre:name.value,
                cantidad:cantidad.value,
                precio:precio.value,
                descripcion:description.value,
            }), 
            headers:{
              'Content-Type': 'application/json'
            }}).then(res=>res.json())
            .then(resJson=>{
                alert(resJson)
                window.location.replace("/inventario");
            })
    }
    form.classList.add('was-validated');
})
