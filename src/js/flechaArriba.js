const $ = require("jquery");

//miro cuando se hace scroll en la pantalla
$(window).bind('scroll', function () {
    let anchuraDeVentana = $(window).width();
    let num;

    //compruebo anchura de ventana para que se muestre justo perder el título
    if (anchuraDeVentana <= 1023) {
        num = 70;
    } else {
        num = 140;
    }
    //muestro/oculto pestaña ir arriba
    if ($(window).scrollTop() > num) {
		$('#flecha').addClass('desplegar-flecha');
	} else {
		$('#flecha').removeClass('desplegar-flecha');
	}
});

//Animacion Smooth Scroll para ir arriba
$('#flecha').on("click", function() {
    let irArriba = $(this).attr('href');

    $('body, html').animate({scrollTop: $(irArriba).offset().top - 47}, 450);
      console.log(irArriba);
});