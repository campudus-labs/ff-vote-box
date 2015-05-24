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
var babel = require('gulp-babel');
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var url = require('url');
var proxy = require('proxy-middleware');
var nodemon = require('gulp-nodemon');
var jasmine = require('gulp-jasmine');

gulp.task('sass', sassCompile);
gulp.task('assets', assetCopy);
gulp.task('scripts', scriptCompile);
gulp.task('clean', clean);

gulp.task('build:frontend', ['sass', 'assets', 'scripts']);
gulp.task('build:server', serverScripts);
gulp.task('build', ['build:frontend', 'build:server']);

gulp.task('reload:frontend', ['build:frontend'], reload);
gulp.task('dev', ['build'], watchServers);
gulp.task('dev:server', ['build:server'], backendServer);

gulp.task('test:frontend', ['build'], testFrontend);
gulp.task('test:frontend:watch', ['build'], testFrontendWatch);
gulp.task('test:server:compile', ['build:server'], testBackendCompile);
gulp.task('test:server', ['test:server:compile'], testServer);
gulp.task('test:server:watch', ['test:server'], testBackendWatch);

gulp.task('test', ['test:server', 'test:frontend']);
gulp.task('test:watch', ['test:server:watch', 'test:frontend:watch']);

gulp.task('default', ['build']);


function sassCompile() {
  return gulp.src('src/frontend/scss/style.scss')
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
  return browserify('./src/frontend/js/app.jsx', {debug : true})
    .transform(babelify)
    .transform(reactify)
    .require('./src/frontend/js/app.jsx', {entry : true})
    .bundle()
    .on('error', function (err) {
      console.log('error', err);
      this.emit('end');
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps : true}))
    .pipe(sourcemaps.write('.', {sourceRoot : __dirname}))
    .pipe(gulp.dest('./dist/frontend/js'));
}

function serverScripts() {
  return gulp.src('src/server/**/*.js')
    .pipe(plumber({
      errorHandler : function (error) {
        console.log(error.message);
        this.emit('end');
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.', {sourceRoot : __dirname}))
    .pipe(gulp.dest('dist/server'));
}

function assetCopy() {
  return gulp.src(['src/frontend/**', '!src/frontend/js/**', '!src/frontend/scss', '!src/frontend/scss/**'])
    .pipe(gulp.dest('dist/frontend/'));
}

function testFrontend(done) {
  karma.start({
    configFile : __dirname + '/karma.conf.js',
    autoWatch: false,
    singleRun: true,
    proxies : {
      '/api' : 'http://localhost:8181'
    }
  }, done);
}

function testFrontendWatch(done) {
  gulp.watch(['src/frontend/**'], {}, ['build:frontend']);
  gulp.watch(['src/server/**'], {}, ['build:server']);

  karma.start({
    configFile : __dirname + '/karma.conf.js',
    autoWatch: true,
    singleRun: false,
    proxies : {
      '/api' : 'http://localhost:8181'
    }
  }, done);
}

function testBackendCompile() {
  return gulp.src('src/test/server/**')
    .pipe(babel())
    .pipe(gulp.dest('dist/test-server'));
}

function testServer() {
  return gulp.src('dist/test-server/**/*Spec.js')
    .pipe(jasmine());
}

function testBackendWatch() {
  gulp.watch(['src/server/**', 'src/test/server/**'], {}, ['test:server']);
}

function watchServers() {
  frontendServer();
  backendServer();
}

function backendServer() {
  gulp.watch(['src/server/**', 'src/test/server/**'], {}, ['build:server']);

  nodemon({
    script : './dist/server/app.js',
    watch : './dist/server/app.js'
  });
}

function frontendServer() {
  var proxyOptions = url.parse('http://localhost:8181/');
  proxyOptions.route = '/api';

  browserSync({
    server : {
      baseDir : 'dist/frontend',
      middleware : [proxy(proxyOptions)]
    },
    open : false
  });

  gulp.watch(['src/frontend/**', 'src/frontend/js/**', 'src/frontend/scss/**/*.scss'], {}, ['reload:frontend']);
}

function clean(cb) {
  del(['./dist/'], cb);
}
