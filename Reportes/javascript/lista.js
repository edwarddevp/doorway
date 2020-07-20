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

    const res = await fetch('https://doorway-api.herokuapp.com/report-list',{
        method: 'POST',
        body: JSON.stringify({initialDate,finalDate}), 
        headers:{
          'Content-Type': 'application/json'
        }})
    const resJson = await res.json();

    

    if(resJson.length > 0) {
          resJson.map((item)=>{
        const regex = /,/gi;
        const productos = item.productosnombres.map((nombre,index)=>nombre+' '+item.productosprecios[index]+'$\n').join().replace(regex,'')

        const today = new Date(item.fecha[0]);
        const date = today.getFullYear() + '-' + (today.getMonth() +1) + '-' + today.getDate();

        const newtr = document.createElement("tr"); 
        const tdId = document.createElement("td"); 
        tdId.innerHTML = item.id
        const tdName = document.createElement("td"); 
        tdName.innerHTML = item.nombrecliente[0]
        const tdIdNumber = document.createElement("td"); 
        tdIdNumber.innerHTML = item.cedulacliente[0]
        const tdEmail = document.createElement("td"); 
        tdEmail.innerHTML = item.correocliente[0]
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


        // table = $('#dataTable').DataTable({
        //     destroy: true,
        //     "pagingType": 'first_last_numbers'
        // })
    }

    


    stopTableLoading()
}



const sendQueryId = (id) => {
    const url = '/cliente/editar/?id=' + id;
    window.location.replace(url);
}