const $ = require("jquery");

$(window).bind('scroll', function () {
    let anchuraDeVentana = $(window).width();
    console.log(anchuraDeVentana);
    let num;
    if (anchuraDeVentana <= 1023) {
        num = 70;
    } else {
        num = 140;
    }

    if ($(window).scrollTop() > num) {
		$('#flecha').addClass('desplegar-flecha');
	} else {
		$('#flecha').removeClass('desplegar-flecha');
	}
});