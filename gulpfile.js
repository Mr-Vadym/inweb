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
const sourcemaps = require("gulp-sourcemaps");
const cache = require("gulp-cache");

gulp.task("sass", function () {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", function (err) {
      notify.onError({
        title: "Sass Error",
        message: "<%= error.message %>"
      })(err);
      this.emit("end");
    }))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

gulp.task("js", function () {
  return gulp
    .src(["node_modules/jquery/dist/jquery.min.js", "src/js/**/*.js"])
    .pipe(sourcemaps.init())
    .pipe(concat("main.min.js"))
    .pipe(uglify().on("error", function (err) {
      notify.onError({
        title: "JavaScript Error",
        message: "<%= error.message %>"
      })(err);
      this.emit("end");
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());
});

gulp.task("imagemin-webp", function () {
  return gulp
    .src("src/img/**/*.{jpg,png,svg}")
    .pipe(cache(imagemin()))
    .pipe(gulp.dest("dist/img"))
    .pipe(webp())
    .pipe(gulp.dest("dist/img"))
    .on("end", function () {
      del(["dist/img/**/*.{jpg,png}"]);
    });
});

gulp.task("svg", function () {
  return gulp
    .src("src/img/**/*.svg")
    .pipe(svgmin({
      js2svg: {
        lowercase: false
      }
    }))
    .pipe(gulp.dest("dist/img"));
});


gulp.task("fonts", function () {
  gulp.src("src/fonts/**/*.ttf").pipe(ttf2woff()).pipe(gulp.dest("dist/fonts"));
  return gulp
    .src("src/fonts/**/*.ttf")
    .pipe(ttf2woff2())
    .pipe(gulp.dest("dist/fonts"));
});

gulp.task("html", function () {
  return gulp
    .src(["src/html/*.html"])
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath:
          "@file",
      })
    )
    .pipe(cache(htmlmin({ collapseWhitespace: true, removeComments: true })))
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
});

gulp.task("clean", function () {
  return del(["dist"]);
});

gulp.task("watch", function () {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });
  gulp
    .watch("src/scss/**/*.scss", gulp.series("sass"))
    .on("change", browserSync.reload);
  gulp
    .watch("src/js/**/*.js", gulp.series("js"))
    .on("change", browserSync.stream);
  gulp.watch("src/img/**/*.{jpg,png}", gulp.series("imagemin-webp"));
  gulp.watch("src/img/**/*.svg", gulp.series("svg"));
  gulp.watch("src/fonts/**/*.ttf", gulp.series("fonts"));
  gulp
    .watch("src/html/**/*.html", gulp.series("html"))
    .on("change", browserSync.reload);
});

gulp.task(
  "default",
  gulp.series(
    "clean",
    gulp.parallel("sass", "js", "imagemin-webp", "svg", "fonts", "html"),
    "watch"
  )
);
