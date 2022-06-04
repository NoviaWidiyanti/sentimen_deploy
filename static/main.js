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


// Function for result one page
$(function() {           
    $('#insight').hide()

    $(".insight-button").click(function() { 
      $(".sort-by-button").hide()
      $(".insight-button").addClass('active')
      $(".result-button").removeClass('active')
      $('#result').fadeOut(300,() => {
        $('#insight').fadeIn(300)
      })
    })

    $(".result-button").click(function() { 
      $(".sort-by-button").show()
      $(".insight-button").removeClass('active')
      $(".result-button").addClass('active')
      $('#insight').fadeOut(300,() => {
        $('#result').fadeIn(300)
      })
    })
})

