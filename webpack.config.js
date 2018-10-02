const webpack = require('webpack');

module.exports = {
    entry: './src/nfas-booking-app.jsx',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                use: [
                    { loader: 'url-loader?limit=100000' }
                    ]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'nfas-booking-app.js'
    },
    devServer: {
        contentBase: './dist',
        hot: true
    }
};