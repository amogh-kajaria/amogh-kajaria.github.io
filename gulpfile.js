const gulp = require("gulp"),
  sass = require("gulp-sass")(require("sass")),
  uglify = require("gulp-uglify"),
  concat = require("gulp-concat"),
  connect = require("gulp-connect");

const jsSources = ["app/js/*.js"],
  sassSources = ["app/styles/*.scss"],
  htmlSources = ["app/*.html"],
  outputDir = "dist";

gulp.task("scss", function () {
  return gulp
    .src(sassSources)
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(outputDir + "/styles/"))
    .pipe(connect.reload());
});

gulp.task("js", function () {
  return gulp
    .src(jsSources)
    .pipe(gulp.dest(outputDir + "/scripts/"))
    .pipe(connect.reload());
});

gulp.task("html", function () {
  return gulp
    .src(htmlSources)
    .pipe(gulp.dest(outputDir))
    .pipe(connect.reload());
});

gulp.task("commonhtml", function () {
  return gulp
    .src(["app/common/*.html"])
    .pipe(gulp.dest(outputDir + "/common/"))
    .pipe(connect.reload());
});

gulp.task("assets", function () {
  return gulp
    .src([
      "app/assets/*.svg",
      "app/assets/*.png",
      "app/assets/*.jpg",
      "app/assets/*.mp4",
      "app/assets/*.gif",
      "app/assets/*.ico",
      "app/assets/*.webp",
    ])
    .pipe(gulp.dest(outputDir + "/assets/"))
    .pipe(connect.reload());
});

gulp.task("connect", function () {
  connect.server({
    root: "dist",
    livereload: true,
    host: "localhost",
    port: "8080",
  });
});

gulp.task("watch", function () {
  gulp.watch("app/js/*.js", gulp.series("js"));
  gulp.watch("app/styles/*.scss", gulp.series("scss"));
  gulp.watch("app/**.html", gulp.series("html"));
  gulp.watch("app/common/*.html", gulp.series("commonhtml"));
  gulp.watch("app/assets/*.svg", gulp.series("assets"));
  gulp.watch("app/assets/*.png", gulp.series("assets"));
  gulp.watch("app/assets/*.jpg", gulp.series("assets"));
  gulp.watch("app/assets/*.mp4", gulp.series("assets"));
  gulp.watch("app/assets/*.gif", gulp.series("assets"));
  gulp.watch("app/assets/*.ico", gulp.series("assets"));
  gulp.watch("app/assets/*.webp", gulp.series("assets"));
});

gulp.task("build", gulp.series("js", "scss", "html", "commonhtml", "assets"));

gulp.task(
  "default",
  gulp.series(
    "js",
    "scss",
    "html",
    "commonhtml",
    "assets",
    gulp.parallel("connect", "watch")
  )
);
