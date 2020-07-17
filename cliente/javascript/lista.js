const dataTable = document.getElementById('dataTable');
const dataTableContainer = document.getElementById('dataTableContainer');
const tbody = document.getElementById('tbody');
const loading = document.getElementById('loading');
let table = '';

window.onload = function() {
    fillTable()
  };

const remove = async (client) => {
    if(confirm('De verdad que quieres eliminar este cliente?\nno lo podras recuperar una vez eliminado')){
        const res = await fetch('http://localhost:3000/client-remove',{
            method: 'POST',
            body: JSON.stringify({id:client.id}), 
            headers:{
              'Content-Type': 'application/json'
            }})
        const resJson = await res.json();
        alert(resJson)
        fillTable()
    }
}

const stopTableLoading = () => {
    dataTableContainer.classList.remove('display-none')
    loading.classList.add('display-none')
}

const startTableLoading = () => {
    dataTableContainer.classList.add('display-none')
    loading.classList.remove('display-none')
}

const fillTable = async () => {
    startTableLoading()

    table && table.state.clear()

    while (tbody.firstChild) {
        tbody.removeChild(tbody.lastChild);
    }

    const res = await fetch('http://localhost:3000/client-list')
    const resJson = await res.json();

    if(resJson.length > 0) {
    resJson.map((cliente)=>{
        const newtr = document.createElement("tr");

        const tdId = document.createElement("td"); 
        tdId.innerHTML = cliente.id
        const tdName = document.createElement("td"); 
        tdName.innerHTML = cliente.nombre
        const tdCedula = document.createElement("td"); 
        tdCedula.innerHTML = cliente.cedula
        const tdEmail = document.createElement("td"); 
        tdEmail.innerHTML = cliente.correo
        const tdDirection = document.createElement("td"); 
        tdDirection.innerHTML = cliente.direccion
        
        const tdButtons = document.createElement("td"); 

        const newButtonContainer = document.createElement("div"); 
        const newButtonEdit = document.createElement("button"); 
        newButtonEdit.onclick = () => sendQueryId(cliente.id);
        newButtonEdit.classList.add('btn')
        newButtonEdit.classList.add('btn-outline-primary')
        newButtonEdit.classList.add('btn-sm')
        newButtonEdit.classList.add('m-0')
        newButtonEdit.classList.add('waves-effect')
        newButtonEdit.classList.add('mr-2')
        const iconEdit =  document.createElement("span"); 
        iconEdit.setAttribute('data-feather','edit')
        newButtonEdit.appendChild(iconEdit)

        const newButtonRemove = document.createElement("button"); 
        newButtonRemove.onclick = () => remove(cliente);
        newButtonRemove.classList.add('btn')
        newButtonRemove.classList.add('btn-outline-danger')
        newButtonRemove.classList.add('btn-sm')
        newButtonRemove.classList.add('m-0')
        newButtonRemove.classList.add('waves-effect')
        const iconRemove =  document.createElement("span"); 
        iconRemove.setAttribute('data-feather','trash-2')
        newButtonRemove.appendChild(iconRemove)

        newButtonContainer.appendChild(newButtonEdit)
        newButtonContainer.appendChild(newButtonRemove)

        tdButtons.appendChild(newButtonContainer)

        newtr.appendChild(tdId);
        newtr.appendChild(tdName);
        newtr.appendChild(tdCedula);
        newtr.appendChild(tdEmail);
        newtr.appendChild(tdDirection);
        newtr.appendChild(tdButtons);

        tbody.appendChild(newtr)
    })
    feather.replace()
    // table = $('#dataTable').DataTable({
    //     destroy: true,
    //     "pagingType": 'first_last_numbers'
    // })

    console.log(table)
}
    stopTableLoading()
}

const sendQueryId = (id) => {
    const url = '/cliente/editar/?id=' + id;
    window.location.replace(url);
}