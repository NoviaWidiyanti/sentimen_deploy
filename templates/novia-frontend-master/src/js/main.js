// Range Slider at Homepage
var rangeSlider = function(){
    var slider = $('.range-slider'),
        range = $('.range-slider__range'),
        value = $('.range-slider__value')
        
    slider.each(function(){
        value.each(function(){
        var value = $(this).prev().attr('value')
        $(this).html(value)
        });

        range.on('input', function(){
        $(this).next(value).html(this.value)
        })
    })
}
rangeSlider()

// Reset Button
$('input.input-search').keyup(function(){
    if($.trim(this.value).length > 0)
        $('.btn-reset').removeClass('btn-hide')
     else
        $('.btn-reset').addClass('btn-hide')
});

$('.btn-reset').click(function() {
    $(this).addClass('btn-hide');
});

// Enable Dropdown for Result
$(function() {
    // Dropdown toggle
    $('.dropdown-toggle').click(function(){
      $(this).next('.dropdown-list').toggle();
    });
    
    $(document).click(function(e) {
      var target = e.target;
      if (!$(target).is('.dropdown-toggle') && !$(target).parents().is('.dropdown-toggle')) {
        $('.dropdown-list').hide();
      }
    });    
});

// Line chart for Insight
$(function() {
    var ctx = document.getElementById('lineChart').getContext('2d');
        
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['12', '13', '14', '15', '16', '17', '18', '19', '20', '21'],
            datasets: [{
                label: 'Total Stories',
                data: [4,3,4,4,6,6,9,8,7,6],
                borderColor: 'rgba(54, 161, 235, 1)',
                backgroundColor: 'rgba(54, 161, 235, 1)',
                fill: false,
                borderWidth: 4,
                pointRadius: 2,
            }, {
                label: 'Positive',
                data: [2,5,7,4,5,8,5,4,3,5],
                borderColor: 'rgba(75, 193, 192, 1)',
                backgroundColor: 'rgba(75, 193, 192, 1)',
                fill: false,
                borderWidth: 4,
                pointRadius: 2,
            }, {
                label: 'Negative',
                data: [8,9,7,5,2,1,3,5,7,8],
                borderColor: 'rgba(255, 98, 131, 1)',
                backgroundColor: 'rgba(255, 98, 131, 1)',
                fill: false,
                borderWidth: 4,
                pointRadius: 2,
            }, {
                label: 'Netral',
                data: [6,7,8,7,6,5,6,7,8,9],
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
})

// Pie Chart for Insight
$(function() {
    var ctx = document.getElementById('pieChart').getContext('2d');
        
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Total Stories', 'Positive'],
            datasets: [{
                label: 'Total Stories',
                data: [8,6],
                backgroundColor: ['rgba(54, 161, 235, 1)', 'rgba(75, 193, 192, 1)'],
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
})

// Word Cloud using JQclod Jquery plugin
var word_list = [
    {text: "teachers", weight: 50, html: {"data-tooltip": "50"}},
    {text: "classes", weight: 44, html: {"data-tooltip": "44"}},
    {text: "exercises", weight: 35, html: {"data-tooltip": "35"}},
    {text: "videos", weight: 34, html: {"data-tooltip": "34"}},
    {text: "course", weight: 34, html: {"data-tooltip": "34"}},
    {text: "online", weight: 31, html: {"data-tooltip": "31"}},
    {text: "quality", weight: 29, html: {"data-tooltip": "29"}},
    {text: "improve", weight: 29, html: {"data-tooltip": "29"}},
    {text: "site", weight: 28, html: {"data-tooltip": "28"}},
    {text: "sat", weight: 28, html: {"data-tooltip": "28"}},
    {text: "lessons", weight: 28, html: {"data-tooltip": "28"}},
    {text: "acme", weight: 28, html: {"data-tooltip": "28"}},
    {text: "live", weight: 27, html: {"data-tooltip": "27"}},
    {text: "content", weight: 27, html: {"data-tooltip": "27"}},
    {text: "good", weight: 26, html: {"data-tooltip": "26"}},
    {text: "time", weight: 26, html: {"data-tooltip": "26"}},
    {text: "excellent", weight: 26, html: {"data-tooltip": "26"}},
    {text: "material", weight: 26, html: {"data-tooltip": "26"}},
    {text: "well", weight: 25, html: {"data-tooltip": "25"}},
    {text: "teachers", weight: 50, html: {"data-tooltip": "50"}},
    {text: "classes", weight: 44, html: {"data-tooltip": "44"}},
    {text: "exercises", weight: 35, html: {"data-tooltip": "35"}},
    {text: "videos", weight: 34, html: {"data-tooltip": "34"}},
    {text: "course", weight: 34, html: {"data-tooltip": "34"}},
    {text: "online", weight: 31, html: {"data-tooltip": "31"}},
    {text: "quality", weight: 29, html: {"data-tooltip": "29"}},
    {text: "improve", weight: 29, html: {"data-tooltip": "29"}},
    {text: "site", weight: 28, html: {"data-tooltip": "28"}},
    {text: "sat", weight: 28, html: {"data-tooltip": "28"}},
    {text: "lessons", weight: 28, html: {"data-tooltip": "28"}},
    {text: "acme", weight: 28, html: {"data-tooltip": "28"}},
    {text: "live", weight: 27, html: {"data-tooltip": "27"}},
    {text: "content", weight: 27, html: {"data-tooltip": "27"}},
    {text: "good", weight: 26, html: {"data-tooltip": "26"}},
    {text: "time", weight: 26, html: {"data-tooltip": "26"}},
    {text: "excellent", weight: 26, html: {"data-tooltip": "26"}},
    {text: "material", weight: 26, html: {"data-tooltip": "26"}},
    {text: "well", weight: 25, html: {"data-tooltip": "25"}}
];

$(function() {
    $("#word_cloud").jQCloud(word_list, 
    {
        shape: "rectangular",
        autoResize: true
    });
});