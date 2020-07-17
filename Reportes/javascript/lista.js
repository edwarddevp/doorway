const dataTable = document.getElementById('dataTable');
const dataTableContainer = document.getElementById('dataTableContainer');
const tbody = document.getElementById('tbody');
const loading = document.getElementById('loading');
let table = '';

const stopTableLoading = () => {
    dataTableContainer.classList.remove('display-none')
    loading.classList.add('display-none')
}

const startTableLoading = () => {
    dataTableContainer.classList.add('display-none')
    loading.classList.remove('display-none')
}

const fillTable = async (initialDate,finalDate) => {
    startTableLoading()

    while (tbody.firstChild) {
        tbody.removeChild(tbody.lastChild);
    }

    const res = await fetch('http://localhost:3000/report-list',{
        method: 'POST',
        body: JSON.stringify({initialDate,finalDate}), 
        headers:{
          'Content-Type': 'application/json'
        }})
    const resJson = await res.json();

    

    if(resJson.length > 0) {
          resJson.map((item)=>{
        const regex = /,/gi;
        const nombreProductos = item.productosNombres.split(',')
        const precioProductos = item.productosPrecios.split(',')
        const productos = nombreProductos.map((nombre,index)=>nombre+' '+precioProductos[index]+'$\n').join().replace(regex,'')

        const today = new Date(item.fecha);
        const date = today.getFullYear() + '-' + (today.getMonth() +1) + '-' + today.getDate();

        const newtr = document.createElement("tr"); 
        const tdId = document.createElement("td"); 
        tdId.innerHTML = item.id
        const tdName = document.createElement("td"); 
        tdName.innerHTML = item.nombreCliente
        const tdIdNumber = document.createElement("td"); 
        tdIdNumber.innerHTML = item.cedulaCliente
        const tdEmail = document.createElement("td"); 
        tdEmail.innerHTML = item.correoCliente
        const tdProducts = document.createElement("td"); 
        tdProducts.innerHTML = productos
        const tdDate = document.createElement("td"); 
        tdDate.innerHTML = date

        newtr.appendChild(tdId);
        newtr.appendChild(tdDate);
        newtr.appendChild(tdName);
        newtr.appendChild(tdIdNumber);
        newtr.appendChild(tdEmail);
        newtr.appendChild(tdProducts);

        tbody.appendChild(newtr)
    })
        feather.replace()


        table = $('#dataTable').DataTable({
            destroy: true,
            "pagingType": 'first_last_numbers'
        })
    }

    


    stopTableLoading()
}



const sendQueryId = (id) => {
    const url = '/cliente/editar/?id=' + id;
    window.location.replace(url);
}