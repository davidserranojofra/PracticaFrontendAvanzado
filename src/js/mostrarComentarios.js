mostrarComentarios(come);

function mostrarComentarios() {

    let posicionScroll = $(window);
    let altoVentana = $(window).height();
    let altoDocumento = $(document).height();

    console.log(altoDocumento);
    console.log(altoVentana);
    console.log(altoDocumento - altoVentana);

    if (altoDocumento - altoVentana < 180) {
        comentsListManager.init();
        envioComentManager.init();
    }

    posicionScroll.scroll(function() {
        console.log("scroll");
        if(posicionScroll.scrollTop() == (altoDocumento - altoVentana)) {
            comentsListManager.init();
            envioComentManager.init();
            console.log("Carga AJAX");
        }
    }); 
}
