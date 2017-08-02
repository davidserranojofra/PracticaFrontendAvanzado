window.$ = window.jQuery = require("jquery");

import menu from "./menu";
import ServicioComentarios from "./ServicioComentarios";
import UIManager from "./UIManager";
import ComentsListManager from "./ComentsListManager";
import EnvioComentManager from "./EnvioComentManager";


const servicioComentarios = new ServicioComentarios("/comentarios/");
const comentListUIManager = new UIManager(".comentarios");

const comentsListManager = new ComentsListManager(servicioComentarios, comentListUIManager);
comentsListManager.init();

const envioComentManager = new EnvioComentManager(".comentarios-form", servicioComentarios);
envioComentManager.init();