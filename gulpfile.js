const gulp = require('gulp')
const cssmin = require('gulp-clean-css') // 压缩css
const cssver = require('gulp-make-css-url-version') // 给css文件里引用url加版本号（根据引用文件的md5生产版本号）
const rev = require('gulp-rev-append')  // gulp-rev-append给页面的引用添加版本号，清除页面引用缓存
/**
 * 文件配置信息
 */
const cssSrc = 'src/css/**/*.css'
const cssDest = 'dist/css'

const htmlSrc = 'src/html/**/*.html'
const htmlDest = 'dist/html'

/**
 * 压缩 css 文件,并给引用 url 添加版本号避免缓存
 */
gulp.task('cssmin', function () {
  gulp.src(cssSrc)
    .pipe(cssver()) // 给 css 文件里引用文件加版本号
    .pipe(cssmin({
      advanced: false, // 类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
      compatibility: 'ie7', // 保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
      keepBreaks: true, // 类型：Boolean 默认：false [是否保留换行]
      keepSpecialComments: '*'
    // 保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
    }))
    .pipe(gulp.dest(cssDest))
})

/**
 * 给页面的引用添加版本号,清除页面应用缓存。
 */
gulp.task('rev', function() {
  gulp.src(htmlSrc)
  .pipe(rev())
  .pipe(gulp.dest(htmlDest))
})

gulp.task('default', ['cssmin', 'rev'])