var gulp=require('gulp');
var concat=require('gulp-concat');
var clean=require('gulp-clean');
var connect=require('gulp-connect');
var stylus=require('gulp-stylus');
var jade=require('gulp-jade');
var image=require('gulp-image');

gulp.task('stylesheets:stylus', function() {
    return gulp.src('./src/styles/**.styl')
        .pipe(stylus({
            'include css': true,
            'compress': true
        }))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(connect.reload());
});

gulp.task('templates', function () {
  return gulp.src('./src/**/**.jade')
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

gulp.task('connect', function() {
    connect.server({
        root: 'dist',
        livereload: true,
        port: 3000
    });
});
gulp.task('add-image',function(){
    return gulp.src('./src/img/*')
    .pipe(image())
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
    gulp.start('stylesheets:stylus', 'templates','watch', 'connect', 'add-image','buildLib','buildJS','addFonts');
});