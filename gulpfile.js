/* ------------------------------------*\
    # CONNECT MODULES
\*------------------------------------*/

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');
const browserSync = require('browser-sync');


/* ------------------------------------*\
    # TASKS DECLARATION
\*------------------------------------*/

gulp.task('on-code-change', async () => {
  gulp.src(['src/*.html', 'src/*.js', 'src/*.css'])
      .pipe(browserSync.reload({ stream: true }))
});

gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: './',
    },
    notify: false,
  });
});

/* ------------------------------------*\
  #  BUILD SET
\*------------------------------------*/

gulp.task('clean-js', async () => { gulp.src('src/index.js')
    .pipe(minify({
      noSource: true,
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('clean-css', async () => gulp.src('src/style.css')
  .pipe(autoprefixer({
    browsers: [
      'last 25 versions'
    ],
    cascade: false,
  }))
  .pipe(cleanCSS())
  .pipe(gulp.dest('build/')));

gulp.task('clean-html', async () => gulp.src('src/index.html')
  .pipe(htmlmin({ 
    collapseWhitespace: true,
    processConditionalComments: true 
  }))
  .pipe(gulp.dest('build/')));

gulp.task('imagemin', async () => {
  gulp.src('images/**/**/*')
    .pipe(imagemin({
      verbose: true,
      interlaced: true,
      progressive: true,
    }))
    .pipe(gulp.dest('build/'));
});




/* ------------------------------------*\
  # ASYNC SET
\*------------------------------------*/

gulp.task('watch', () => {
  gulp.watch(['src/*.html', 'src/*.js', 'src/*.css'], gulp.parallel('on-code-change'));
});

gulp.task('default', gulp.parallel('watch', 'browser-sync'));

gulp.task('build', gulp.parallel('clean-js', 'clean-css', 'clean-html'));