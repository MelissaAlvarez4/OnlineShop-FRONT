const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');

gulp.task('sass', function(cb) {
    gulp
    .src('**/*.scss')
    .pipe(sass())
    .pipe(
        gulp.dest(function(f) {
        return f.base;
        })
    );
    cb();
});

gulp.task('sassMin', function(cb) {
    gulp
    .src('**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(rename({
        suffix: ".min"
    }))
    .pipe(
        gulp.dest(function(f) {
        return f.base;
        })
    );
    cb();
});

gulp.task('default',
    gulp.series('sass', 'sassMin', function(cb) {
        gulp.watch('**/*.scss', gulp.series('sass', 'sassMin'));
        cb();
    })
);