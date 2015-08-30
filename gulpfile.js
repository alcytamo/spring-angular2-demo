var gulp = require('gulp');
var plumber = require('gulp-plumber');
var tsd = require('gulp-tsd');
var typescript = require('typescript');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');

var OPTS = {
    src: {
        css: 'src/main/frontend/**/*.css',
        html: 'src/main/frontend/**/*.html',
        ts: 'src/main/frontend/**/*.ts',
        definition_out: 'build/definitions/',
        static_out: 'src/main/resources/static/'
    },
    libs: [
        "node_modules/gulp-traceur/node_modules/traceur/bin/traceur-runtime.js",
        "node_modules/systemjs/dist/system.js",
        "node_modules/rx/dist/rx.js",
        "node_modules/angular2/bundles/angular2.dev.js",
        "node_modules/angular2/bundles/router.dev.js"
    ]
};

var tsProject = ts.createProject('tsconfig.json', {
    typescript: typescript,
    noExternalResolve: true,
    sortOutput: true,
    rootDir: 'src/main/frontend/'
});
var tsFilters = undefined;
var tsReporter = ts.reporter.longReporter();

gulp.task('clean', function (callback) {
    console.log('----------------------------------------');
    console.log('GULP BUILD PROCESS STARTED');
    console.log('----------------------------------------');

    del([OPTS.src.static_out + '/**', '!' + OPTS.src.static_out + "/.gitkeep"], callback);

});

gulp.task('tsd', function (callback) {
    tsd({
        command: 'reinstall',
        latest: true,
        config: './tsd.json'
    }, callback);
});

gulp.task('libs', function () {
    gulp.src(OPTS.libs)
        .pipe(gulp.dest(OPTS.src.static_out + '/libs'))
});

gulp.task('templates', function () {
    gulp.src(OPTS.src.html)
        .pipe(gulp.dest(OPTS.src.static_out))
});

gulp.task('styles', function () {
    gulp.src(OPTS.src.css)
        .pipe(gulp.dest(OPTS.src.static_out))
});

gulp.task('scripts', function () {
    return gulp
        .src(OPTS.src.ts)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject, tsFilters, tsReporter))
        .js
        .pipe(sourcemaps.write('.', {sourceRoot: OPTS.src.static_out}))
        .pipe(gulp.dest(OPTS.src.static_out));
});

gulp.task('watch', ['build'], function () {
    gulp.watch(OPTS.src.ts, ['scripts']);
    gulp.watch(OPTS.src.css, ['styles']);
    gulp.watch(OPTS.src.html, ['templates']);
});

gulp.task('build', ['tsd', 'libs', 'styles', 'templates', 'scripts'], function () {
    console.log('----------------------------------------');
    console.log('GULP BUILD PROCESS FINISHED');
    console.log('----------------------------------------');
});

gulp.task('default', ['build']);