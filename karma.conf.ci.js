'use strict';
 
var path = require('path');
var conf = require('./gulp/conf');
 
var _ = require('lodash');
var wiredep = require('wiredep');
 
var pathSrcHtml = [
  path.join(conf.paths.src, '/**/*.html'),
  path.join(conf.paths.src_test, '/**/*.html')
];
 
function listFiles() {
  var wiredepOptions = _.extend({}, conf.wiredep, {
    dependencies: true,
    devDependencies: true
  });
 
  return wiredep(wiredepOptions).ts
    .concat([
      path.join(conf.paths.src, '/app/**/*.module.ts'),
      path.join(conf.paths.src, '/app/**/*.ts'),
      path.join(conf.paths.src, '/**/*.spec.ts'),
      path.join(conf.paths.src, '/**/*.mock.ts'),
      path.join(conf.paths.src_test, '/app/**/*.module.ts'),
      path.join(conf.paths.src_test, '/app/**/*.ts'),
      path.join(conf.paths.src_test, '/**/*.spec.ts'),
      path.join(conf.paths.src_test, '/**/*.mock.ts')
    ])
    .concat(pathSrcHtml);
}
 
module.exports = function(config) {
 
  var configuration = {
    files: listFiles(),
 
    singleRun: true,
    
    colors:    false,
 
    autoWatch: false,
 
    ngHtml2JsPreprocessor: {
      stripPrefix: conf.paths.src + '/',
      moduleName: 'TODO_PUT_HERE_YOUR_MODULE_NAME'
    },
 
    logLevel: 'WARN',
 
    frameworks: ['jasmine', 'angular-filesort'],
 
    angularFilesort: {
      whitelist: [path.join(conf.paths.src, '/**/!(*.html|*.spec|*.mock).ts'), path.join(conf.paths.src_test, '/**/!(*.html|*.spec|*.mock).ts')]
    },
 
    browsers: ['PhantomJS'],
 
    sonarQubeUnitReporter: {
      sonarQubeVersion: 'LATEST',
      outputFile: 'reports/ut_report.xml',
      useBrowserName: false
    },
 
    plugins: [
      'karma-phantomjs-launcher',
      'karma-angular-filesort',
      'karma-coverage',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor',
      'karma-sonarqube-unit-reporter'
    ],
 
    coverageReporter: {
      type : 'lcov',
      dir : 'reports',
      subdir : 'coverage'
    },
 
    reporters: ['progress', 'sonarqubeUnit', 'coverage'],
    
    preprocessors: {
      'src/**/*.ts':   ['coverage'],
      'test/**/*.ts':   ['coverage']
    }
  };
 
  config.set(configuration);
};