let moment = require("moment");
const $ = require('jquery');
require('moment/locale/es');

let fechas = $('.fecha-publicacion');

for (let i = 0; i < fechas.length; i++) {
    
    let fechaAhora = moment();
    let fechaMas7Dias = moment(fechas[i].textContent, "YYYYMMDDHHmm").add(8, "d");
    let mostrarFecha = moment(fechas[i].textContent, "YYYYMMDDHHmm").fromNow();
    
    if ((mostrarFecha.indexOf("segundo") > -1) || (mostrarFecha.indexOf("minuto") > -1)|| (mostrarFecha.indexOf("hora") > -1)) {
        fechas[i].innerHTML = mostrarFecha;
    } else if (mostrarFecha.indexOf("día") > -1) {
        if (fechaAhora < fechaMas7Dias){
            mostrarFecha = moment(fechas[i].textContent, "YYYYMMDDHHmm").format('dddd');
            fechas[i].innerHTML = mostrarFecha;
        } else {
            mostrarFecha = moment(fechas[i].textContent, "YYYYMMDDHHmm").format('LLL');
            fechas[i].innerHTML = mostrarFecha;
        }
    } else {
        mostrarFecha = moment(fechas[i].textContent, "YYYYMMDDHHmm").format('LLL');
        fechas[i].innerHTML = mostrarFecha;
    }   
}