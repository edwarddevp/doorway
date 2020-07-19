/* globals Chart:false, feather:false */
const signOut = document.getElementById('sign-out')

function createCookie(name, value, days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toUTCString();
  }
  else var expires = "";
  document.cookie = name + "=" + value + expires + "; path=/";
}

function eraseCookie(name) {
  createCookie(name, "", -1);
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}


(function () {
  'use strict'

  feather.replace()

  const cookie = readCookie("login_token_id");
  if (!cookie) {
    window.location.replace("/login");
  }

  signOut.addEventListener('click', (e) => {
    e.preventDefault()
    if (confirm('Seguro que quieres cerrar sesion?')) {
      eraseCookie("login_token_id")
      const checkCookie = readCookie("login_token_id");
      if (!checkCookie) {
        window.location.replace("/login");
      }
    }
  })
  // // Graphs
  // var ctx = document.getElementById('myChart')
  // // eslint-disable-next-line no-unused-vars
  // var myChart = new Chart(ctx, {
  //   type: 'line',
  //   data: {
  //     labels: [
  //       'Domingo',
  //       'Lunes',
  //       'Martes',
  //       'Miércoles',
  //       'Jueves',
  //       'Viernes',
  //       'Sábado'
  //     ],
  //     datasets: [{
  //       data: [
  //         15339,
  //         21345,
  //         18483,
  //         24003,
  //         23489,
  //         24092,
  //         12034
  //       ],
  //       lineTension: 0,
  //       backgroundColor: 'transparent',
  //       borderColor: '#007bff',
  //       borderWidth: 4,
  //       pointBackgroundColor: '#007bff'
  //     }]
  //   },
  //   options: {
  //     scales: {
  //       yAxes: [{
  //         ticks: {
  //           beginAtZero: false
  //         }
  //       }]
  //     },
  //     legend: {
  //       display: false
  //     }
  //   }
  // })
}())
