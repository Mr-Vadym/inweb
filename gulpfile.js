const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const ttf2woff = require("gulp-ttf2woff");
const ttf2woff2 = require("gulp-ttf2woff2");
const fileinclude = require("gulp-file-include");
const browserSync = require("browser-sync").create();
const del = require("del");
const notify = require("gulp-notify");
const svgmin = require("gulp-svgmin");
const htmlmin = require("gulp-htmlmin");
const webp = require("gulp-webp");

// Компіляція SCSS в CSS та додавання автопрефіксів
gulp.task("sass", function () {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

// Об'єднання та мініфікація JavaScript файлів
gulp.task("js", function () {
  return gulp
    .src("src/js/**/*.js")
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());
});

// Оптимізація зображень та конвертація в WebP
gulp.task("imagemin-webp", function () {
  return gulp
    .src("src/img/**/*.{jpg,png,svg}")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"))
    .pipe(webp())
    .pipe(gulp.dest("dist/img"))
    .on("end", function () {
      del(["dist/img/**/*.{jpg,png}"]); // Видалення лишніх JPG та PNG після завершення
    });
});

// Конвертація шрифтів у формати WOFF і WOFF2
gulp.task("fonts", function () {
  gulp.src("src/fonts/**/*.ttf").pipe(ttf2woff()).pipe(gulp.dest("dist/fonts"));
  return gulp
    .src("src/fonts/**/*.ttf")
    .pipe(ttf2woff2())
    .pipe(gulp.dest("dist/fonts"));
});

// Обробка HTML з використанням файлу-імпорта та оптимізація
gulp.task("html", function () {
  return gulp
    .src(["src/html/*.html"])
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true })) // Оптимізація HTML
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
});

// Видалення папки dist перед кожною збіркою
gulp.task("clean", function () {
  return del(["dist"]);
});

// Слідкування за змінами у файлах
gulp.task("watch", function () {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });
  gulp.watch("src/scss/**/*.scss", gulp.series("sass"));
  gulp.watch("src/js/**/*.js", gulp.series("js"));
  gulp.watch("src/img/**/*", gulp.series("imagemin-webp"));
  gulp.watch("src/fonts/**/*.ttf", gulp.series("fonts"));
  gulp.watch("src/html/**/*.html", gulp.series("html"));
});

gulp.task("taskWithNotification", function () {
  return gulp
    .src("source/*.ext")
    .pipe(/* ваші події тут */)
    .pipe(notify("Завдання завершено!")); // Сповіщення після завершення завдання
});

// Запуск усіх задач за замовчуванням
gulp.task(
  "default",
  gulp.series(
    "clean",
    gulp.parallel("sass", "js", "imagemin-webp", "fonts", "html"),
    "watch"
  )
);
