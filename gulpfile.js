var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var tsify = require("tsify");

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
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("dist"));
}

gulp.task("default", buildTs);

gulp.task("watch", () => {
    gulp.watch(["src"], buildTs)
})
