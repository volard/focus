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
  gulp.src(['*.html', '*.js', '*.css'])
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

gulp.task('clean-js', async () => {
  gulp.src('index.js')
    .pipe(minify({
      noSource: true,
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('clean-css', async () => gulp.src('./style.css')
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false,
  }))
  .pipe(cleanCSS({ compatibility: 'ie8' }))
  .pipe(gulp.dest('build/')));

gulp.task('clean-html', async () => gulp.src('./index.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
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

gulp.task('build', async () => {
  gulp.watch('*.html', gulp.parallel('clean-html'));
  gulp.watch('*.css', gulp.parallel('clean-css'));
  gulp.watch('*.js', gulp.parallel('clean-js'));
}
);


/* ------------------------------------*\
  # ASYNC SET
\*------------------------------------*/

gulp.task('watch', () => {
  gulp.watch(['*.html', '*.js', '*.css'], gulp.parallel('on-code-change'));
});

gulp.task('default', gulp.parallel('watch', 'browser-sync'));
