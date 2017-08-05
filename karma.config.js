module.exports = function (config) {
    config.set({
        autoWatch: false,
        basePath: './tests',
        browsers: ['Firefox'],
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
        reporters: ['spec'],
        singleRun: true,
        webpack: require('./webpack.config.js'),
        webpackMiddleware: {
            stats: 'errors-only'
        }
    })
};
