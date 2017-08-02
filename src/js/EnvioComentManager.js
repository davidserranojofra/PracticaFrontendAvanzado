const $ = require("jquery");

import UIManager from "./UIManager";

export default class EnvioComentManager extends UIManager {

    constructor(elementoSelector ,servicioComentarios, pubSub) {
        super(elementoSelector);
        this.servicioComentarios = servicioComentarios;
        this.pubSub = pubSub;
    } 

    init() {
        this.setupSubmitEventHandler();
    }

    setupSubmitEventHandler() {
        this.elemento.on("submit", () => {
            this.validateAndSendData();
            return false;
        });
    }

    validateAndSendData() {
        if (this.esValido()) {
            this.enviar();

        }
    }

    esValido() {
        const inputs = this.elemento.find("input");

        for (let input of inputs) {
            if(input.checkValidity() == false) {
                input.focus();
                const errorMsg = input.validationMessage;
                this.setErrorHtml(errorMsg);
                this.setError();
                return false;
            }
        }
        this.setIdeal();
        return true;
    }

    enviar() {
        this.setLoading();

        const comentario = {
            nombre: this.elemento.find("#nombre-form").val(),
            apellidos: this.elemento.find("#apellidos-form").val(),
            email: this.elemento.find("#email-form").val(),
            comentario: this.elemento.find("#comentario-form").val(),
            fecha: "hace 8 dias"
        };
        this.servicioComentarios.crearOActualizar(comentario, success => {
            this.pubSub.publish("nuevo-comentario", comentario);
            this.resetForm();
            this.setIdeal();
        }, error => {
            this.setErrorHtml("Error al guardar en el servidor");
            this.setError();
        });
    }

    resetForm() {
        this.elemento[0].reset();
    }

    desactivarForm() {
        this.elemento.find("input, button").attr("disabled", true);
    }

    activarForm() {
        this.elemento.find("input, button").attr("disabled", false);
    }

    setLoading() {
        super.setLoading();
        this.desactivarForm();
    }

    setError() {
        super.setError();
        this.activarForm();
    }

    setIdeal() {
        super.setIdeal();
        this.activarForm();
    }

}