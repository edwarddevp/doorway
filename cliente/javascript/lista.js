const clientes = [
    {
        id:'1',
        name:'lorem',
        email:'lorem@gmail.com',
        joined:'14/05/2000'
    },
    {
        id:'2',
        name:'lorem2',
        email:'lorem@gmail.com',
        joined:'14/05/2000'
    },
    {
        id:'3',
        name:'lorem',
        email:'lorem@gmail.com',
        joined:'14/05/2000'
    },
    {
        id:'4',
        name:'lorem',
        email:'lorem@gmail.com',
        joined:'14/05/2000'
    },
    {
        id:'5',
        name:'lorem',
        email:'lorem@gmail.com',
        joined:'14/05/2000'
    },
    {
        id:'6',
        name:'lorem',
        email:'lorem@gmail.com',
        joined:'14/05/2000'
    },
    {
        id:'7',
        name:'lorem',
        email:'lorem@gmail.com',
        joined:'14/05/2000'
    },
    {
        id:'8',
        name:'lorem',
        email:'lorem@gmail.com',
        joined:'14/05/2000'
    },
    {
        id:'9',
        name:'lorem',
        email:'lorem@gmail.com',
        joined:'14/05/2000'
    },
    {
        id:'10',
        name:'lorem',
        email:'lorem@gmail.com',
        joined:'14/05/2000'
    },
    {
        id:'11',
        name:'lorem',
        email:'lorem@gmail.com',
        joined:'14/05/2000'
    },
]

const dataTable = document.getElementById('dataTable');
const dataTableContainer = document.getElementById('dataTableContainer');
const tbody = document.getElementById('tbody');
const loading = document.getElementById('loading');

setTimeout(()=>{
    fillTable()
    stopTableLoading()
},2000)


const stopTableLoading = () => {
    dataTableContainer.classList.toggle('display-none')
    loading.classList.toggle('display-none')
}

const fillTable = () => {
    clientes.map((cliente)=>{
        const newtr = document.createElement("tr"); 
        const tdId = document.createElement("td"); 
        tdId.innerHTML = cliente.id
        const tdName = document.createElement("td"); 
        tdName.innerHTML = cliente.name
        const tdEmail = document.createElement("td"); 
        tdEmail.innerHTML = cliente.email
        const tdJoined = document.createElement("td"); 
        tdJoined.innerHTML = cliente.joined
        
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
        newButtonRemove.onclick = () => alert(cliente.name);
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
        newtr.appendChild(tdEmail);
        newtr.appendChild(tdJoined);
        newtr.appendChild(tdButtons);

        tbody.appendChild(newtr)
    })
    feather.replace()
    $('#dataTable').DataTable({
            "pagingType": 'first_last_numbers'
    })
}

const sendQueryId = (id) => {
    const url = '/cliente/editar/?id=' + id;
    window.location.replace(url);
}