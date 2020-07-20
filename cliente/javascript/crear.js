const name = document.getElementById('name')
const cedula = document.getElementById('cedula')
const direccion = document.getElementById('direccion')
const email = document.getElementById('email')
const submitButton = document.getElementById('submit')
const form = document.getElementById('create-user-form')

submitButton.addEventListener('click',(e)=>{
    e.preventDefault()
    if (form.checkValidity() === false) {
        event.stopPropagation();
        console.log('hola')
    }else{
        fetch('https://doorway-api.herokuapp.com/client-create',{
            method: 'POST',
            body: JSON.stringify({
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
                if(resJson!=='Formulario Llenado Incorrectamente' || resJson !== 'No se ha podido registrar el cliente'){
                    window.location.replace("/cliente");
                }
                else {
                    alert(resJson)
                }
            })
    }
    form.classList.add('was-validated');
})
