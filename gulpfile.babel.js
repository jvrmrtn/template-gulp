// JAVASCRIPT
import gulp from 'gulp';
import babelify from 'babelify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import terser from 'gulp-terser';

// PUG
import pug from 'gulp-pug';

// SASS
import gulpSass from 'gulp-sass';
import dartSass from 'sass';

// CLEAN CSS
import clean from 'gulp-purgecss';

// VARIABLES
const babelConfig = {
  presets: ['@babel/preset-env'],
  plugins: [['@babel/transform-runtime']],
};
const production = false;

const sass = gulpSass(dartSass);

gulp.task('babel', () =>
  browserify(['./src/js/index.js'])
    .transform(babelify.configure(babelConfig))
    .bundle()
    .pipe(source('scripts.min.js'))
    .pipe(buffer())
    .pipe(terser())
    .pipe(gulp.dest('./public/js')),
);

gulp.task('views', () =>
  gulp
    .src('./src/views/pages/*.pug')
    .pipe(
      pug({
        pretty: !production,
      }),
    )
    .pipe(gulp.dest('./public')),
);

gulp.task('sass', () =>
  gulp
    .src('./src/scss/styles.scss')
    .pipe(
      sass({
        outputStyle: 'compressed',
      }),
    )
    .pipe(gulp.dest('./public/css')),
);

gulp.task('clean', () =>
  gulp
    .src('./public/css/styles.css')
    .pipe(
      clean({
        content: ['./public/*.html'],
      }),
    )
    .pipe(gulp.dest('./public/css')),
);

gulp.task('default', () => {
  gulp.watch('./src/js/*.js', gulp.series('babel'));
  gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('./src/views/**/*.pug', gulp.series('views'));
});
