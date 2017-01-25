"use strict";
var gulp = require("gulp");
var del = require("del");
var replace = require('gulp-replace');
var sourcemaps = require('gulp-sourcemaps');
var gulpSequence = require('gulp-sequence')

/**
 * Remove build directory.
 */
gulp.task('clean', function (cb) {
    console.log("Cleaning");
    return del(["build"], cb);
});

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("resources", ["server", "app", "assets"], function () {
    console.log("Building resources...");
});
/* copy the app core files to the build folder */
gulp.task("app", ['index'], function () {
    return gulp.src(["app/**/*", "!app/**/*.ts"])
        .pipe(gulp.dest("build/app"));
});
/* get the index file to the root of the build */
gulp.task("index", function () {
    return gulp.src(["index.html", "systemjs.config.js", "systemjs.config.extras.js"])
        .pipe(gulp.dest("build"));
});
/* copy node server to build folder */
gulp.task("server", function () {
    return gulp.src(["index.js", "package.json"], { cwd: "src/server/**" })
        .pipe(gulp.dest("build"));
});
/* styles and other assets */
gulp.task("assets", function () {
    return gulp.src(["styles.css"])
        .pipe(gulp.dest("build"));
});

/**
 * Copy all required libraries into build directory.
 */
gulp.task("libs", function () {
    return gulp.src([
        // 'es6-shim/es6-shim.min.js',
        // 'systemjs/dist/system-polyfills.js',
        // 'angular2/bundles/angular2-polyfills.js',
        // 'angular2/es6/dev/src/testing/shims_for_IE.js',
        // 'systemjs/dist/system.src.js',
        // 'rxjs/bundles/Rx.js',
        // 'angular2/bundles/angular2.dev.js',
        // 'angular2/bundles/router.dev.js',

        // angular bundles
        "@angular/common/**/*",
        "@angular/compiler/**/*",
        "@angular/core/**/*",
        "@angular/forms/**/*",
        "@angular/http/**/*",
        "@angular/platform-browser/**/*",
        "@angular/platform-browser-dynamic/**/*",
        "@angular/router/**/*",
        "angular-in-memory-web-api/**/*",
        "systemjs/**/*",
        "core-js/**/*",
        "rxjs/**/*",
        "zone.js/**/*"
    ], { cwd: "node_modules/**" }) /* Glob required here. */
        .pipe(gulp.dest("build/node_modules"));
});
/**
 * Build the project.
 */

gulp.task('rebuild', gulpSequence('clean', ['resources', 'libs']));

gulp.task("default", ['rebuild'], function () {
    console.log("Building the project ...");
});