(function($) { "use strict";

    //Hero parallax & fade on scroll	 
    function scrollBanner() {
        $(document).on('scroll', function(){
        var scrollPos = $(this).scrollTop();
            $('.parallax-fade-hero').css({
                'top' : (scrollPos/2)+'px',
                'opacity' : 1-(scrollPos/700)
            });
            $('.parallax-fade-hero-2').css({
                'top' : (scrollPos/1)+'px',
                'opacity' : 1-(scrollPos/300)
            });
            $('.parallax-hero').css({
                'top' : (scrollPos/2.2)+'px'
            });
            $('.parallax-fade-hero-short').css({
                'top' : (scrollPos/2)+'px',
                'opacity' : 1-(scrollPos/350)
            });
            $('.fade-hero').css({
                'opacity' : 1-(scrollPos/700)
            });
            $('.fade-hero-short').css({
                'opacity' : 1-(scrollPos/350)
            });
            $('.fade-hero-shorter').css({
                'opacity' : 1-(scrollPos/150)
            });
        });  
        if ($(window).width() > 1200) {
            $(document).on('scroll', function(){
            var scrollPos = $(this).scrollTop();
                $('.parallax-hero-1200').css({
                    'top' : (scrollPos/2)+'px',
                    'opacity' : 1-(scrollPos/700)
                });
            }); 
        }  
    }
    scrollBanner();
             
	/* Parallax effect */
	if ($(window).width() > 1199) {
		$().enllax();
	}  
    
    //Loading page animation

	$(".animsition").animsition({
		inClass: 'fade-in-down-sm',
		outClass: 'fade-out-down-sm',
		inDuration: 400,
		outDuration: 400,
		linkElement: '.animsition-link',
		// e.g. linkElement   :   'a:not([target="_blank"]):not([href^=#])'
		loading: true,
		loadingParentElement: 'body', //animsition wrapper element
		loadingClass: 'animsition-loading',
		unSupportCss: ['animation-duration',
		  '-webkit-animation-duration',
		  '-o-animation-duration'
		],
		//"unSupportCss" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
		//The default setting is to disable the "animsition" in a browser that does not support "animation-duration".

		overlay: false,

		overlayClass: 'animsition-overlay-slide',
		overlayParentElement: 'body'
	});

    /* Scroll Animation */
	window.scrollReveal = new scrollReveal();


})(jQuery); 