const $ = require("jquery");

	$(document).ready(function(){
	    $("#nav-toggle").click(function(){
	        if ($("#abrir_cerrar").hasClass('abrir')){
	        	quitaClass();
	        } else{
	        	añadeClass();
	        }
	    });
	    
	    // si se hace clic en cualquier parte de la pantalla se cierra menu
	    $("#fueramenu").click(function(){
	        quitaClass();
	    });
	    
	    //al hacer clic en boton menu si esta activado se cierra menu 
	    $(".boton_menu").click(function(){
	        quitaClass();
		});
		
		//mostrar y ocultar input buscar en pantallas pequeñas
		$(".buscar-icono").on("click", function() {
			$("#busqueda").toggle("fast", function() {
				let anchoVentana = $(window).width();
				if (anchoVentana <= 666) {
					if ($(".m-bottom").length) {
						$(".header-titulo-menu-container").removeClass("m-bottom");
					} else {
						$(".header-titulo-menu-container").addClass("m-bottom");
					}
				}
				
				$("#busqueda").removeClass("none");
			});
		});
	});

	function añadeClass() {
		$("#abrir_cerrar").addClass('abrir');
		$("#fueramenu").addClass('fueramenu');
		$("#nav-toggle").addClass('is-active');
	}

	function quitaClass() {
		$("#abrir_cerrar").removeClass('abrir');
		$("#fueramenu").removeClass('fueramenu');
		$("#nav-toggle").removeClass('is-active');
	}

	//Smooth Scrooll
	$('.ancla').on("click", function(){
		let elementosMenu = document.getElementsByClassName("ancla");
		 if (!elementosMenu.length - 1){
			 let jumpId = $(this).attr('href');
			 $('body, html').animate({scrollTop: $(jumpId).offset().top}, 450);
		 }
	 });

//-- Movimiento de menu hamburguesa -->
		var forEach=function(t,o,r){if("[object Object]"===Object.prototype.toString.call(t))for(var c in t)Object.prototype.hasOwnProperty.call(t,c)&&o.call(r,t[c],c,t);else for(var e=0,l=t.length;l>e;e++)o.call(r,t[e],e,t)};

    	var hamburgers = document.querySelectorAll(".hamburger");
    	if (hamburgers.length > 0) {
      		forEach(hamburgers, function(hamburger) {
        		hamburger.addEventListener("click", function() {
          			this.classList.toggle("is-active");
        			}, false);
      		});
    	}