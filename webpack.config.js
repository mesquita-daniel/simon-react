const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/

            },
            {
                test: /\.(png|svg|jpg|gif|mp3)$/,
                use: [
                    "file-loader"
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    watch: true,
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    plugins: [
        new MiniCssExtractPlugin()
    ]
    
}