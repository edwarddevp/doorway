/* globals Chart:false, feather:false */

(function () {
  'use strict'

  feather.replace()

<<<<<<< HEAD
  // Graphs
  var ctx = document.getElementById('myChart')
  // eslint-disable-next-line no-unused-vars
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [
        'Domingo',
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado'
      ],
      datasets: [{
        data: [
          15339,
          21345,
          18483,
          24003,
          23489,
          24092,
          12034
        ],
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: '#007bff',
        borderWidth: 4,
        pointBackgroundColor: '#007bff'
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      },
      legend: {
        display: false
      }
    }
  })
=======
  // // Graphs
  // var ctx = document.getElementById('myChart')
  // // eslint-disable-next-line no-unused-vars
  // var myChart = new Chart(ctx, {
  //   type: 'line',
  //   data: {
  //     labels: [
  //       'Sunday',
  //       'Monday',
  //       'Tuesday',
  //       'Wednesday',
  //       'Thursday',
  //       'Friday',
  //       'Saturday'
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
>>>>>>> 4c74ad5e3671283985da945d9edb04d3364bc78f
}())
