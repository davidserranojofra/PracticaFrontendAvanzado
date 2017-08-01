const $ = require("jquery");

export default class UIManager {

    constructor(selector) {
        this.uiStateClasses = "empty loading error partial ideal";
        this.elemento = $(selector);
    }

    setEmpty() {
        this.elemento.removeClass(this.uiStateClasses).addClass("empty");
    }

    setLoading() {
         this.elemento.removeClass(this.uiStateClasses).addClass("loading");
    }

    setError() {
         this.elemento.removeClass(this.uiStateClasses).addClass("error");
    }

    setPartial() {
        this.elemento.removeClass(this.uiStateClasses).addClass("partial");
    }

    setIdeal() {
         this.elemento.removeClass(this.uiStateClasses).addClass("ideal");
    }

    setEmptyHtml(html) {
        this.elemento.find(".ui-status.empty").html(html);
    }

    setLoadingHtml(html) {
         this.elemento.find(".ui-status.loading").html(html);
    }

    setErrorHtml(html) {
        this.elemento.find(".ui-status.error").html(html);
    }

    setPartialHtml(html) {
        this.elemento.find(".ui-status.partial").html(html);
    }

    setIdealHtml(html) {
        this.elemento.find(".ui-status.ideal").html(html);
    }
        
}