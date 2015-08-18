var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var minifyCSS = require('gulp-minify-css');

gulp.task('clean', function() {
  del(['.tmp']);
});

gulp.task('styles', function() {
  return gulp.src([
      'src/assets/**/*.less', 
      'bower_components/jquery-ui/themes/base/jquery-ui.min.css'
    ])
    .pipe($.less())
    .pipe($.concat('cod.css'))
    .pipe(minifyCSS({
      keepSpecialComments: 0
    }))
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('.tmp'))
    .pipe($.connect.reload());
});

gulp.task('scripts', function() {

  return gulp.src([
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/bootstrap/js/modal.js',
      'bower_components/jquery-ui/ui/jquery-ui.custom.js',
      'bower_components/angular-ui-slider/src/slider.js',
      'src/cod/**/*.js'
    ])
    .pipe($.concat('cod.js'))
    .pipe($.uglify())
    .pipe(gulp.dest('.tmp'))
    .pipe($.connect.reload());
});

gulp.task('watch', ['serve'], function() {
  $.watch(['src/**/*.js', 'src/**/*.less', 'src/**/*.html'], {
    debounceDelay: 2000
  }, function(files) {
    gulp.start('build');
  });
});

gulp.task('serve', ['connect'], function() {
  require('opn')('http://localhost:8080');
});

gulp.task('connect', ['build'], function() {
  var connectModRewrite = require('connect-modrewrite');
  $.connect.server({
    root: '.tmp',
    port: 8080,
    livereload: true,
    middleware: function(connect, opt) {
      return [
        connectModRewrite([
          '!\\.?(js|css|html) / [L]',
        ]),
      ];
    }
  });
});

gulp.task('build', ['index']);

gulp.task('html', function() {
  gulp.src(['src/cod/**/*.html', '!src/index.html'])
    .pipe(gulp.dest('.tmp'))
    .pipe($.connect.reload());
});

gulp.task('index', ['scripts', 'styles', 'html'], function() {
  var output = gulp.src('src/index.html')
    .pipe(gulp.dest('.tmp'))
    .pipe($.connect.reload());
  output.on('error', console.error.bind(console));
  return output;
});