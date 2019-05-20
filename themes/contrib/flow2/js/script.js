(function ($, Drupal) {
	        $("#sidebarCollapse").click(function (e) {
          $('.nav-toggle').toggleClass('active');
        });


  $("li.expanded").hover(
  function() {
    $(this).children('ul').slideDown();
    $(this).addClass('in');
  }, function() {
   $(this).children('ul').slideUp();
   $(this).removeClass('in');
  }
);


  /**
   * Use this behavior as a template for custom Javascript.
   */


  Drupal.behaviors.exampleBehavior = {
    attach: function (context, settings) {


        $('.grid').masonry({
});

    }

  };
  $('#loader').show(0).delay(3000).hide(0);

  var btn = $('#eltd-back-to-top');

  $(window).scroll(function() {
    if ($(window).scrollTop() > 100) {
      btn.addClass('on');
    } else {
      btn.removeClass('on');
    }
  }); 
    btn.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop:0}, '100');
  });



$(window).resize(function(){

       if ($(window).width() >= 1024) {  
          $('ul.menu--main li').removeClass('dropdown expanded');
          $('ul.menu--main li ul').removeClass('dropdown-menu');
          $('ul.menu--main li a span').removeClass('caret');
       }     

});

})(jQuery, Drupal);