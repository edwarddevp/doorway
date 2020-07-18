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
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        fetch('http://localhost:3000/client-update',{
            method: 'POST',
            body: JSON.stringify({
                id:id,
                nombre:name.value,
                cedula:cedula.value,
                direccion:direccion.value,
                correo:email.value,
            }), 
            headers:{
              'Content-Type': 'application/json'
            }}).then(res=>res.json())
            .then(resJson=>{
                alert(resJson)
                if(resJson!=='Formulario Llenado Incorrectamente')
                window.location.replace("/cliente");
            })
    }
    form.classList.add('was-validated');
})


window.addEventListener('load', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    const res = await fetch('http://localhost:3000/client-get/'+id)
    const resJson = await res.json()



    name.value = resJson.nombre
    cedula.value = resJson.cedula
    direccion.value = resJson.direccion
    email.value = resJson.correo

    submitButton.toggleAttribute('disabled')
    buttonLoading.classList.add('display-none')
})