var gulp = require('gulp');
var stripCode = require('gulp-strip-code');
var rename = require('gulp-rename');
/* **********************
* strip dev code
*********************** */
gulp.task('strip-code', function() {
    gulp.src('build/dev-server.js')
    .pipe(stripCode({
        start_comment: 'start-strip',
        end_comment: 'end-strip'
    }))
    .pipe(rename('server.js'))
    .pipe(gulp.dest('dist/server'));
});

/* **********************
* move config to dist
*********************** */
gulp.task('copy-config', function() {
    gulp.src('config.js')
    .pipe(gulp.dest('dist'));
});

/* **********************
* copy server code to dist
*********************** */
gulp.task('copy-code', ['copy-config'], function() {
    gulp.src('build/api/**/*', {
        base: 'build'
    })
    .pipe(gulp.dest('dist/server'));
});

/* **********************
* default task
*********************** */
gulp.task('default', ['strip-code', 'copy-code']);
