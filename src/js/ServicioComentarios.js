const $ = require("jquery");

export default class ServicioComentarios {
    
    constructor(url) {
        this.url = url;
    }

    listar(successCallback, errorCallback) {
        $.ajax({
            url: this.url,
            success: successCallback,
            error: errorCallback
        });
    }

    crearOActualizar(coment, successCallback, errorCallback) {
        if (coment.id) {
            this.actualizar(comentarios,successCallback, errorCallback);
        } else {
            this.crear(coment, successCallback, errorCallback);
        }
    }

    crear(comentario, successCallback, errorCallback) {
        $.ajax({
            url: this.url,
            method: "post",
            data: comentario,
            success: successCallback,
            error: errorCallback
        });
    }

    obtenerDetalles(comentId, successCallback, errorCallback) {
        $.ajax({
            url: `${this.url}${comentId}`,
            success: successCallback,
            error: errorCallback
        }); 
    }

    actualizar(coment, successCallback, errorCallback) {
        $.ajax({
            url: `${this.url}${coment.id}`,
            method: "put",
            data: coment,
            success: successCallback,
            error: errorCallback
        });
    }

    borrar(comentId, successCallback, errorCallback) {
        $.ajax({
            url: `${this.url}${comentId}`,
            method: "delete",
            success: successCallback,
            error: errorCallback
        });
    }
}