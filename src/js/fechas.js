const $ = require('jquery');
let moment = require("moment");
require('moment/locale/es');


let fechas = $('.fecha-publicacion');

//Recojo todas las fechas del documento con un bucle y las almaceno en un array
let fechasArray = [];

for (let i = 0; i < fechas.length; i++) {
    fechasArray.push(fechas[i].textContent);
}


mostrarFechaTiempoReal();

function mostrarFechaTiempoReal() {
    setTimeout (function() {
        for (let i = 0; i < fechasArray.length; i++) {
            let fechaAhora = moment();
            let fechaMas7Dias = moment(fechasArray[i], "YYYYMMDDHHmm").add(8, "d");
            let mostrarFecha = moment(fechasArray[i], "YYYYMMDDHHmm").fromNow();
            let fechaParseada = moment(fechasArray[i], "YYYYMMDDHHmm");
            let fechaSegundos = fechaAhora.diff(fechaParseada, "s");
            let insertarFechas = fechas[i].textContent;
            
            //Muestro por defecto de la libreria moments.js la funcionalidad .fromNow() siempre y cuando aparezca la palabra segundos, minutos o horas.
            if (fechaSegundos <= 59) {
                fechas[i].innerHTML = `hace ${fechaSegundos} segundos`;
            } else if ((mostrarFecha.indexOf("minuto") > -1)|| (mostrarFecha.indexOf("hora") > -1)) {
                fechas[i].innerHTML = mostrarFecha;
            } else if (mostrarFecha.indexOf("día") > -1) {
                if (fechaAhora < fechaMas7Dias){
                    //Si aparece día lo comparo con un variable que le suma 7 días a la fecha, y si hoy, esta dentro de los 7 días, le digo que muestre el día de la semana
                    mostrarFecha = moment(fechasArray[i], "YYYYMMDDHHmm").format('dddd');
                    fechas[i].innerHTML = mostrarFecha;
                } else {
                    //Si aparece día pero no esta dentro de los 7 dias me muestra la fecha entera
                    mostrarFecha = moment(fechasArray[i], "YYYYMMDDHHmm").format('LLL');
                    fechas[i].innerHTML = mostrarFecha;
                }
            } else {
                //si no aparece segundos, minutos, horas ni dias, mostrar fecha entera
                mostrarFecha = moment(fechasArray[i], "YYYYMMDDHHmm").format('LLL');
                fechas[i].innerHTML = mostrarFecha;
            }   
        }
        
        mostrarFechaTiempoReal();
    }, 1000);
}