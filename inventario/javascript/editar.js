const name = document.getElementById('name')
const cantidad = document.getElementById('cantidad')
const precio = document.getElementById('precio')
const description = document.getElementById('description')
const submitButton = document.getElementById('submit')
const form = document.getElementById('edit-product-form')
const buttonLoading = document.getElementById('buttonLoading')


submitButton.addEventListener('click',(e)=>{
    e.preventDefault()
    if (form.checkValidity() === false) {
        event.stopPropagation();
    }else{
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        fetch('http://localhost:3000/product-update',{
            method: 'POST',
            body: JSON.stringify({
                id:id,
                nombre:name.value,
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


window.addEventListener('load', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    const res = await fetch('http://localhost:3000/product-get/'+id)
    const resJson = await res.json()

    name.value = resJson.nombre
    precio.value = resJson.precio
    description.value = resJson.descripcion

    submitButton.toggleAttribute('disabled')
    buttonLoading.classList.add('display-none')
})