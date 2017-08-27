const $ = require('jquery');
const btns = document.querySelectorAll('.btn');
const paginationWrapper = document.querySelector('.pagination-wrapper');
const bigDotContainer = document.querySelector('.big-dot-container');
const littleDot = document.querySelector('.little-dot');

for(let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', btnClick);
}

let contador = 1;

function btnClick() {

    if(contador == 1) {
        if(this.classList.contains('btn--next')) {
            paginationWrapper.classList.add('transition-next');
        }
    } else {
        if(this.classList.contains('btn--prev')) {
            paginationWrapper.classList.add('transition-prev');
        } else {
            paginationWrapper.classList.add('transition-next');  
        }
    }

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