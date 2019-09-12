const {src, dest, parallel, series, task, watch} = require('gulp');
// const watch = require('gulp-watch');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const clean = require('gulp-clean');
const flatten = require('gulp-flatten');
const wrap = require('gulp-wrap-file');
const uglifyes = require('uglify-es');
const composer = require('gulp-uglify/composer');
const uglify = composer(uglifyes, console);
//const uglify = require('gulp-uglify');

const fs = require('fs');
const path = require('path');
const es = require('event-stream');
const {spawn} = require('child_process');

const DIST_PATH = 'WebContent/public/packages';

function formatString(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
}

function _frameworkWidget() {
    var SRC_PATH = "WebContent/framework/widget"
    return src([path.join(SRC_PATH, 'Common.js'), path.join(SRC_PATH, 'Utils.js'), path.join(SRC_PATH, '*.js')])
        .pipe(concat('widget.pack.js'))
        .pipe(src(path.join(SRC_PATH, '*.xhtml')))
        .pipe(dest(path.join(DIST_PATH, 'framework/widget')));
}

function _commonDom() {
    return src('WebContent/framework/*.js')
        .pipe(dest(path.join(DIST_PATH, 'framework')));
}

function _frameworkstyle() {
    return src('WebContent/framework/style/**/*')
        .pipe(dest(path.join(DIST_PATH, 'framework/style')));
}

var _framework = parallel(_frameworkWidget, _commonDom, _frameworkstyle);
exports.framework = _framework;

function _component(cb) {
    function listDir(dir) {
        return fs.readdirSync(dir)
        .filter(function(file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
    }
    var SRC_PATH = 'WebContent/component';
    var dirs = listDir(SRC_PATH);
    var counter = 0;
    function onDone() {
        counter ++;
        if (counter == dirs.length) {
            cb();
        }
    }
    var js_pack = dirs.map(function(folder) {
        console.log("Pack:", folder);
        return src(path.join(SRC_PATH, folder, '*.js'))
                    .pipe(wrap({wrapper: function(content, file) {
                        var file_name = file.modName.replace(/^.*[\\\/]/, '');
                        if (folder != 'common') return formatString('{0}\n_pkg.{2}.{1} = {1};', content, file_name, folder);
                        else return content;
                    }}))
                    .pipe(concat(folder + '.pack.js'))
                    .pipe(wrap({wrapper: function(content, file) {
                        if (folder != 'common') return ('_pkg.' + folder + ' = {};\n' + content);
                        else return content;
                    }}))
                    // .pipe(uglify())
                    .pipe(dest(path.join(DIST_PATH, 'component', folder)))
                    .pipe(src(path.join(SRC_PATH, folder, '*.xhtml')))
                    .pipe(dest(path.join(DIST_PATH, 'component', folder)))
                    .on('end', onDone);
    });
    return es.concat.apply(null, js_pack);
}
exports.component = _component;

exports.clean = function() {
    return src(path.join(DIST_PATH, '*'), {read: false})
        .pipe(clean({force: true}));
}

exports.install = parallel(_framework, _component);

exports.watch = function() {
    watch('WebContent/component/**/*', _component);
    watch('WebContent/framework/**/*', _framework);
}
