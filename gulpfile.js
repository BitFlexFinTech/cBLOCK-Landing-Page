import gulp from 'gulp';
import sync from 'browser-sync';
import pug from 'gulp-pug';
import flatten from 'gulp-flatten';
import gulpSass from 'gulp-sass';
import concat from 'gulp-concat';
import sass from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import uglify from 'gulp-uglify';

export const html = () => {
  return gulp.src('src/pages/**/*.pug')
    .pipe(pug({
      pretty: true,
    }))
    .pipe(flatten())
    .pipe(gulp.dest('dist/'))
    .pipe(sync.stream());
};

export const styles = () => {
  return gulp.src('src/**/*.scss')
    .pipe(gulpSass(sass).sync({
      outputStyle: 'compressed',
    }))
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(concat('index.min.css'))
    .pipe(gulp.dest('dist'))
    .pipe(sync.stream());
};

export const scripts = () => {
  return gulp.src('src/**/*.js')
    .pipe(uglify())
    .pipe(flatten())
    .pipe(gulp.dest('dist'))
    .pipe(sync.stream());
};

export const copy = () => {
  return gulp.src([
    'src/fonts/**/*',
    'src/images/**/*',
  ], {
    base: 'src',
    allowEmpty: true,
  })
    .pipe(gulp.dest('dist'))
    .pipe(sync.stream({
      once: true
    }));
};

export const server = () => {
  sync.init({
    ui: false,
    notify: false,
    server: {
      baseDir: 'dist',
    }
  });
};

export const watch = () => {
  gulp.watch('src/**/*.pug', gulp.series(html));
  gulp.watch('src/**/*.scss', gulp.series(styles));
  gulp.watch('src/**/*.js', gulp.series(scripts));
  gulp.watch([
    'src/fonts/**/*',
    'src/images/**/*',
  ], gulp.series(copy));
};

export const build = gulp.series(
  gulp.parallel(
    html,
    styles,
    scripts,
    copy,
  )
);

export default gulp.series(
  gulp.parallel(
    html,
    styles,
    scripts,
    copy,
  ),
  gulp.parallel(
    watch,
    server,
  ),
);
