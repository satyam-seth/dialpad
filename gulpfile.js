var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var terser = require("gulp-terser");
var tsify = require("tsify");
var sourcemaps = require("gulp-sourcemaps");
var buffer = require("vinyl-buffer");

const buildTs = () => {
    return browserify(
        {
            basedir: ".",
            debug: true,
            entries: ["src/ts/main.ts"],
            cache: {},
            packageCache: {},
        }
    )
        .plugin(tsify)
        .transform("babelify", {
            presets: ["es2015"],
            extensions: [".ts"],
        })
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(terser())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("dist"));
}

gulp.task("default", buildTs);

gulp.task("watch", () => {
    gulp.watch(["src"], buildTs)
})
