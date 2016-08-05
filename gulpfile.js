var gulp = require('gulp');
var sass = require('gulp-sass');
var compass = require('gulp-compass');

var src = 'public/sass/*.scss';
var dist = 'public/css';

gulp.task('sass', function () {
  return gulp
    .src(src).pipe(sass()).pipe(gulp.dest(dist));
});

gulp.task('watch', function() {
  return gulp
    .watch(src, ['sass'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('default', ['sass', 'watch']);