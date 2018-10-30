const NODE_ENV = process.env.NODE_ENV || 'production';

module.exports = env => {
    return require('./webpack.config.' + (NODE_ENV === 'production' ? 'prod' : 'dev'))(env);
};
