var gulp = require('gulp');

var Path = require('path');
var compass = require('gulp-compass');
var minifyCss = require('gulp-minify-css');
var del = require('del');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var plumber = require('gulp-plumber');
var karma = require('karma').server;
var browserify = require('browserify');
var babelify = require('babelify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var url = require('url');
var proxy = require('proxy-middleware');

gulp.task('sass', sassCompile);
gulp.task('assets', assetCopy);
gulp.task('scripts', scriptCompile);
gulp.task('clean', clean);

gulp.task('reloader', ['build'], reload);
gulp.task('dev', ['build'], server);
gulp.task('test', ['build'], test);
gulp.task('testWatch', ['build'], testWatch);

gulp.task('build', ['sass', 'assets', 'scripts']);
gulp.task('default', ['build']);


function sassCompile() {
  return gulp.src('src/main/scss/main.scss')
    .pipe(plumber({
      errorHandler : function (error) {
        console.log(error.message);
        this.emit('end');
      }
    }))
    .pipe(compass({
      project : Path.join(__dirname),
      css : 'dist/css',
      sass : 'src/main/scss',
      image : 'src/main/img'
    }))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css'));
}

function scriptCompile() {
  return browserify()
    .transform(babelify)
    .transform(reactify)
    .add('./src/main/js/app.js')
    .bundle()
    .on('error', function (err) {
      console.log('error', err);
      this.emit('end');
    })
    .pipe(source('app.js'))
    .pipe(gulp.dest('dist/js/'));
}

function assetCopy() {
  return gulp.src(['src/main/**', '!src/main/js/**', '!src/main/scss', '!src/main/scss/**'])
    .pipe(gulp.dest('dist/'));
}

function test(done) {
  karma.start({
    configFile : __dirname + '/karma.conf.js',
    action : 'run',
    proxies : {
      '/api' : 'http://localhost:8181'
    }
  }, done);
}

function testWatch(done) {
  karma.start({
    configFile : __dirname + '/karma.conf.js',
    action : 'watch',
    proxies : {
      '/api' : 'http://localhost:8181'
    }
  }, done);
}

function server() {
  var proxyOptions = url.parse('http://localhost:8181/');
  proxyOptions.route = '/api';

  browserSync({
    server : {
      baseDir : 'dist',
      middleware : [proxy(proxyOptions)]
    }
  });

  gulp.watch(['src/main/**', 'src/main/js/**', 'src/main/scss/**/*.scss'], {}, ['reloader']);

  //gulp.src('src/test/**/*Spec.js').pipe(karma({
  //  configFile : 'karma.conf.js',
  //  action : 'watch'
  //}));
}

function clean(cb) {
  del(['dist/'], cb);
}
