const dataTable = document.getElementById('dataTable');
const dataTableContainer = document.getElementById('dataTableContainer');
const tbody = document.getElementById('tbody');
const loading = document.getElementById('loading');

window.onload = function () {
    fillTable()
};

const remove = async (item) => {
    if (confirm('De verdad que quieres eliminar este item?\nno lo podras recuperar una vez eliminado')) {
        const res = await fetch('https://doorway-api.herokuapp.com/orden-remove', {
            method: 'POST',
            body: JSON.stringify({ id: item.id }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
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

    const res = await fetch('https://doorway-api.herokuapp.com/orden-list')
    const resJson = await res.json();

    if (resJson.length > 0) {
        resJson.map((item) => {
            const creation = new Date(item.fechacreacion)
            const creationDate = creation.getFullYear() + '-' + (creation.getMonth() + 1) + '-' + creation.getDate();

            const deliver = new Date(item.fechaentrega)
            const deliverDate = deliver.getFullYear() + '-' + (deliver.getMonth() + 1) + '-' + deliver.getDate();

            const newtr = document.createElement("tr");
            const tdId = document.createElement("td");
            tdId.innerHTML = item.id
            const tdFechaCreacion = document.createElement("td");
            tdFechaCreacion.innerHTML = creationDate
            const tdFechaEntrega = document.createElement("td");
            tdFechaEntrega.innerHTML = deliverDate
            const tdCantidad = document.createElement("td");
            tdCantidad.innerHTML = item.cantidad
            const tdProductp = document.createElement("td");
            tdProductp.innerHTML = item.producto

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
            const iconEdit = document.createElement("span");
            iconEdit.setAttribute('data-feather', 'edit')
            newButtonEdit.appendChild(iconEdit)

            const newButtonRemove = document.createElement("button");
            newButtonRemove.onclick = () => remove(item);
            newButtonRemove.classList.add('btn')
            newButtonRemove.classList.add('btn-outline-danger')
            newButtonRemove.classList.add('btn-sm')
            newButtonRemove.classList.add('m-0')
            newButtonRemove.classList.add('waves-effect')
            const iconRemove = document.createElement("span");
            iconRemove.setAttribute('data-feather', 'trash-2')
            newButtonRemove.appendChild(iconRemove)

            newButtonContainer.appendChild(newButtonEdit)
            newButtonContainer.appendChild(newButtonRemove)

            tdButtons.appendChild(newButtonContainer)

            newtr.appendChild(tdId);
            newtr.appendChild(tdFechaCreacion);
            newtr.appendChild(tdFechaEntrega);
            newtr.appendChild(tdCantidad);
            newtr.appendChild(tdProductp);
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
    const url = '/inventario/editar-orden-de-compra/?id=' + id;
    window.location.replace(url);
}