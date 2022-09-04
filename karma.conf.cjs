const Path = require("path");

// Karma configuration file, see link for more information
// https://karma-runner.github.io/6.4/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine', 'karma-typescript'],
    files: [
      // tests
      { pattern: 'src/**/*.karma-spec.ts', type: 'module' },
      // files tests rely on
      { pattern: "src/**/*.ts", type: "module", included: false },
      { pattern: "test/**/*.ts", type: "module", included: false }
    ],
    preprocessors: {
      '**/*.ts': 'karma-typescript'
    },
    karmaTypescriptConfig: {
      tsconfig: 'tsconfig.json',
      bundlerOptions: {
        entrypoints: /\.karma-spec\.ts$/,
        sourceMap: true
      },
      coverageOptions: {
        // Set instrumentation to false for better debugging;
        // Enable for coverage reporting.
        instrumentation: false
      }
    },
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },

    reporters: ['mocha', 'kjhtml', 'karma-typescript'],

    port: 9876,
    colors: true,
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeDebugging'], // 'ChromeHeadless', 'ChromeDebugging'
    singleRun: false,
    customLaunchers: {
      ChromeDebugging: {
        base: 'Chrome',
        // Explicitly specified to launch chrome in Debug mode
        flags: ['--remote-debugging-port=9222']
      }
    },

    concurrency: Infinity,

    // coverageIstanbulInstrumenter: {
    //   esModules: true
    // },

    // coverageIstanbulReporter: {
    //   dir: Path.join(__dirname, "dist/test/coverage"),
    //   reports: ['cobertura', 'text-summary', 'html'],
    //   fixWebpackSourcePaths: true,
    //   skipFilesWithNoCoverage: false,
    //   // verbose: true
    // },
  });
};
