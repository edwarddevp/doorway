const selectProductos = document.getElementById('selectProductos')
const fechaDeEntrega = document.getElementById('fechaDeEntrega')
const cantidad = document.getElementById('cantidad')
const submitButton = document.getElementById('submit')
const form = document.getElementById('edit-user-form')
const buttonLoading = document.getElementById('buttonLoading')


const fillSelectroduct = async (id,fecha) => {
    const today = new Date()
    const day = today.getDate() > 9? today.getDate() : '0'+today.getDate()
    const month = today.getMonth() +1 > 9? today.getMonth()+1 : '0'+(today.getMonth()+1)
    const date = today.getFullYear()+'-'+month +'-'+day;
    
    fechaDeEntrega.setAttribute('min',date)

    const fechaDeEntregaActual = new Date(fecha)
    const dayActual = fechaDeEntregaActual.getDate() > 9? fechaDeEntregaActual.getDate() : '0'+fechaDeEntregaActual.getDate()
    const monthActual = fechaDeEntregaActual.getMonth() +1 > 9? fechaDeEntregaActual.getMonth()+1 : '0'+(fechaDeEntregaActual.getMonth()+1)
    const dateActual = fechaDeEntregaActual.getFullYear()+'-'+monthActual +'-'+dayActual;

    fechaDeEntrega.value = dateActual

    fetch('http://localhost:3000/product-list')
        .then(res=>res.json())
        .then(res=>{
            res.map(item=>{
                const optionProduct = document.createElement("option"); 
                optionProduct.setAttribute('value',item.id)
                id == item.id && optionProduct.setAttribute('selected','')
                optionProduct.innerHTML = item.nombre

                selectProductos.appendChild(optionProduct)
            })
            

        })

}


submitButton.addEventListener('click',(e)=>{
    e.preventDefault()
    if (form.checkValidity() === false) {
        event.stopPropagation();
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
            .catch((err)=>err)
    }
    form.classList.add('was-validated');
})


window.addEventListener('load', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    const res = await fetch('http://localhost:3000/orden-get/'+id)
    const resJson = await res.json()

    fillSelectroduct(resJson.idProducto,resJson.fechaEntrega)

    cantidad.value = resJson.cantidad

    submitButton.toggleAttribute('disabled')
    buttonLoading.classList.add('display-none')
})