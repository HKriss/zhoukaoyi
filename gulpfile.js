/*
 * @Author: haojinping 
 * @Date: 2018-11-05 09:51:55 
 * @Last Modified by:   haojinping 
 * @Last Modified time: 2018-11-05 09:51:55 
 */

// 引入
var gulp = require('gulp');
var sass = require('gulp-sass');
var auto = require('gulp-autoprefixer');
var clean = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var server = require('gulp-webserver');
var data = require('./data/data.json');
gulp.task('devSass', function() {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(auto())
        .pipe(clean())
        .pipe(gulp.dest('./src/css'));
});
gulp.task('uglify', function() {
    return gulp.src(['./src/js/**/*.js', '!./src/js/libs/*.js'])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'));
})
gulp.task('devServer', function() {
    return gulp.src('src')
        .pipe(server({
            port: 8080,
            middleware: function(req, res, next) {
                var pathname = require('url').parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return res.end();
                }
                if (pathname === '/api/list') {
                    res.end(JSON.stringify({ code: 0, msg: data }));
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(require('fs').readFileSync(require('path').join(__dirname, 'src', pathname)));
                }
            }
        }))
});
gulp.task('watch', function() {
    return gulp.watch('./src/sass/*.scss', gulp.series('devSass'));
});
gulp.task('dev', gulp.series('devSass', 'uglify', 'devServer', 'watch'));