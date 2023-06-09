









(function ($) {
    'use strict';

    var imJs = {
        m: function (e) {
            imJs.d();
            imJs.methods();
        },
        d: function (e) {
            this._window = $(window),
            this._document = $(document),
            this._body = $('body'),
            this._html = $('html')

        },

        methods: function (e) {
            imJs.featherAtcivation();
            imJs.backToTopInit();
            imJs.smothScroll();
            imJs.stickyAdjust();
            imJs.wowActive();
            imJs.awsActivation();
        },


        
        wowActive: function () {
            new WOW().init();
        },

        smothScroll: function () {
            $(document).on('click', '.smoth-animation', function (event) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: $($.attr(this, 'href')).offset().top - 50
                }, 300);
            });
        },
        // two scroll spy
        smothScroll_Two: function () {
            $(document).on('click', '.smoth-animation-two', function (event) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: $($.attr(this, 'href')).offset().top - 0
                }, 300);
            });
        },


        stickyAdjust: function (e) {
            // Sticky Top Adjust..,
            $('.rbt-sticky-top-adjust').css({
                top: 120
            });

            $('.rbt-sticky-top-adjust-two').css({
                top: 200
            });
            $('.rbt-sticky-top-adjust-three').css({
                top: 25
            });
        },


        featherAtcivation: function () {
            feather.replace()
        },

        backToTopInit: function () {
            // declare variable
            var scrollTop = $('.backto-top');
            $(window).scroll(function () {
                // declare variable
                var topPos = $(this).scrollTop();
                // if user scrolls down - show scroll to top button
                if (topPos > 100) {
                    $(scrollTop).css('opacity', '1');

                } else {
                    $(scrollTop).css('opacity', '0');
                }
            });
            
            //Click event to scroll to top
            $(scrollTop).on('click', function () {
                $('html, body').animate({
                    scrollTop: 0,
                    easingType: 'linear',
                }, 500);
                return false;
            });

        },

        awsActivation:function(e){
            AOS.init();
        },

    }
    imJs.m();


})(jQuery, window)





//cambiar inactive por active luego de hacer click en  next-level-modal
$("#next-level-modal").click(function () {
    // Extraer número del nivel actual
    var currentLevel = $(".active").attr("data-target").match(/\d+/)[0];

    console.log("Estas en el nivel " + currentLevel)

    // Buscar elemento con id "ModalCenter-x+1" y cambiar la clase "inactive" por "active"
    var nextLevel = parseInt(currentLevel) + 1;
    $("#ModalCenter-" + nextLevel).removeClass("inactive");
    $("#ModalCenter-" + nextLevel).addClass("active");
    console.log("Pasaste al nivel " + nextLevel)
});


//centrar destino de fragmento de ancla
$(".lvl-s").click(function (event) {
    event.preventDefault();
    var id = $(this).attr("href");
    var destinoAncla = $(id);
    var posicionAncla = destinoAncla.offset().top;

    $("html, body").animate({
        scrollTop: posicionAncla - ($(window).height() * 0.18),
    }, "smooth");
});
