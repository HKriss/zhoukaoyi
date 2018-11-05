var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('gulp-webserver');
gulp.task('devSass', function() {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'));
});
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
gulp.task('dev', gulp.series('devSass', 'devServer', 'watch'));