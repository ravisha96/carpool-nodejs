var gulp = require('gulp');
var ts = require('gulp-typescript');
var rimraf = require('gulp-rimraf');
var nodemon = require('gulp-nodemon');
var connect = require('gulp-connect');
 
gulp.task('cleanBuiltDir', function(){
  return gulp.src('built').pipe(rimraf());
}); 
 
gulp.task('buildBackEnd', ['cleanBuiltDir'],  function () {
  var tsResult = gulp.src('src/**/*.ts')
    .pipe(ts({
        module: 'CommonJS'
      }));
  return tsResult.js.pipe(gulp.dest('built/'));
});

gulp.task('buildBackEnd', ['cleanBuiltDir'],  function () {
  var tsResult = gulp.src('src/**/*.ts')
    .pipe(ts({
        module: 'CommonJS'
      }));
  return tsResult.js.pipe(gulp.dest('built/'));
});
 
gulp.task('buildFrontEnd', ['cleanBuiltDir'],  function () {
  var tsResult = gulp.src('src/**/*.ts')
    .pipe(ts({
        module: 'CommonJS'
      }));
  return tsResult.js.pipe(gulp.dest('built/'));
});
 
gulp.task('nodemon', ['buildBackEnd', 'buildFrontEnd', 'watch'], function(){
    nodemon({
        script: './built/backend/app.js'
    }).on('restart', function(){
        console.log('nodemon restarted app.js');
    })
})
 
gulp.task('watch', function() {
  gulp.watch('src/**/*.ts', ['buildBackEnd', 'buildFrontEnd']);
});
 
gulp.task('serveprod', function() {
  connect.server({
    root: '/',
    port: process.env.PORT || 5000, // localhost:5000
    livereload: false
  });
});
 
gulp.task('default', ['buildBackEnd', 'buildFrontEnd']);