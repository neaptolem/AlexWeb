var gulp=require('gulp');
var concat=require('gulp-concat');
var clean=require('gulp-clean');
var stylus=require('gulp-stylus');
var jade=require('gulp-jade');
var image=require('gulp-image');
var browserSync  = require('browser-sync').create();

gulp.task('stylesheets:stylus', function() {
    return gulp.src('./src/styles/**.styl')
        .pipe(stylus({
            'include css': true,
            'compress': true
        }))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('templates', function () {
  return gulp.src('./src/*.jade')
    .pipe(jade({
      // pretty: true
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function() {
    return gulp.src('./dist')
        .pipe(clean());
});

gulp.task('watch', ['clean'], function() {
    gulp.watch('./src/**/**.jade', ['templates']);
    gulp.watch('./src/styles/*.styl', ['stylesheets:stylus']);
});

gulp.task('browser-sync', ['stylesheets:stylus', 'templates','add-image','buildLib','buildJS','addFonts'], function() {
		browserSync.init({
				server: {
						baseDir: "./dist"
				},
				notify: false
		});
});

gulp.task('add-image',function(){
    return gulp.src('./src/img/*')
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('buildLib', function() {
  gulp.src(["./node_modules/jquery/dist/jquery.js","./node_modules/bootstrap/dist/js/bootstrap.js","./node_modules/jquery-easing/jquery.easing.1.3.js"])
  .pipe(concat('vendor.js'))
  .pipe(gulp.dest('./dist/js'));
});

gulp.task('buildJS', function() {
  gulp.src(['./src/js/index.js'])
  .pipe(concat('index.js'))
  .pipe(gulp.dest('./dist/js'));
});

gulp.task('addFonts', function() {
    gulp.src(['./node_modules/font-awesome/fonts/*','./node_modules/bootstrap/fonts/*'])
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('default', ['clean'], function() {
    gulp.start('watch', 'browser-sync');
});
