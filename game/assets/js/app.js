(function($){
  "use strict";

  $(window).on('load', function(){

     //preloader
     $(".preloader").delay(300).animate({
        "opacity" : "0"
        }, 500, function() {
        $(".preloader").css("display","none");
    });

    // menu options custom affix
    var fixed_top = $(".header");
    $(window).on("scroll", function(){
        if( $(window).scrollTop() > 50){  
            fixed_top.addClass("animated fadeInDown menu-fixed");
        }
        else{
            fixed_top.removeClass("animated fadeInDown menu-fixed");
        }
    });

    // mobile menu js
    $(".navbar-collapse>ul>li>a, .navbar-collapse ul.sub-menu>li>a").on("click", function() {
      let element = $(this).parent("li");
      if (element.hasClass("open")) {
        element.removeClass("open");
        element.find("li").removeClass("open");
      }
      else {
        element.addClass("open");
        element.siblings("li").removeClass("open");
        element.siblings("li").find("li").removeClass("open");
      }
    });

    new WOW().init();
      
    // lightcase plugin init
    $('a[data-rel^=lightcase]').lightcase();

    let img = $('.bg_img');
    img.css('background-image', function () {
      let bg = ('url(' + $(this).data('background') + ')');
      return bg;
    });

    $('.nice-select').niceSelect();

    $(".hero").on('mousemove',function(e) {
      parallaxIt(e, ".el-1", -45);
      parallaxIt(e, ".el-2", -25);
      parallaxIt(e, ".el-3", -50);
      parallaxIt(e, ".el-4", -35);
      parallaxIt(e, ".el-5", -60);
      parallaxIt(e, ".el-6", -40);
      parallaxIt(e, ".el-7", -45);
      parallaxIt(e, ".el-8", -35);
      parallaxIt(e, ".el-9", -50);
      parallaxIt(e, ".el-10", -35);
      parallaxIt(e, ".el-11", -40);
    });
    
    function parallaxIt(e, target, movement) {
      var $this = $(".hero");
      var relX = e.pageX - $this.offset().left;
      var relY = e.pageY - $this.offset().top;
    
      TweenMax.to(target, 1, {
        x: (relX - $this.width() / 2) / $this.width() * movement,
        y: (relY - $this.height() / 2) / $this.height() * movement
      });
    }

    $(".inner-hero").on('mousemove',function(e) {
      parallaxIt2(e, ".el-1", -15);
      parallaxIt2(e, ".el-2", -25);
      parallaxIt2(e, ".el-3", -18);
      parallaxIt2(e, ".el-4", -10);
      parallaxIt2(e, ".el-5", -15);
      parallaxIt2(e, ".el-6", -25);
    });
    
    function parallaxIt2(e, target, movement) {
      var $this = $(".inner-hero");
      var relX = e.pageX - $this.offset().left;
      var relY = e.pageY - $this.offset().top;
    
      TweenMax.to(target, 1, {
        x: (relX - $this.width() / 2) / $this.width() * movement,
        y: (relY - $this.height() / 2) / $this.height() * movement
      });
    }

  $("[data-paroller-factor]").paroller();

  // trailerSlider
  function trailerSlider() {
    var BasicSlider = $('.trailer-slider');
    BasicSlider.on('init', function (e, slick) {
      var $firstAnimatingElements = $('.single-slide:first-child').find('[data-animation]');
      doAnimations($firstAnimatingElements);
    });
    BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
      var $animatingElements = $('.single-slide[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
      doAnimations($animatingElements);
    });
    BasicSlider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.content-slider',
      // autoplay: true
    });

    function doAnimations(elements) {
      var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      elements.each(function () {
        var $this = $(this);
        var $animationDelay = $this.data('delay');
        var $animationType = 'animated ' + $this.data('animation');
        $this.css({
          'animation-delay': $animationDelay,
          '-webkit-animation-delay': $animationDelay
        });
        $this.addClass($animationType).one(animationEndEvents, function () {
          $this.removeClass($animationType);
        });
      });
    }
  }
  trailerSlider();
  $('.content-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.trailer-slider',
    dots: false,
    arrows: true,
    prevArrow: $('.trailernav-prev'),
    nextArrow: $('.trailernav-next')
  });


function testiSlider() {
  var BasicSlider = $('.testimonial-slider');
  BasicSlider.on('init', function (e, slick) {
    var $firstAnimatingElements = $('.testimonial-single:first-child').find('[data-animation]');
    doAnimations($firstAnimatingElements);
  });
  BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
    var $animatingElements = $('.testimonial-single[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
    doAnimations($animatingElements);
  });
  BasicSlider.slick({
    autoplay: true,
    speed: 700,
    fade: true,
    arrows: true,
    dots: false,
    prevArrow: '<div class="prev"><img src="assets/images/elements/prev-btn.png"></div>',
    nextArrow: '<div class="next"><img src="assets/images/elements/next-btn.png"></div>',
  });

  function doAnimations(elements) {
    var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    elements.each(function () {
      var $this = $(this);
      var $animationDelay = $this.data('delay');
      var $animationType = 'animated ' + $this.data('animation');
      $this.css({
        'animation-delay': $animationDelay,
        '-webkit-animation-delay': $animationDelay
      });
      $this.addClass($animationType).one(animationEndEvents, function () {
        $this.removeClass($animationType);
      });
    });
  }
}
testiSlider();

  // $('.blog-slider').slick({
  //   autoplay: false,
  //   slidesToShow: 4,
  //   slidesToScroll: 1,
  //   infinite: false,
  //   speed: 700,
  //   arrows: true,
  //   dots: false,
  //   prevArrow: '<div class="prev"><img src="assets/images/elements/prev-btn.png"></div>',
  //   nextArrow: '<div class="next"><img src="assets/images/elements/next-btn.png"></div>',
  //   responsive: [
  //     {
  //       breakpoint: 1200,
  //       settings: {
  //         slidesToShow: 4
  //       }
  //     },
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         slidesToShow: 4
  //       }
  //     }
  //   ]
  // });

  // $('body').on('DOMSubtreeModified','.blog-slider',function(){
  //   console.log('### CHANGE DETECTED');
    
  // })

  // small-post-slider 
  $('.small-post-slider').slick({
    speed: 700,
    arrows: true,
    dots: false,
    nextArrow: '<div class="next"><i class="las la-angle-right"></i></div>',
    prevArrow: '<div class="prev"><i class="las la-angle-left"></i></div>',
  });

    // single-game-slider
    $('.single-game-slider').slick({
      autoplay: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      infinite: false,
      speed: 700,
      arrows: true,
      dots: false,
      prevArrow: '<div class="prev"><img src="assets/images/elements/prev-btn.png"></div>',
      nextArrow: '<div class="next"><img src="assets/images/elements/next-btn.png"></div>',
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    });
  });

  $(window).on("scroll", function() {
    if ($(this).scrollTop() > 200) {
        $(".scroll-to-top").fadeIn(200);
    } else {
        $(".scroll-to-top").fadeOut(200);
    }
  });
  
  // Animate the scroll to top
  $(".scroll-to-top").on("click", function(event) {
    event.preventDefault();
    $("html, body").animate({scrollTop: 0}, 300);
  });

})(jQuery);