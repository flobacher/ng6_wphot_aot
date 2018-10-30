const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

console.log('DEV build');

module.exports = (env = {}) => {
    const common = require('./webpack.config.common')(env);

    const hmr = !!env.hmr;
    let appEntry = ['core-js/es7/reflect'];
    if (hmr) {
        appEntry.unshift(
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
        );
    }

    return merge.strategy({
        'entry.app': 'prepend',
    })(common, {
        mode: 'development',
        entry: {
            app: appEntry,
        },
        output: {
            filename: '[name].js',
        },
        devtool: 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: [
                        {
                            loader: 'ts-loader',
                        },
                        {
                            loader: 'angular2-template-loader',
                        },
                    ],
                    exclude: [/\.(spec|e2e)\.ts$/],
                },
            ],
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            // new webpack.NamedModulesPlugin(),
            new webpack.ContextReplacementPlugin( // remove webpack warnings `Critical dependency: the request of a dependency is an expression`
                // The (\\|\/) piece accounts for path separators in *nix and Windows
                /(.+)?angular(\\|\/)core(.+)?/,
                path.resolve(__dirname, '../src'),
            ),
        ],
    });
};
