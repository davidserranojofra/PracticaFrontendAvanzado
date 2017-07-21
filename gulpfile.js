var gulp = require("gulp"); //importo gulp
var sass = require("gulp-sass");
var notify = require("gulp-notify");
var browserSync = require("browser-sync").create();
var gulpImport = require("gulp-html-import");



//definir la rtarea pr defecto
gulp.task("default", ["html", "sass"], function() {

    //inicio servidor de desarrollo
    browserSync.init({ server: "build/" });

    //obseva cambios en archivos sass y ejecuta la tarea "sass"
    gulp.watch(["src/scss/*.scss", "src/scss/**/*.scss"], ["sass"]);

    //observa cambios en archivos html
     gulp.watch(["src/*.html", "src/**/*.html"], ["html"]);
});


//compilar sass
gulp.task("sass", function() { //importante poner variable = require("gupl-sass") arriba;
    gulp.src("src/scss/style.scss") //cargo archivo scss
        .pipe(sass().on("error", function(error) {
            return notify().write(error);
        }))
        .pipe(gulp.dest("build/")) //guardo resultado en carpeta css
        .pipe(browserSync.stream()); //recarga el css al vuelo;
        // .pipe(notify("SASS Compilado 🤘"));
});

//copiar y importar

gulp.task("html", function () {
    gulp.src("src/*.html")
        .pipe(gulpImport('src/components/'))
        .pipe(gulp.dest('build/'))
        .pipe(browserSync.stream());
        // .pipe(notify("HTML importado 🤘"));
});