const path = require('path');
const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const replace = require('gulp-replace');

const buildPath = path.join(__dirname, '../../lib');

function buildWxss() {
  const pxRegExp = /(\d*\.?\d+)px(?!.*\/\*\s+pxtorpx off\s+\*\/)/gi;
  const pxReplace = pixel => {
    const p = parseFloat(pixel);
    return p === 0 ? 0 : `${2 * p}rpx`;
  };

  return src([
    './lib/**/*.scss',
    '!./lib/scss/**/*.scss',
  ])
    .pipe(replace(pxRegExp, pxReplace))
    .pipe(
      sass({
        errLogToConsole: true,
        outputStyle: 'compact',
        includePaths: './lib/scss'
      }).on('error', sass.logError)
    )
    .pipe(rename({ extname: '.wxss' }))
    .pipe(dest(buildPath));
}

module.exports = buildWxss;
