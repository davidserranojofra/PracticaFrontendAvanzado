window.$ = window.jQuery = require("jquery");

import menu from "./menu";
import megusta from "./megusta";
import flechaArriba from "./flechaArriba";
import ServicioComentarios from "./ServicioComentarios";
import UIManager from "./UIManager";
import ComentsListManager from "./ComentsListManager";
import EnvioComentManager from "./EnvioComentManager";
import PubSub from "pubsub-js";
import fecha from "./fechas";

const servicioComentarios = new ServicioComentarios("/comentarios/");
const comentListUIManager = new UIManager(".comentarios");
const comentsListManager = new ComentsListManager(servicioComentarios, comentListUIManager, PubSub);
const envioComentManager = new EnvioComentManager(".comentarios-form", servicioComentarios, PubSub);


mostrarComentarios();

function mostrarComentarios() {
    let posicionScroll = $(window);
    let altoVentana = $(window).height();
    let altoDocumento = $(document).height();

    //Si el documento le faltan menos de 180px para llegar abajo, muestra los comentarios
    if (altoDocumento - altoVentana < 180) {
        comentsListManager.init();
        envioComentManager.init();
    } else {
        //si no cuando llegues abajo muestralos
        posicionScroll.scroll(function() {
            if(posicionScroll.scrollTop() == (altoDocumento - altoVentana)) {
                comentsListManager.init();
                envioComentManager.init();
            }
        }); 
    }
}