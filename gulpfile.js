var gulp = require('gulp'),
    concat = require('gulp-concat'),
    minifyJs = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),
    less = require('gulp-less'),
    ngAnnotate = require('gulp-ng-annotate'),
    rename = require("gulp-rename"),
    notify = require("gulp-notify"),
    clean = require('gulp-clean');

gulp.task('vendors-css', function () {
    gulp.src([
        'vendors/bootstrap/dist/css/bootstrap.css',
        'vendors/bootstrap/dist/css/bootstrap-theme.css'
    ])
        .pipe(concat('vendors-css.min.css'))
        .pipe(uglifycss())
        .pipe(gulp.dest('app/css/'));
});

gulp.task('custom-css', function() {
    gulp.src(['src/css/main.less'])
        .pipe(less({compress: true}))
        .pipe(uglifycss())
        .pipe(rename("app.min.css"))
        .pipe(gulp.dest('app/css/'))
        .pipe(notify("Gulp watch: custom-css task completed."));
});

gulp.task('vendors-js', function() {
    gulp.src([
        'vendors/jquery/dist/jquery.js',
        'vendors/bootstrap/dist/js/bootstrap.js',
        'vendors/angular/angular.js',
        'vendors/angular-ui-router/release/angular-ui-router.js',
        'vendors/angular-bootstrap/ui-bootstrap.js',
        'vendors/angular-bootstrap/ui-bootstrap-tpls.js',
        'vendors/angular-aria/angular-aria.js',
        'vendors/angular-animate/angular-animate.js',
        'vendors/ngInfiniteScroll/build/ng-infinite-scroll.js',
        'vendors/angular-bootstrap/ui-bootstrap.js',
        'vendors/angular-bootstrap/ui-bootstrap-tpls.js',
        'vendors/pouchdb/dist/pouchdb.js',
        'vendors/moment/moment.js',
        'vendors/highcharts/highcharts.src.js',
        'vendors/highcharts-ng/dist/highcharts-ng.js'
    ])
        .pipe(concat('vendors-js.min.js'))
        .pipe(minifyJs())
        .pipe(gulp.dest('app/js/'));
});

gulp.task('angular-app-js', function() {
    gulp.src('src/js/**/*.js')
        .pipe(concat('angular-app.min.js'))
        .pipe(ngAnnotate())
        .pipe(minifyJs())
        .pipe(gulp.dest('app/js/'))
        .pipe(notify("Gulp watch: angular-app-js task completed."));
});

gulp.task('fonts', function(){
    gulp.src('vendors/bootstrap/dist/fonts/*')
        .pipe(gulp.dest('app/fonts/'));
});

gulp.task('clean', function () {
    return gulp.src(['app/css/*', 'app/js/*', 'app/fonts/*'])
        .pipe(clean());
});

gulp.task('default', ['clean'], function () {
    var tasks = ['vendors-css', 'custom-css', 'vendors-js', 'angular-app-js', 'fonts'];

    tasks.forEach(function (val) {
        gulp.start(val);
    });
});

gulp.task('watch', function () {
    gulp.watch('src/css/*.css', ['custom-css']);
    gulp.watch('src/js/**/*.js', ['angular-app-js']);
});
