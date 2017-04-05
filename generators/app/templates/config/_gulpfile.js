/* File: gulpfile.js */
'use strict';
let gulp = require('gulp');
let sass = require('gulp-sass');
let settings = {
  sassDir: './public/assets/sass',
  cssDir: './public/assets/css'
};
/**
 * Compile SASS to CSS
 */
gulp.task('sass', function () {
  gulp.src(settings.sassDir + '/**/*.scss')
    .pipe(sass.sync({
        outputStyle: 'expand'
      })
      .on('error', sass.logError))
    .pipe(gulp.dest(settings.cssDir));
});
gulp.task('default', function () {
  console.log('gulp started');
  // gulp.watch(settings.source_dir+settings.sassDir+'/**/*.scss',['css']);
  // return gulp.watch('./files/source/js/*.js', ['js:clean']);
  // return gulp.watch(settings.source_dir+'/js/*.js',['js:clean']);
});
