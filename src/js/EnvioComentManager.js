const $ = require("jquery");

import UIManager from "./UIManager";

export default class EnvioComentManager extends UIManager {

    constructor(elementoSelector ,servicioComentarios) {
        super(elementoSelector);
        this.servicioComentarios = servicioComentarios;
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
        // this.setLoading();
console.log(this.elemento.find("#nombre-form"));
        const comentario = {
            
            nombre: this.elemento.find("#nombre-form").val(),
            apellidos: this.elemento.find("#apellidos-form").val(),
            email: this.elemento.find("#email-form").val(),
            comentario: this.elemento.find("#comentario-form").val(),
            fecha: "hace 8 dias"
        };
        this.servicioComentarios.crearOActualizar(comentario, success => {
            console.log(comentario);
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

}