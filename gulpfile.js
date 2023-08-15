const gulp = require("gulp");
const dartSass = require('sass');
const sass = require('gulp-sass')(dartSass);
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const terser = require("gulp-terser");
const tsify = require("tsify");
const sourcemaps = require("gulp-sourcemaps");
const buffer = require("vinyl-buffer");

// build scss
const buildScss = () => {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('dist/css'));
};

// build typescript
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
        .pipe(sourcemaps.write("./maps"))
        .pipe(gulp.dest("dist/js"));
}

// task to build scss
gulp.task("build-scss", buildScss);

// task to build typescript
gulp.task("build-ts", buildTs);

// defult task
gulp.task("default", gulp.parallel(buildScss, buildTs));

// watch for change
gulp.task("watch", () => {
    gulp.watch(["src"], gulp.parallel(buildScss, buildTs))
})
