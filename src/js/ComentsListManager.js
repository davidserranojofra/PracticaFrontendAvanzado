export default class ComentsListManager {

    constructor(servicioComentarios, uiManager, pubSub) {
        this.servicioComentarios = servicioComentarios;
        this.uiManager = uiManager;
        this.pubSub = pubSub;
    }

    init() {
        this.cargarComentarios();
        this.pubSub.subscribe("nuevo-comentario", (topic, comentario) => {
            this.cargarComentarios();
        });
    }

    cargarComentarios() {
        this.servicioComentarios.listar (comentarios => {
            if (comentarios.lenght == 0) {
                this.uiManager.setEmpty();
            } else {
                this.renderizarComentarios(comentarios);
                this.uiManager.setIdeal();
	        }

        }, error => {
            this.uiManager.setError();
            console.log("ERROR al cargar coments", error);
        });  
    }

    renderizarComentarios(comentarios) {
        let html = "";

        for (let coment of comentarios) {
            html += this.renderizarComentario(coment);
        }
            
        this.uiManager.setIdealHtml(html); 
    }

    renderizarComentario(coment) {
        return `<div class="mostrar-comentarios-enviados">
                        <div class="datos-persona">
                            <h5>${coment.nombre} ${coment.apellidos}</h5>
                            <br>
                            <p>${coment.email}</p>
                            <br>
                            <p> ${coment.fecha}</p>
                        </div>
                        <div class="comentario-persona">${coment.comentario}</div>
                    </div>`;
    }
}