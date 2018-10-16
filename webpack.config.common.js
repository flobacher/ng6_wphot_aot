const path = require('path');

module.exports = {
    entry: {
        app: ['./src/client/app/polyfills.ts', './src/client/app/index.ts'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    module: {
        rules: [
            // in prod the `@ngtools/webpack` loader, in dev the `angular2-template-loader` will replace the @Component()
            // "templateUrl" and "styleUrls" with inline "require()" calls. As such, we
            // need the raw-loader so that require() will know how to load .html and .css
            // files as plain-text.
            {
                test: /\.(html|css)$/,
                loader: 'raw-loader',
                exclude: /\.async\.(html|css)$/,
            },
            {
                // Mark files inside `@angular/core` as using SystemJS style dynamic imports.
                // Removing this will cause deprecation warnings to appear.
                // The [\\|\/] piece accounts for path separators in *nix and Windows
                test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
                parser: { system: true },
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
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
