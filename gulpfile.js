var gulp = require("gulp"); // importamos la librería gulp
var sass = require("gulp-sass");
var notify = require("gulp-notify");
var browserSync = require("browser-sync").create();
var gulpImport = require("gulp-html-import");
var tap = require("gulp-tap");
var browserify = require("browserify");
var buffer = require("gulp-buffer");
var sourcemaps = require("gulp-sourcemaps");
var htmlmin = require("gulp-htmlmin");
var uglify = require("gulp-uglify");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");
var imagemin = require("gulp-imagemin");
var responsive = require("gulp-responsive");

// definimos la tarea por defecto
gulp.task("default", ["img", "html", "sass", "js"], function(){

    // iniciamos el servidor de desarrollo
    browserSync.init({ proxy: "http://127.0.0.1:3100/" });

    // observa cambios en los archivos SASS, y entonces ejecuta la tarea 'sass'
    gulp.watch(["src/scss/*.scss", "src/scss/**/*.scss"], ["sass"]);

    // observa cambios en los archivos HTML y entonces ejecuta la tarea 'html'
    gulp.watch(["src/*.html", "src/**/*.html"], ["html"]);

    // observa cambios en los archivos JS y entonces ejecuta la tarea 'js'
    gulp.watch(["src/js/*.js", "src/js/**/*.js"], ["js"]);
});

// compilar sass
gulp.task("sass", function(){
    gulp.src("src/scss/style.scss") // cargamos el archivo style.scss
        .pipe(sourcemaps.init()) // comienza a capturar los sourcemaps
        .pipe(sass().on("error", function(error){ // lo compilamos con gulp-sass
            return notify().write(error); // si ocurre un error, mostramos una notificación
        }))
        .pipe(postcss([
            autoprefixer(), // transforma el CSS dándole compatibilidad a versiones antiguas
            cssnano()       // comprime/minifca el CSS
        ]))
        .pipe(sourcemaps.write("./")) // guarda el sourcemap en la misma carpeta que el CSS
        .pipe(gulp.dest("build/")) // guardamos el resultado en la carpeta css
        .pipe(browserSync.stream()); // recargue el CSS del navegador
        // .pipe(notify("SASS Compilado 🤘🏻")) // muestra notifiación en pantalla
});

// copiar e importar html
gulp.task("html", function(){
    gulp.src("src/*.html")
        .pipe(gulpImport("src/components/")) // reemplaza los @import de los HTML
        .pipe(htmlmin({collapseWhitespace: true})) // minifica el HTML
        .pipe(gulp.dest("build/"))
        .pipe(browserSync.stream());
        // .pipe(notify("HTML importado"));
});

// compilar y generar un único javascript
gulp.task("js", function(){
    gulp.src("src/js/principal.js")
        .pipe(tap(function(file){ // tap nos permite ejecutar una función por cada fichero seleccionado en gulp.src
            // reemplazamos el contenido del fichero por lo que nos devuelve browserify pasándole el fichero
            file.contents = browserify(file.path, {debug: true}) // creamos una instancia de browserify en base al archivo
                            .transform("babelify", {presets: ["es2015"]}) // traduce nuestro codigo de ES6 -> ES5
                            .bundle() // compilamos el archivo
                            .on("error", function(error){ // en caso de error, mostramos una notificación
                                return notify().write(error);
                            });
        }))
        .pipe(buffer()) // convertimos a buffer para que funcione el siguiente pipe
        .pipe(sourcemaps.init({loadMaps: true})) // captura los sourcemaps del archivo fuente
        .pipe(uglify()) // minificamos el JavaScript
        .pipe(sourcemaps.write('./')) // guarda los sourcemaps en el mismo directorio que el archivo fuente
        .pipe(gulp.dest("build/")) // lo guardamos en la carpeta dist
        .pipe(browserSync.stream()) // recargamos el navegador
        .pipe(notify("JS Compilado"));
});

// tarea que optimiza y crea las imágenes responsive
gulp.task("img", function(){
    gulp.src("src/img/fotos/*")
        .pipe(responsive({ // generamos las versiones responsive
            '*': [
                { width: 220, rename: { suffix: "-220px"}},
                { width: 318, rename: { suffix: "-318px"}},
                { width: 370, rename: { suffix: "-370px"}},
                { width: 675, rename: { suffix: "-675px"}},
                { width: 740, rename: { suffix: "-740px"}},
                { width: 1020, rename: { suffix: "-1020px"}},
                { width: 1250, rename: { suffix: "-1250px"}},
                { width: 1600, rename: { suffix: "-1600px"}}
            ]
        }))
        .pipe(imagemin()) // optimizamos el peso de las imágenes
        .pipe(gulp.dest("build/img/"));

    //rescala-optimización de avatares
    gulp.src("src/img/avatar/*")
        .pipe(responsive({ // generamos las versiones responsive
            '*': [
                { width: 32, rename: { suffix: "-avatar-32px"}}
            ]
        }))
        .pipe(imagemin()) // optimizamos el peso de las imágenes
        .pipe(gulp.dest("build/img/"));
    
    //Rescala-optimización ico
    gulp.src("src/img/ico/*")
        .pipe(responsive({ // generamos las versiones responsive
            '*': [
                { width: 16, rename: { suffix: "-16px"}}
            ]
        }))
        .pipe(imagemin()) // optimizamos el peso de las imágenes
        .pipe(gulp.dest("build/img/"));
});