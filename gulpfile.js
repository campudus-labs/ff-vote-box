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

gulp.task('frontendReload', ['build'], reload);
gulp.task('dev', ['build'], frontendServer);
gulp.task('test', ['build'], test);
gulp.task('testWatch', ['build'], testWatch);

gulp.task('build:frontend', ['sass', 'assets', 'scripts']);
gulp.task('build:server', serverScripts);
gulp.task('build', ['build:frontend', 'build:server']);
gulp.task('default', ['build']);


function sassCompile() {
  return gulp.src('src/frontend/scss/main.scss')
    .pipe(plumber({
      errorHandler : function (error) {
        console.log(error.message);
        this.emit('end');
      }
    }))
    .pipe(compass({
      project : Path.join(__dirname),
      css : 'dist/frontend/css',
      sass : 'src/frontend/scss',
      image : 'src/frontend/img'
    }))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/frontend/css'));
}

function scriptCompile() {
  return compiledEs6('./src/frontend/js/app.js', 'app.js', './dist/frontend/js');
}

function serverScripts() {
  return compiledEs6('./src/server/js/app.js', 'app.js', './dist/server/');
}

function compiledEs6(inFile, outFile, outDir) {
  return browserify()
    .transform(babelify)
    .transform(reactify)
    .add(inFile)
    .bundle()
    .on('error', function (err) {
      console.log('error', err);
      this.emit('end');
    })
    .pipe(source(outFile))
    .pipe(gulp.dest(outDir));
}

function assetCopy() {
  return gulp.src(['src/frontend/**', '!src/frontend/js/**', '!src/frontend/scss', '!src/frontend/scss/**'])
    .pipe(gulp.dest('dist/frontend/'));
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

function frontendServer() {
  var proxyOptions = url.parse('http://localhost:8181/');
  proxyOptions.route = '/api';

  browserSync({
    server : {
      baseDir : 'dist/frontend',
      middleware : [proxy(proxyOptions)]
    }
  });

  gulp.watch(['src/frontend/**', 'src/frontend/js/**', 'src/frontend/scss/**/*.scss'], {}, ['frontendReload']);

  //gulp.src('src/test/**/*Spec.js').pipe(karma({
  //  configFile : 'karma.conf.js',
  //  action : 'watch'
  //}));
}

function clean(cb) {
  del(['dist/'], cb);
}
