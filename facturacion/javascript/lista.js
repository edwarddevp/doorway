const dataTable = document.getElementById('dataTable');
const dataTableContainer = document.getElementById('dataTableContainer');
const tbody = document.getElementById('tbody');
const loading = document.getElementById('loading');

const inputCliente = document.getElementById('inputCliente');
const buscarCliente = document.getElementById('buscarCliente');

const submitProductos = document.getElementById('submitProductos');
const buttonLoading = document.getElementById('buttonLoading')
const submitButton = document.getElementById('submit')

const clientData = document.getElementById('clientData')

const productWarning = document.getElementById('productWarning')

let resCheckClient = null;
let itemsChosen = [];

buscarCliente.addEventListener("click", async () => {
    clientData.innerHTML = ""
    if (inputCliente.value) {
        const res = await fetch('http://localhost:3000/client-find', {
            method: 'POST',
            body: JSON.stringify({
                search: inputCliente.value,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        resCheckClient = await res.json();

        if (resCheckClient !== "Cliente no encontrado") {
            clientData.classList.add('border')
            clientData.classList.add('p-2')
            clientData.classList.add('mb-2')

            const tdTitle = document.createElement("h5");
            tdTitle.innerHTML = "Cliente elegido"
            const tdName = document.createElement("h6");
            tdName.innerHTML = "Nombre: " + resCheckClient.nombre
            const tdCedula = document.createElement("h6");
            tdCedula.innerHTML = "Cedula: " + resCheckClient.cedula
            const tdCorreo = document.createElement("h6");
            tdCorreo.innerHTML = "Correo: " + resCheckClient.correo

            clientData.appendChild(tdTitle)
            clientData.appendChild(tdName)
            clientData.appendChild(tdCedula)
            clientData.appendChild(tdCorreo)
        } else {
            const tdName = document.createElement("p");
            tdName.innerHTML = "Cliente no Encontrado"
            tdName.style = 'color:red;'

            clientData.appendChild(tdName)
        }

    }
})


window.onload = function () {
    fillTable()
    fillSelect()

};

const fillSelect = async () => {
    const res = await fetch('http://localhost:3000/product-list')
    resJson = await res.json();
    submitButton.toggleAttribute('disabled')
    buttonLoading.classList.add('display-none')

    resJson.map(item => {
         if(item.cantidad > 0) {
            const options = document.createElement("option");
            options.innerHTML = item.nombre;
            options.value = item.id

            selectProduct.appendChild(options)
        }
    })

    $('.js-example-basic-single').select2({
        placeholder: 'Select an option',
        multiple: true
    });

    $('.js-example-basic-single').val(null).trigger('change');

    submitProductos.addEventListener('click', () => {
        const items = $('.js-example-basic-single ').select2('data');
        fillTable(resJson, items)
    })

}



const remove = async (resJson, items, item) => {
    const removeItem = items.filter(itemData => itemData.id != item.id)
    const removeItemSelect = removeItem.map(item => item.id)
    $('.js-example-basic-single').val(removeItemSelect).trigger("change")
    fillTable(resJson, removeItem)
}

const stopTableLoading = () => {
    dataTableContainer.classList.remove('display-none')
    loading.classList.add('display-none')
}

const startTableLoading = () => {
    dataTableContainer.classList.add('display-none')
    loading.classList.remove('display-none')
}





const fillTable = async (resJson = [], items = []) => {
    startTableLoading()

    productWarning.innerHTML = ''

    const itemsIds = items.map(item => item.id)
    itemsChosen = resJson.filter(item => itemsIds.includes(String(item.id)))

    while (tbody.firstChild) {
        tbody.removeChild(tbody.lastChild);
    }

    if (itemsChosen.length > 0) {
        itemsChosen.map((item) => {
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
            tdPrecio.innerHTML = item.precio + '$'

            const tdButtons = document.createElement("td");

            const newButtonContainer = document.createElement("div");

            const newButtonRemove = document.createElement("button");
            newButtonRemove.onclick = (e) => {
                e.preventDefault()
                remove(resJson, items, item)
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
            newtr.appendChild(tdName);
            newtr.appendChild(tdDescription);
            newtr.appendChild(tdCantidad);
            newtr.appendChild(tdPrecio);
            newtr.appendChild(tdButtons);

            tbody.appendChild(newtr)
        })

        const newtr = document.createElement("tr");
        const tdEmpty1 = document.createElement("td");
        tdEmpty1.innerHTML = ""
        const tdEmpty2 = document.createElement("td");
        tdEmpty2.innerHTML = ""
        const tdEmpty3 = document.createElement("td");
        tdEmpty3.innerHTML = ""
        const tdEmpty4 = document.createElement("td");
        tdEmpty4.innerHTML = ""
        const tdTotal = document.createElement("td");
        tdTotal.innerHTML = "Total:"
        const tdTotalSum = document.createElement("td");
        tdTotalSum.innerHTML = itemsChosen.reduce((a, value) => a + value.precio, 0) + '$'

        newtr.appendChild(tdEmpty1);
        newtr.appendChild(tdEmpty2);
        newtr.appendChild(tdEmpty3);
        newtr.appendChild(tdTotal);
        newtr.appendChild(tdTotalSum);
        newtr.appendChild(tdEmpty4);

        tbody.appendChild(newtr)

        feather.replace()
        // $('#dataTable').DataTable({
        //         "pagingType": 'first_last_numbers'
        // })
    } else {
        const newtr = document.createElement("tr");
        const tdNoData = document.createElement("td");
        tdNoData.innerHTML = "Sin Productos"
        tdNoData.classList.add("nodata")
        tdNoData.setAttribute("colspan", "100%")

        newtr.appendChild(tdNoData);

        tbody.appendChild(newtr)

    }
    stopTableLoading()
}


submitButton.addEventListener("click", async (e) => {
    e.preventDefault()
    if (resCheckClient) {
        if (itemsChosen.length > 0) {
            if (confirm("Seguro que desea generar una factura con estos datos?")) {
                const res = await fetch('http://localhost:3000/factura-create', {
                    method: 'POST',
                    body: JSON.stringify({
                        idCliente: resCheckClient.id,
                        productoIds: itemsChosen.map(item => item.id)
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                resCheckClient = await res.json();


            }
        } else {
            const tdName = document.createElement("p");
            tdName.innerHTML = "Productos no elegidos"
            tdName.style = 'color:red;'

            productWarning.appendChild(tdName)
        }
    } else {
        const tdName = document.createElement("p");
        tdName.innerHTML = "Cliente no elegido"
        tdName.style = 'color:red;'

        clientData.appendChild(tdName)
    }
})