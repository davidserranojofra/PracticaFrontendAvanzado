window.$ = window.jQuery = require("jquery");

import menu from "./menu";
import menuNavegacion from "./menuNavegacion";
import megusta from "./megusta";
import flechaArriba from "./flechaArriba";
import ServicioComentarios from "./ServicioComentarios";
import UIManager from "./UIManager";
import ComentsListManager from "./ComentsListManager";
import EnvioComentManager from "./EnvioComentManager";
import PubSub from "pubsub-js";
import fecha from "./fechas";
import paginacion from "./paginacion";

const servicioComentarios = new ServicioComentarios("/comentarios/");
const comentListUIManager = new UIManager(".comentarios");
const comentsListManager = new ComentsListManager(servicioComentarios, comentListUIManager, PubSub);
const envioComentManager = new EnvioComentManager(".comentarios-form", servicioComentarios, PubSub);
const ruta = window.location.pathname;

if (ruta == "/detalle.html" || ruta == "/detalle.html#comentarios") { /////////////////////////////////////////// OJO pensar esto bien!!!!!!!!!!!!!!!!!!
    
    mostrarComentarios();
}

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
                cargarComentariosSoloUnaVez();
            }
        }); 
    }
}

// variable de control para que IE11 al hacer scroll massivo no me cargue envioComentManager varias veces 
// ya que a la hora de poner un comentario luego lo publica tantas veces como lo haya cargado.
// Los demas navegadores podria ponerlo directamente sin la funcion ya que gestionan bien la carga.
let ejecutado = false;

function cargarComentariosSoloUnaVez() {
    if (ejecutado == false) {
        comentsListManager.init();
        envioComentManager.init();
        ejecutado = true;
    }
}