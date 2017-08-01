window.$ = window.jQuery = require("jquery");

import ServicioComentarios from "./ServicioComentarios";
import UIManager from "./UIManager";
import ComentsListManager from "./ComentsListManager";

const servicioComentarios = new ServicioComentarios("/comentarios/");
const comentListUIManager = new UIManager(".comentarios");

const comentsListManager = new ComentsListManager(servicioComentarios, comentListUIManager);
comentsListManager.init();