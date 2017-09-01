const $ = require('jquery');
const btns = document.querySelectorAll('.btn');
const paginationWrapper = document.querySelector('.pagination-wrapper');
const bigDotContainer = document.querySelector('.big-dot-container');
const littleDot = document.querySelector('.little-dot');
let contador = 1;
const atras = document.getElementById('btn-atras');
const siguiente = document.getElementById('btn-siguiente');
const rutaPaginacion = window.location.pathname;

if (rutaPaginacion == "/") {
    atras.addEventListener('click', btnClickAtras);
    siguiente.addEventListener('click', btnClickSiguiente);
}

function btnClickAtras() {
    if (contador != 1) {
        paginationWrapper.classList.add('transition-prev');
    }
    let timeout = setTimeout(cleanClasses, 500);
}

function btnClickSiguiente() {
    paginationWrapper.classList.add('transition-next');
    let timeout = setTimeout(cleanClasses, 500);
}

function cleanClasses() {
    if(paginationWrapper.classList.contains('transition-next')) {
          paginationWrapper.classList.remove('transition-next');
          contador++;
          $('.numeracion').html(contador);
    } else if(paginationWrapper.classList.contains('transition-prev')) {
          paginationWrapper.classList.remove('transition-prev');
          contador--;
          $('.numeracion').html(contador);
    }
}

//Esto funciona en todos los navegadores menos Internet explorer
//el 'this' de la funcion btnClick dice que no esta definido o que es nulo
//"la propiedad .contains no esta definida o es nula".

// for(let i = 0; i < btns.length; i++) {
//     btns[i].addEventListener('click', btnClick);
// }

// function btnClick() {
//     if(contador == 1) {    
//         if(this.classList.contains('btn--next')) {
//             paginationWrapper.classList.add('transition-next');
//         }
//     } else {
//         if(this.classList.contains('btn--prev')) {
//             paginationWrapper.classList.add('transition-prev');
//         } else {
//             paginationWrapper.classList.add('transition-next');  
//         }
//     }
// let timeout = setTimeout(cleanClasses, 500);
// }