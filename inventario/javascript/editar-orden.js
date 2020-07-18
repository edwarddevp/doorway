const selectProductos = document.getElementById('selectProductos')
const fechaDeEntrega = document.getElementById('fechaDeEntrega')
const cantidad = document.getElementById('cantidad')
const submitButton = document.getElementById('submit')
const form = document.getElementById('edit-user-form')
const buttonLoading = document.getElementById('buttonLoading')


submitButton.addEventListener('click',(e)=>{
    e.preventDefault()
    if (form.checkValidity() === false) {
        event.stopPropagation();
        console.log('hola')
    }else{
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        fetch('http://localhost:3000/orden-update',{
            method: 'POST',
            body: JSON.stringify({
                id:id,
                selectProductos:selectProductos.value,
                fechaDeEntrega:fechaDeEntrega.value,
                cantidad:cantidad.value
            }), 
            headers:{
              'Content-Type': 'application/json'
            }}).then(res=>res.json())
            .then(resJson=>{
                alert(resJson)
                if(resJson!=='Formulario Llenado Incorrectamente')
                window.location.replace("/inventario/manejar-ordenes")
            })
    }
    form.classList.add('was-validated');
})


window.addEventListener('load', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    const res = await fetch('http://localhost:3000/orden-get/'+id)
    const resJson = await res.json()

    console.log(resJson.fechaEntrega)

    selectProductos.value = resJson.selectProductos
    fechaDeEntrega.value = resJson.fechaEntrega
    cantidad.value = resJson.cantidad

    submitButton.toggleAttribute('disabled')
    buttonLoading.classList.add('display-none')
})