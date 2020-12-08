/*-----------------------------------------------------------
* Template Name    : ARAS | Bootstrap 4 personal, portfolio and resume
* Author           : Retrinagroup
* Version          : 1.0.0
* Created          : Dec 2019
* File Description : Main js file of the template
*------------------------------------------------------------
*/

// repeated variables
var $window = $(window);
var $root = $('html, body');

$(document).ready(function () {

    "use strict";

    colorScheme();
    menuToggler();
    smoothScroll();
    typedJS();
    sliderOwlCarousel();
    portfoliocarousel();
    testimonialsCarousel();
    popUpVideo();
    portfolioPopup();
    validateEmail();
    sendEmail();

});

$window.on('scroll', function () {
    returnToTop();
    skills();
    countup();
});

$window.on("load", (function() {
    $("#overlayer").delay(3000).fadeOut('slow');
    $(".loader").delay(4000).fadeOut('slow');
    portfolioIsotop();

}));

/*-----------------------------------------------------------------------------
                                   FUNCTIONS
-----------------------------------------------------------------------------*/
/*-------------------------
        Color Scheme
-------------------------*/
function colorScheme(){

    "use strict";

    $('.color-scheme').click(function() {
        $("body").toggleClass('aras-dark');
        $(this).children().toggleClass('lni-night lni-sun');
    });
}

/*-------------------------
    MENU TOGGLER
-------------------------*/
function menuToggler() {

    "use strict";

    $(".header-info-area").click(function(){
        $('.overlay-menu').toggleClass("show");
    });
}

/*-------------------------
        SMOOTH SCROLL
-------------------------*/
function smoothScroll(){

    "use strict";

    $('.overlay-nav li a, .hero-icon a').on('click', function(event) {
        var $anchor = $(this);
        $root.stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutQuart');
        event.preventDefault();
        $(".navbar-collapse").collapse('hide');
    });

}

/*-------------------------
        TYPED JS
-------------------------*/
function typedJS() {

    "use strict";

    var $element = $(".element");
    if($element.length){
        var options = {
            strings: $element.attr('data-elements').split(','),
            typeSpeed: 100,
            backDelay: 2000,
            backSpeed: 20,
            loop: true
        };
        var typed = new Typed(".element", options);
    }
}

/*-----------------------------
      SLIDER OWL CAROUSEL
------------------------------*/
function sliderOwlCarousel(){
    "use strict";

    $('.hero .owl-carousel').owlCarousel({
        loop:true,
        items: 1,
        nav: false,
        dots: false,
        autoplay:true,
        touchDrag: true,
        smartSpeed: 5000,
        animateOut: 'fadeOut',
        autoplayHoverPause: true,
    });
    $('#hero-slider').on("translate.owl.carousel", function(){
        setTimeout(function(){
            $('.hero-slide').removeClass("zoom");
        }, 1000)
    });
    $('#hero-slider').on("translated.owl.carousel", function(){
        $('.owl-item.active .hero-slide').addClass("zoom");
    });
}

/*-------------------------
            Skills
-------------------------*/
function skills() {

    "use strict";

    $('.skillbar').each(function () {
        $(this).find('.skillbar-bar').animate({
            width: $(this).attr('data-percent')
        }, 9000);
    });
}

/*-------------------------
     PORTFOLIO CAROUSEL
-------------------------*/
function  portfoliocarousel() {

    "use strict";

    $(".portfolio .owl-carousel").owlCarousel({
        loop: true,
        nav: true,
        autoplay: false,
        center: false,
        dots: true,
        mouseDrag: true,
        touchDrag: true,
        smartSpeed: 1500,
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 1,
            },
            900: {
                items: 2,
            },
            1200: {
                margin: 1,
                items: 3,
            },

        },
    });
}

/*-------------------------
     OWL CAROUSEL JS
-------------------------*/
function testimonialsCarousel() {

    "use strict";

    $("#testimonial .owl-carousel").owlCarousel({
        items: 1,
        autoplay: true,
        loop: true,
        dots: true,
        mouseDrag: true,
        touchDrag: true,
        smartSpeed: 700,
        autoplayHoverPause: true,
        nav: false,

    });
}

/*------------------------------
    POPUP VIDEO
------------------------------*/
function popUpVideo(){

    "use strict";

    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });
}

/*-------------------------
            Count up
  -------------------------*/
function countup() {

    "use strict";

    $('.timer').countTo();
    $('.count-number').removeClass('timer');
}

/*-------------------------
     PORTFOLIO POPUP JS
-------------------------*/
function portfolioPopup() {

        "use strict";

        if (('.portfolio-items').length > 0) {
            $('.portfolio-items').each(function() {
                $(this).magnificPopup({
                    delegate: '.js-zoom-gallery',
                    type: 'image',
                    gallery: {
                        enabled:true
                    }
                });
            });
        }
    }

/*-------------------------
        ISOTOPE JS
-------------------------*/
function portfolioIsotop() {

    "use strict";

    var $container = $('.portfolio-items');
    var $filter = $('#portfolio-filter');
    $container.isotope({
        filter: '*',
        layoutMode: 'masonry',
        animationOptions: {
            duration: 750,
            easing: 'linear'
        }
    });
    $filter.find('a').on("click",function() {
        var selector = $(this).attr('data-filter');
        $filter.find('a').removeClass('active');
        $(this).addClass('active');
        $container.isotope({
            filter: selector,
            animationOptions: {
                animationDuration: 750,
                easing: 'linear',
                queue: false,
            }
        });
        return false;
    });
}

/*--------------------------
       RETURN TO TOP
--------------------------*/
function returnToTop() {
    var $returnToTop = $('.return-to-top');
    if ($window.scrollTop() > 150) {
        $returnToTop.addClass('show');
    } else {
        $returnToTop.removeClass('show');
    }
    $returnToTop.click(function () {
        $root.stop().animate({
            scrollTop: 0
        }, 1500);
    });
}

/*-------------------------
     AJAX CONTACT FORM
-------------------------*/
function validateEmail(email) {

    "use strict";

    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
function sendEmail() {

    "use strict";

    var name     = $('#name').val();
    var email    = $('#email').val();
    var subject  = $('#subject').val();
    var comments = $('#comments').val();

    if(!name){
        $('#message').toast('show').addClass('bg-danger').removeClass('bg-success');
        $('.toast-body').html('Name is  required');
    } else if(!email){
        $('#message').toast('show').addClass('bg-danger').removeClass('bg-success');
        $('.toast-body').html('Email is  required');
    } else if(!validateEmail(email)){
        $('#message').toast('show').addClass('bg-danger').removeClass('bg-success');
        $('.toast-body').html('Email is not valid');
    } else if(!subject){
        $('#message').toast('show').addClass('bg-danger').removeClass('bg-success');
        $('.toast-body').html('Subject is  required');
    }else if(!comments){
        $('#message').toast('show').addClass('bg-danger').removeClass('bg-success');
        $('.toast-body').html('Comments is  required');
    }else {
        $.ajax({
            type: 'POST',
            data: $("#contactForm").serialize(),
            url:  "sendEmail.php",
            beforeSend: function() {
                $('#submit-btn').html('<span class="spinner-border spinner-border-sm"></span> Loading..');
            },
            success: function(data) {
                $('#submit-btn').html('Submit');
                var myObj = JSON.parse(data);
                if(myObj['status']=='Congratulation'){
                    $('#message').toast('show').addClass('bg-success').removeClass('bg-danger bg-warning');
                    $('.toast-body').html('<strong>'+ myObj['status'] +' : </strong> '+ myObj['message']);
                }else if(myObj['status']=='Error'){
                    $('#message').toast('show').addClass('bg-danger').removeClass('bg-success bg-warning');
                    $('.toast-body').html('<strong>'+ myObj['status'] +' : </strong> '+ myObj['message']);
                }else if(myObj['status']=='Warning'){
                    $('#message').toast('show').addClass('bg-warning').removeClass('bg-success bg-danger');
                    $('.toast-body').html('<strong>'+ myObj['status'] +' : </strong> '+ myObj['message']);
                }
            },
            error: function(xhr) {
                $('#submit-btn').html('Submit');
                $('#message').toast('show').addClass('bg-danger').removeClass('bg-success bg-warning');
                $('.toast-body').html('<strong> Error : </strong> Something went wrong, Please try again.');
            },
        });
    }
}
new WOW().init();