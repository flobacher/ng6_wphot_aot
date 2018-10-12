const path = require('path');

module.exports = {
    entry: {
        polyfills: './src/client/app/polyfills.ts',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    watchOptions: {
        ignored: ['dist/**/*.*', 'node_modules'],
    },
    optimization: {
        splitChunks: {
            // Apply optimizations to all chunks, even initial ones (not just the
            // ones that are lazy-loaded).
            chunks: 'all',
        },
        // Pull the Webpack runtime out into its own bundle file so that the
        // contentHash of each subsequent bundle will remain the same as long as the
        // source code of said bundles remain the same.
        runtimeChunk: 'single',
    },
};
