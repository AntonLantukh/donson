$(document).ready(function(){
  // Anchor at link
   $(".promo__button").on("click", function (event) {
       event.preventDefault();
       var id  = $(this).attr('href');
       var topHeight = $(id).offset().top;
       $('body,html').animate({scrollTop: topHeight}, 800);
   });

   // Float menu
   $(window).on('scroll', function (event) {
       event.preventDefault();
       var header = $('.header-bottom');
       var topHeight = $(this).scrollTop();
       var elementOffset = 89;
       if (elementOffset <= topHeight) {
         header.addClass('header-bottom--fixed');
       } else {
         header.removeClass('header-bottom--fixed');
       }
   });
});
