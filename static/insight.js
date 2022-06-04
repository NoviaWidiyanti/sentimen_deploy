//LineChart

$(function() {

     $.ajax({
   url: "/linechart",
   type: "get",
   data: {vals: ''},
   success: function(data) {
    console.log(data)
    var data = JSON.parse(data)
     data_positive = data['Positif '];
     console.log(data_positive)
     data_negative = data['Negatif '];
     console.log(data_negative)
     data_netral = data['Netral '];
     console.log(data_netral)

     data_tanggal = data['tanggal']
     console.log(data_tanggal)

     list_tanggal = data_tanggal.map(function(str){
        // return Date.parse(str)
        console.log(str);
        newStr = str.split(" ")[0];
        console.log(newStr);
        splitLagi = newStr.split(/\D+/);
        console.log(splitLagi);
        return splitLagi[2] + "-" + splitLagi[1] + "-" +splitLagi[0]
        // tanggal_baru = Date(Date.UTC(parseInt(splitLagi[0]), parseInt(splitLagi[1]) - 1, parseInt(splitLagi[2])));
        // console.log(tanggal_baru);
        // months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        // formatted_date = tanggal_baru.getDate() + " " + months[tanggal_baru.getMonth()] + " " + tanggal_baru.getFullYear();
        // return formatted_date;
     })

     console.log(list_tanggal)

     // var list_tanggal = [];
     // for (var tanggal in data_positive) {
     //    if (data_positive.hasOwnProperty(tanggal)) {
     //        list_tanggal.push(tanggal)
     //    }
     // }//kurung for
     // console.log(list_tanggal)

 var ctx = document.getElementById('lineChart').getContext('2d');
        
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: list_tanggal,
            datasets: [ {
                label: 'Positive',
                data: data_positive,
                borderColor: 'rgba(75, 193, 192, 1)',
                backgroundColor: 'rgba(75, 193, 192, 1)',
                fill: false,
                borderWidth: 4,
                pointRadius: 2,
            }, {
                label: 'Negative',
                data: data_negative,
                borderColor: 'rgba(255, 98, 131, 1)',
                backgroundColor: 'rgba(255, 98, 131, 1)',
                fill: false,
                borderWidth: 4,
                pointRadius: 2,
            }, {
                label: 'Netral',
                data: data_netral,
                borderColor: 'rgba(255, 205, 86, 1)',
                backgroundColor: 'rgba(255, 205, 86, 1)',
                fill: false,
                borderWidth: 4,
                pointRadius: 2,
            }
        
        ]
        }, 
        options: {
            scales: {
                yAxes: [{
                    display: true,
                }],
                xAxes: [{
                    display: true,
                }],
            },
            legend: {
              display: true,
              labels: {
                fontColor: 'rgba(0,0,0,1)'
              },
              position: 'bottom'
            },
            layout: {
              padding: {
                top: 5,
                bottom: 5,
              }
            },
        }
    })
    },//kurung success

 }); //kurung ajax
   
})

// Pie Chart for Insight
$(function() {
    $.ajax({
           url: "/piechart",
   type: "get",
   data: {vals: ''},
   success: function(data) {
    console.log(data)
    var data = JSON.parse(data)
     data_positive = data['Positif '];
     console.log(data_positive)
     data_negative = data['Negatif '];
     console.log(data_negative)
     data_netral = data['Netral '];
     console.log(data_netral)
    var ctx = document.getElementById('pieChart').getContext('2d');
        
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Positive','Negative','Neutral'],
            datasets: [{
                label: 'Total Stories',
                data: [data_positive,data_negative,data_netral],
                backgroundColor: ['rgba(75, 193, 192, 1)','rgba(255, 98, 131, 1)', 'rgba(255, 205, 86, 1)'],
                fill: false,
                borderWidth: 1,
                pointRadius: 2,
            },
        ]
        }, 
        options: {
            scales: {
                yAxes: [{
                    display: false,
                }],
                xAxes: [{
                    display: false,
                }],
            },
            legend: {
              display: true,
              labels: {
                fontColor: 'rgba(0,0,0,1)'
              },
              position: 'bottom'
            },
            layout: {
              padding: {
                top: 5,
                bottom: 5,
              }
            },
        }
    })
    },//kurung success
    }); //kurung ajax
})

// Word Cloud using JQclod Jquery plugin
// var word_list = [
//     {text: "teachers", weight: 50, html: {"data-tooltip": "50"}},
//     {text: "classes", weight: 44, html: {"data-tooltip": "44"}},
//     {text: "exercises", weight: 35, html: {"data-tooltip": "35"}},
//     {text: "videos", weight: 34, html: {"data-tooltip": "34"}},
//     {text: "course", weight: 34, html: {"data-tooltip": "34"}},
//     {text: "online", weight: 31, html: {"data-tooltip": "31"}},
//     {text: "quality", weight: 29, html: {"data-tooltip": "29"}},
//     {text: "improve", weight: 29, html: {"data-tooltip": "29"}},
//     {text: "site", weight: 28, html: {"data-tooltip": "28"}},
//     {text: "sat", weight: 28, html: {"data-tooltip": "28"}},
//     {text: "lessons", weight: 28, html: {"data-tooltip": "28"}},
//     {text: "acme", weight: 28, html: {"data-tooltip": "28"}},
//     {text: "live", weight: 27, html: {"data-tooltip": "27"}},
//     {text: "content", weight: 27, html: {"data-tooltip": "27"}},
//     {text: "good", weight: 26, html: {"data-tooltip": "26"}},
//     {text: "time", weight: 26, html: {"data-tooltip": "26"}},
//     {text: "excellent", weight: 26, html: {"data-tooltip": "26"}},
//     {text: "material", weight: 26, html: {"data-tooltip": "26"}},
//     {text: "well", weight: 25, html: {"data-tooltip": "25"}},
//     {text: "teachers", weight: 50, html: {"data-tooltip": "50"}},
//     {text: "classes", weight: 44, html: {"data-tooltip": "44"}},
//     {text: "exercises", weight: 35, html: {"data-tooltip": "35"}},
//     {text: "videos", weight: 34, html: {"data-tooltip": "34"}},
//     {text: "course", weight: 34, html: {"data-tooltip": "34"}},
//     {text: "online", weight: 31, html: {"data-tooltip": "31"}},
//     {text: "quality", weight: 29, html: {"data-tooltip": "29"}},
//     {text: "improve", weight: 29, html: {"data-tooltip": "29"}},
//     {text: "site", weight: 28, html: {"data-tooltip": "28"}},
//     {text: "sat", weight: 28, html: {"data-tooltip": "28"}},
//     {text: "lessons", weight: 28, html: {"data-tooltip": "28"}},
//     {text: "acme", weight: 28, html: {"data-tooltip": "28"}},
//     {text: "live", weight: 27, html: {"data-tooltip": "27"}},
//     {text: "content", weight: 27, html: {"data-tooltip": "27"}},
//     {text: "good", weight: 26, html: {"data-tooltip": "26"}},
//     {text: "time", weight: 26, html: {"data-tooltip": "26"}},
//     {text: "excellent", weight: 26, html: {"data-tooltip": "26"}},
//     {text: "material", weight: 26, html: {"data-tooltip": "26"}},
//     {text: "well", weight: 25, html: {"data-tooltip": "25"}}
// ];

// $(function() {
//     $("#word_cloud").jQCloud(word_list, 
//     {
//         shape: "rectangular",
//         autoResize: true
//     });
// });

$(document).ready(function () {
    // on page load this will fetch data from our flask-app asynchronously
   $.ajax({url: '/insight_data', success: function (data) {
       // returned data is in string format we have to convert it back into json format
       var words_data = $.parseJSON(data);
       // we will build a word cloud into our div with id=word_cloud
       // we have to specify width and height of the word
       $('#word_cloud').jQCloud(words_data, {
           shape: "rectangular",
           autoResize: true
       });
   }});
});
