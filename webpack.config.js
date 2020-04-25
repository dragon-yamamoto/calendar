module.exports = {
    mode: 'development',
    entry: {
        calendar: './src/calendar.ts',
    },
    output: {
        filename: '[name].bundle.js',
        path: __dirname + '/dist',
    },
    resolveLoader: {
        modules: ['/usr/lib/nodejs', 'node_modules'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
            },
        ],
    },
};
