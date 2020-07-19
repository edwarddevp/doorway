const selectDate = document.getElementById('selectDate');

let reportData = [];

const searchButton = document.getElementById('search')
const exportButton = document.getElementById('export')
const loadingExport = document.getElementById('loadingExport')
const submitDate = document.getElementById('submitDate')
const customDatesInputs = document.getElementById('customDatesInputs')
const initialCustomDate = document.getElementById('initialCustomDate')
const finalCustomDate = document.getElementById('finalCustomDate')

window.onload = function() {
    const today = new Date();
    const date =today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    submitDates(date,date)
  };

  selectDate.addEventListener('change',(e)=> {
    if (e.target.value === 'custom'){
        customDatesInputs.classList.remove('display-none')
        const today = new Date();
        const date =today.getFullYear()+'-'+(today.getMonth()+1 < 9? '0' + (today.getMonth()+1) :(today.getMonth()+1))+'-'+(today.getDate() < 9? '0' + (today.getDate()) :(today.getDate()));
        initialCustomDate.value = date
        finalCustomDate.value = date
    }else{
        customDatesInputs.classList.add('display-none')
    }
  })


submitDate.addEventListener('click', () => {
    if(selectDate.value === 'today'){
        const today = new Date();
        const date =today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        submitDates(date,date)
    }
    if (selectDate.value === 'month'){
        const today = new Date();
        const firstDay = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+1;
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        submitDates(firstDay,date)
    }
    if (selectDate.value === 'year'){
        const today = new Date();
        const FirstDay = today.getFullYear()+'-'+1+'-'+1;
        const date =today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        submitDates(FirstDay,date)

    }
    if (selectDate.value === 'custom'){
        customDatesInputs.classList.remove('display-none')
        submitDates(initialCustomDate.value,finalCustomDate.value)
    }
})

const submitDates = async (initialDate,finalDate) =>{
    fillTable(initialDate,finalDate)
    loadingExport.classList.remove('display-none')
    exportButton.href ='#'
    const res = await fetch('http://localhost:3000/report-export',{
        method: 'POST',
        body: JSON.stringify({initialDate,finalDate}), 
        headers:{
          'Content-Type': 'application/json'
        }})
    const resJson = await res.json();
    loadingExport.classList.add('display-none')
    exportButton.href =resJson
    exportButton.download = 'report.pdf';
}
