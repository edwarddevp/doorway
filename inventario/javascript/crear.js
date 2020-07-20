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
        fetch('https://doorway-api.herokuapp.com/product-create',{
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
                if(resJson!=='Formulario Llenado Incorrectamente')
                window.location.replace("/inventario");
            }).catch(err=>alert(err))
    }
    form.classList.add('was-validated');
})
