const gulp = require('gulp');
const del = require('del');
const rename = require('gulp-rename');

const postcss = require('gulp-postcss');
const pug = require('gulp-pug');
const prettify = require('gulp-html-prettify');

const sass = require('gulp-sass');
const svgstore = require('gulp-svgstore');

const svgmin = require('gulp-svgmin');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

const sync = require('browser-sync');

const webpack = require('webpack-stream');


const templates = () => {
  return gulp.src('src/templates/pages/**/*.pug')
    .pipe(pug({
      basedir: 'src/templates/'
    }))
    .pipe(prettify({
      unformatted: [],
      indent_char: ' ',
      indent_size: 2
    }))
    .pipe(gulp.dest('dist'))
    .pipe(sync.stream());
};

exports.templates = templates;


const styles = () => {
  return gulp.src('src/scss/style.scss')
    .pipe(sass())
    .pipe(postcss([
      require('postcss-media-minmax'),
      require('autoprefixer'),
    ]))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(postcss([
      require('postcss-csso'),
    ]))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(sync.stream());
};

exports.styles = styles;


const scripts = () => {
  return gulp.src('src/js/index.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(sync.stream());
};

exports.scripts = scripts;


const sprite = () => {
  return gulp.src('src/img/sprite/*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('dist/assets/img/svg'));
};

exports.sprite = sprite;


const svg = () => {
  return gulp.src(['src/img/**/*.svg', '!src/img/sprite/*.svg'])
    .pipe(svgmin())
    .pipe(gulp.dest('dist/assets/img'));
};

exports.svg = svg;


const images = () => {
  return gulp.src('src/img/**/*.{png,jpg}')
    .pipe(imagemin([
      imagemin.mozjpeg({
        quality: 75,
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 5
      })
    ]))
    .pipe(gulp.dest('dist/assets/img'));
};

exports.images = images;


const genWebp = () => {
  return gulp.src('src/img/**/*.{png,jpg}')
    .pipe(webp())
    .pipe(gulp.dest('src/img'));
};

exports.genWebp = genWebp;


const copy = () => {
  return gulp.src([
    'src/fonts/**/*',
    'src/img/**/*.webp',
    '!src/img/sprite/**'
  ], {
    base: 'src'
  })
    .pipe(gulp.dest('dist/assets/'))
    .pipe(sync.stream({
      once: true
    }));
};

exports.copy = copy;


const copyRoot = () => {
  return gulp.src([
    'src/root/*',
  ], {
      base: 'src/root'
  })
    .pipe(gulp.dest('dist'))
    .pipe(sync.stream({
      once: true
    }));
};

exports.copyRoot = copyRoot;


const clean = () => {
  return del('dist');
};


const server = () => {
  sync.init({
    ui: false,
    notify: false,
    server: {
      baseDir: 'dist'
    }
  });
};

exports.server = server;


const watch = () => {
  gulp.watch('src/templates/**/*.pug', gulp.series(templates));
  gulp.watch('src/scss/**/*.scss', gulp.series(styles));
  gulp.watch('src/js/**/*.js', gulp.series(scripts));
  gulp.watch('src/img/sprite/**/*', gulp.series(sprite));
  gulp.watch(['src/img/**/*.svg', '!src/img/sprite/**'], gulp.series(svg));
  gulp.watch('src/img/**/*.{png,jpg}', gulp.series(images));
  gulp.watch('src/fonts/**/*', gulp.series(copy));
};

exports.watch = watch;


const build = gulp.series(
  clean,
  gulp.parallel(
    templates,
    styles,
    scripts,
    sprite,
    images,
    svg,
    genWebp,
    copy,
    copyRoot,
  )
);

exports.build = build;

exports.default = gulp.series(
  build,
  gulp.parallel(
    watch,
    server,
  ),
);
