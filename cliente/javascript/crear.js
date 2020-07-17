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
        fetch('http://localhost:3000/client-create',{
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
                window.location.replace("/cliente");
            })
    }
    form.classList.add('was-validated');
})
