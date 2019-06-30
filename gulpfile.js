var gulp = require('gulp'),
    cleanCSS = require('gulp-clean-css'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    del = require('del'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    concatCss = require('gulp-concat-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    replace = require('gulp-replace');

gulp.task('browser-sync', ['sass'], function() {
	browserSync.init({
		server: {
			baseDir: "dev/"
		},
		notify: false
	});
});

gulp.task('watch', function () {
	gulp.watch("dev/sass/*.sass", ['sass']);
	gulp.watch("dev/**/*.html").on('change', browserSync.reload);
	gulp.watch("dev/js/*.js").on('change', browserSync.reload);
});

gulp.task('sass', function() {
  return gulp.src("dev/sass/*.sass")
    .pipe(sass())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest("dev/css"))
    .pipe(browserSync.stream());
});

gulp.task('clean', function() {
  return del.sync('build');
});

gulp.task('libsJS', function() {
  return gulp.src([
    'dev/libs/jquery.inputmask.bundle.js'
  ])
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('dev/js/'));
});

gulp.task('libsCSS', function() {
  return gulp.src([
    'dev/libs/normalize.css'
  ])
    .pipe(concatCss('libs.css'))
    .pipe(gulp.dest('dev/css/'));
});

// 1. gulp build
gulp.task('build', ['clean', 'sass'], function() {

  var css = gulp.src('dev/css/**/*.css')
      .pipe(gulp.dest('build/css'))

  var htaccess = gulp.src('dev/ht.access')
      .pipe(rename('.htaccess'))
      .pipe(gulp.dest('build/'))

  var other = gulp.src(['dev/**/*', '!dev/ht.access', '!dev/{sass,sass/**/*}', '!dev/{libs,libs/**/*}'])
      .pipe(gulp.dest('build/'))

});

// 2. gulp minify
gulp.task('minify', function() {

  var mainCSS = gulp.src("dev/css/main.css")
    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min', prefix : ''}))
    .pipe(gulp.dest("dev/css"))

  var libsCSS = gulp.src("dev/css/libs.css")
    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min', prefix : ''}))
    .pipe(gulp.dest("dev/css"))

  var commonJS = gulp.src('dev/js/common.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min', prefix : ''}))
    .pipe(gulp.dest('dev/js'));  

  var libsJS = gulp.src('dev/js/libs.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min', prefix : ''}))
    .pipe(gulp.dest('dev/js'));

});

// 3. gulp replace
gulp.task('replace', function(){
  gulp.src('dev/*.html')
    .pipe(replace('libs.js', 'libs.min.js'))
    .pipe(replace('common.js', 'common.min.js'))
    .pipe(replace('libs.css', 'libs.min.css'))
    .pipe(replace('main.css', 'main.min.css'))
    .pipe(gulp.dest('build'));
});

gulp.task('default', ['browser-sync', 'watch', 'libsJS', 'libsCSS']);