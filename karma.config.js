module.exports = function (config) {
    config.set({
        autoWatch: true,
        basePath: './tests',
        browsers: ['Chrome'],
        colors: true,
        frameworks: ['jasmine'],
        files: [
            '**/*.spec.js'
        ],
        exclude: [],
        logLevel: config.LOG_INFO,
        port: 9876,
        preprocessors: {
            '**/*.spec.js': ['webpack', 'sourcemap']
        },
        reporters: ['progress'],
        singleRun: false,
        webpack: require('./webpack.config.js'),
        webpackMiddleware: {
            stats: 'errors-only'
        }
    })
};
