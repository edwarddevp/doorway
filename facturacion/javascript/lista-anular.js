const dataTable = document.getElementById('dataTable');
const dataTableContainer = document.getElementById('dataTableContainer');
const tbody = document.getElementById('tbody');
const loading = document.getElementById('loading');


window.onload = function () {
    fillTable()
};

const remove = async (id) => {
    if (confirm("Seguro que quiere elimnar esta factura?\nEsta accion no se puede deshacer")) {
        const res = await fetch('http://localhost:3000/factura-remove', {
            method: 'POST',
            body: JSON.stringify({ id }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const resJson = await res.json();
        if (resJson === "Factura anulada con exito") {
            alert(resJson)
            fillTable()
        } else {
            alert("No se pudo completar la operacion")
        }
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

    while (tbody.firstChild) {
        tbody.removeChild(tbody.lastChild);
    }

    const res = await fetch('http://localhost:3000/factura-list')
    const resJson = await res.json();

    if (resJson.length > 0) {
        resJson.map((item) => {
            const regex = /,/gi;
            const nombreProductos = item.productosNombres.split(',')
            const precioProductos = item.productosPrecios.split(',')
            const productos = nombreProductos.map((nombre, index) => nombre + ' ' + precioProductos[index] + '$\n').join().replace(regex, '')

            const today = new Date(item.fecha);
            const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

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


            const tdButtons = document.createElement("td");

            const newButtonContainer = document.createElement("div");

            const newButtonRemove = document.createElement("button");
            newButtonRemove.onclick = (e) => {
                e.preventDefault()
                remove(item.id)
            }
            newButtonRemove.classList.add('btn')
            newButtonRemove.classList.add('btn-outline-danger')
            newButtonRemove.classList.add('btn-sm')
            newButtonRemove.classList.add('m-0')
            newButtonRemove.classList.add('waves-effect')
            const iconRemove = document.createElement("span");
            iconRemove.setAttribute('data-feather', 'x')
            newButtonRemove.appendChild(iconRemove)

            newButtonContainer.appendChild(newButtonRemove)

            tdButtons.appendChild(newButtonContainer)

            newtr.appendChild(tdId);
            newtr.appendChild(tdDate);
            newtr.appendChild(tdName);
            newtr.appendChild(tdIdNumber);
            newtr.appendChild(tdEmail);
            newtr.appendChild(tdProducts);
            newtr.appendChild(tdButtons);

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