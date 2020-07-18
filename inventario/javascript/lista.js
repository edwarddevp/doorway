const dataTable = document.getElementById('dataTable');
const dataTableContainer = document.getElementById('dataTableContainer');
const tbody = document.getElementById('tbody');
const loading = document.getElementById('loading');

window.onload = function() {
    fillTable()
  };

const remove = async (item) => {
    if(confirm('De verdad que quieres eliminar este item?\nno lo podras recuperar una vez eliminado')){
        const res = await fetch('http://localhost:3000/product-remove',{
            method: 'POST',
            body: JSON.stringify({id:item.id}), 
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
    startTableLoading

    while (tbody.firstChild) {
        tbody.removeChild(tbody.lastChild);
    }

    const res = await fetch('http://localhost:3000/product-list')
    const resJson = await res.json();

    if(resJson.length > 0) {
    resJson.map((item)=>{
        const newtr = document.createElement("tr"); 
        const tdId = document.createElement("td"); 
        tdId.innerHTML = item.id
        const tdName = document.createElement("td"); 
        tdName.innerHTML = item.nombre
        const tdDescription = document.createElement("td"); 
        tdDescription.innerHTML = item.descripcion
        const tdCantidad = document.createElement("td"); 
        tdCantidad.innerHTML = item.cantidad
        const tdPrecio = document.createElement("td"); 
        tdPrecio.innerHTML = item.precio +'$'
        
        const tdButtons = document.createElement("td"); 

        const newButtonContainer = document.createElement("div"); 
        const newButtonEdit = document.createElement("button"); 
        newButtonEdit.onclick = () => sendQueryId(item.id);
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
        newButtonRemove.onclick = () => remove(item);
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
        newtr.appendChild(tdDescription);
        newtr.appendChild(tdCantidad);
        newtr.appendChild(tdPrecio);
        newtr.appendChild(tdButtons);

        tbody.appendChild(newtr)
    })
    feather.replace()
    // $('#dataTable').DataTable({
    //         "pagingType": 'first_last_numbers'
    // })
    }
    stopTableLoading()
}

const sendQueryId = (id) => {
    const url = '/inventario/editar-producto/?id=' + id;
    window.location.replace(url);
}