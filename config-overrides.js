const { override, addWebpackResolve } = require('customize-cra');

module.exports = override(
    addWebpackResolve({
        fallback: {
            'stream': require.resolve('stream-browserify'),
        },
    })
);