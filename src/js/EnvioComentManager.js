let moment = require("moment");
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
        console.log('0 : init()');
    }

    setupSubmitEventHandler() {
        this.elemento.on("submit", () => {
            console.log('1 : setupSubmitEventHandler');
            this.validateAndSendData();
            return false;
        });
    }

    validateAndSendData() {
        console.log('2 : validateAndSendData');
        if (this.esValido()) {
            console.log('2,5 : validateAndSendData dentro del IF{}');
            this.enviar();
        }
    }

    esValido() {
        const inputs = this.elemento.find("input");
        const textArea = document.getElementById('comentario-form');
        console.log('3 : esvalido()');
        
// Funciona perfecto menos en IE11
        // for (let input of inputs) {
            // if(input.checkValidity() == false) {
            //     input.focus();
            //     const errorMsg = input.validationMessage;
            //     this.setErrorHtml(errorMsg);
            //     this.setError();
            //     return false;
            // }
        // }
        for (let i = 0; i < inputs.length; i++) {
            if(inputs[i].checkValidity() == false) {
                inputs[i].focus();
                const errorMsg = inputs[i].validationMessage;
                this.setErrorHtml(errorMsg);
                this.setError();
                return false;
            }
        }

        if (textArea.checkValidity() == false) {
            textArea.focus();
            const errorMsg = textArea.validationMessage;
            this.setErrorHtml(errorMsg);
            this.setError();
            return false;
        }

        let remplazarEspacios = textArea.value.replace(/\s\s+/g, ' ').trim();
        let arrayPalabras = remplazarEspacios.split(' ');
        let contador = arrayPalabras.length;
        if (contador > 120) {
            textArea.focus();
            this.setErrorHtml("Lo siento, el máximo son 120 palabras y llevas " + contador + " palabras");
            this.setError();
            return false;
        } 

        this.setIdeal();
        return true;
    }

    enviar() {
        this.setLoading();
        console.log('4 : enviar()');
        let fechaAhora = moment();
        const comentario = {
            nombre: this.elemento.find("#nombre-form").val(),
            apellidos: this.elemento.find("#apellidos-form").val(),
            email: this.elemento.find("#email-form").val(),
            comentario: this.elemento.find("#comentario-form").val(),
            fecha: fechaAhora.format('LLL')
        };
        this.servicioComentarios.crearOActualizar(comentario, success => {
            this.pubSub.publish("nuevo-comentario", comentario);
            this.resetForm();
            console.log('4,5 : enviar() dentro del crearOActualizar()');
            this.setIdeal();
        }, error => {
            this.setErrorHtml("Error al guardar en el servidor");
            this.setError();
        });
    }

    resetForm() {
        console.log('5 : resetForm()');
        const esIE = /*@cc_on!@*/false || !!document.documentMode;
        if(esIE) {
            console.log("entra");
            this.elemento.find("#nombre-form").val('');
            this.elemento.find("#apellidos-form").val('');
            this.elemento.find("#email-form").val('');
            this.elemento.find("#comentario-form").val('');   
        } else {
            this.elemento[0].reset();
        }
    }

    desactivarForm() {
        console.log('desactiva formulario');
        this.elemento.find("input, button").attr("disabled", true);
    }

    activarForm() {
        console.log('activa formulario');
        this.elemento.find("input, button").attr("disabled", false);
    }

    setLoading() {
        console.log('cargando formulario');
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

