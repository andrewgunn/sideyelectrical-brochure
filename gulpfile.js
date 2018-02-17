var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var util = require('gulp-util');

var sourceDirectory = 'src';
var publishDirectory = 'publish';

var htmlSources = [sourceDirectory + '/**/*.html'];
var iconSources = [sourceDirectory + '/icons/**/*'];
var imageSources = [sourceDirectory + '/images/**/*'];
var scriptSources = [sourceDirectory + '/scripts/**/*.js'];
var styleSources = [sourceDirectory + '/styles/**/*.scss'];

gulp.task('clean', function () {
  return del([publishDirectory]);
});

gulp.task('connect', function () {
  connect.server({
    livereload: true,
    root: publishDirectory
  });
});

gulp.task('html', function () {
  gulp.src(htmlSources)
    .pipe(connect.reload())
    .pipe(gulp.dest(publishDirectory));
});

gulp.task('icons', function () {
  gulp.src(iconSources)
    .pipe(gulp.dest(publishDirectory));
});

gulp.task('images', function () {
  gulp.src(imageSources)
    .pipe(gulp.dest(publishDirectory + '/img'));
});

gulp.task('lib', function () {
  gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest(publishDirectory + '/lib/bootstrap/css'));

  gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js')
    .pipe(gulp.dest(publishDirectory + '/lib/bootstrap/js'));

  gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest(publishDirectory + '/lib/font-awesome/css'));

  gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest(publishDirectory + '/lib/font-awesome/fonts'));

  gulp.src('node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest(publishDirectory + '/lib/jquery'));

  // jquery.validate
  // jquery.validate.unobtrusive
});

gulp.task('scripts', function () {
  gulp.src(scriptSources)
    .pipe(uglify())
    .pipe(concat('bundle.min.js'))
    .pipe(gulp.dest(publishDirectory + '/js'))
    .pipe(connect.reload());
});

gulp.task('styles', function () {
  gulp.src(styleSources)
    .pipe(sass({ style: 'expanded' }))
    .on('error', util.log)
    .pipe(rename('bundle.min.css'))
    .pipe(gulp.dest(publishDirectory + '/css'))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(iconSources, ['icons']);
  gulp.watch(imageSources, ['images']);
  gulp.watch(htmlSources, ['html']);
  gulp.watch(scriptSources, ['scripts']);
  gulp.watch(styleSources, ['styles']);
});

gulp.task('build', ['html', 'icons', 'images', 'lib', 'scripts', 'styles', 'connect', 'watch']);

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
