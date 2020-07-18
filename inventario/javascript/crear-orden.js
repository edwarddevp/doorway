const productoId = document.getElementById('selectProductos')
const cantidad = document.getElementById('cantidad')
const fechaDeEntrega = document.getElementById('fechaDeEntrega')
const submitButton = document.getElementById('submit')
const form = document.getElementById('create-order-form')

const selectProductos = document.getElementById('selectProductos')


window.onload = async () => {  
    const today = new Date()
    const day = today.getDate() > 9? today.getDate() : '0'+today.getDate()
    const month = today.getMonth() +1 > 9? today.getMonth()+1 : '0'+(today.getMonth()+1)
    const date = today.getFullYear()+'-'+month +'-'+day;
    
    fechaDeEntrega.setAttribute('min',date)
    fetch('http://localhost:3000/product-list')
        .then(res=>res.json())
        .then(res=>{
            res.map(item=>{
                const optionProduct = document.createElement("option"); 
                optionProduct.setAttribute('value',item.id)
                optionProduct.innerHTML = item.nombre

                selectProductos.appendChild(optionProduct)
            })
            

        })


};


submitButton.addEventListener('click',(e)=>{
    e.preventDefault()
    if (form.checkValidity() === false && !(Date.value > new Date)) {
        event.stopPropagation();
    }else{
        fetch('http://localhost:3000/orden-create',{
            method: 'POST',
            body: JSON.stringify({
                idProducto:productoId.value,
                cantidad:cantidad.value,
                fechaEntrega:fechaDeEntrega.value,
            }),
            headers:{
              'Content-Type': 'application/json'
            }}).then(res=>res.json())
            .then(resJson=>{
                alert(resJson)
                if(resJson!=='Formulario Llenado Incorrectamente')
                window.location.replace("/inventario/manejar-ordenes/");
            })
    }
    form.classList.add('was-validated');
})
