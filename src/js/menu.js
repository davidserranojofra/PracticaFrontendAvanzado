
let $ = require("jquery");

	$(document).ready(function(){
	    $("#nav-toggle").click(function(){
	        if ($("#abrir_cerrar").hasClass('abrir')){
	        	$("#abrir_cerrar").removeClass('abrir');
	        	$("#fueramenu").removeClass('fueramenu');
	        	$("#nav-toggle").removeClass('is-active');
	        } else{
	        	$("#abrir_cerrar").addClass('abrir');
	        	$("#fueramenu").addClass('fueramenu');
	        	$("#nav-toggle").addClass('is-active');
	        }
	    });
	    
	    // si se hace clic en cualquier parte de la pantalla se cierra menu
	    $("#fueramenu").click(function(){
	        $("#abrir_cerrar").removeClass('abrir');
	       	$("#fueramenu").removeClass('fueramenu');
	       	$("#nav-toggle").removeClass('is-active');
	    });
	    
	    //al hacer clic en boton menu si esta acticvado se cierra menu 
	    $(".boton_menu").click(function(){
	        $("#abrir_cerrar").removeClass('abrir');
	       	$("#fueramenu").removeClass('fueramenu');
	       	$("#nav-toggle").removeClass('is-active');
	    });
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