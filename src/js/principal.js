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
comentsListManager.init();

const envioComentManager = new EnvioComentManager(".comentarios-form", servicioComentarios, PubSub);
envioComentManager.init();