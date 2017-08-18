const $ = require("jquery");

const ruta = window.location.pathname;

if (ruta != "/") {
    let hiSport = $("a[href='#categoria1']");
    hiSport.attr("href", "/#categoria1");
}