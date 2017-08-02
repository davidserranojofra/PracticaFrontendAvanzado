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

    }

}