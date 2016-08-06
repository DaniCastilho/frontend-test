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



var express = require("express"),
    app = express(),
    http = require("http"),
    path = require("path"),
    arguments = require("shell-arguments");

global.CONFIG = require("./config");
require("./routes")(app);

app.use(
    "/static",
    express.static(
        path.join(__dirname, "public")
    )
);

if (arguments.port && /\d/g.test(arguments.port)) {
    CONFIG.PORT = arguments.port;
}

if (arguments.encoding) {
    CONFIG.VIEW.ENCODING = arguments.encoding;
}

if (arguments.extension) {
    CONFIG.VIEW.EXTENSION = arguments.extension;
}

http
    .createServer(app)
    .listen(
        CONFIG.PORT,
        function() {
            console.log("Application running on port: " + CONFIG.PORT);
        }
    );
