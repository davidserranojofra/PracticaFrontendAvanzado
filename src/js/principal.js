window.$ = window.jQuery = require("jquery");

$.ajax ({
	url: "/comentarios/",
	success: comentarios => {

		//Hay canciones
		if (comentarios.lenght == 0) {
			$(".comentarios").removeClass("loading").addClass("empty");
		} else {
			let html = "";

			for (let coment of comentarios) {
				html += `<div class="mostrar-comentarios-enviados">
							<div class="datos-persona">
								<h5>${coment.nombre} ${coment.apellidos}</h5>
								<br>
								<p>${coment.email}</p>
								<br>
								<p>${coment.fecha}</p>
							</div>
							<div class="comentario-persona">${coment.comentario}</div>
						</div>`;
			}

			$(".comentarios .ui-status.ideal .coments").html(html);

			$(".comentarios").removeClass("loading").addClass("ideal");
		}
	},
	error: error => {
		$(".comentarios").removeClass("loading").addClass("error");

		console.log("ERROR", error);
	}
});