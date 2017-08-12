const $ = require('jquery');

//Inicializo los megusta seleccionados en la sesión anterior si los huviese
mostrarItemsSeleccionados();

//Al hacer click muestro como seleccionado y agrego a localstorage y a la inversa
$('.megusta').on('click', function() {

    if(this.children[0].classList.contains('click-seleccionado')) {
        
        this.children[0].classList.remove("click-seleccionado");
        localStorage.removeItem(this.getAttribute('data-id'));
    } else {
        
        this.children[0].classList.add("click-seleccionado");
        if(typeof(Storage) !== "undefined") {
            localStorage.setItem(this.getAttribute('data-id'), true);
        } else {
            alert("Lo siento, la funcionalidad de megusta no funcionara en tu navegador, actualízalo o usa otro");
        }

    }  
    console.log(localStorage);
});

//Recorro los elementos de localStorage y les aplico la clase seleccionado
function mostrarItemsSeleccionados() {

    let megusta = document.getElementsByClassName("megusta");

    for (let i = 0; i < localStorage.length; i++) {

        let clave = localStorage.key(i);
        megusta[clave].children[0].classList.add("click-seleccionado");
    }
}