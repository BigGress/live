var path = require("path");
var webpack = require("webpack");
var CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        index: "./src/index.ts",
        player: "./src/player.ts"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {test: /\.ts$/, use: "ts-loader"},
        ]
    },
    plugins: [
     new CopyWebpackPlugin([
        {
            from: "./src/index.html",
            to: ""
        },
        {
            from: "./src/index.css",
            to: ""
        },
        {
            from: "./src/player.html",
            to: ""
        }
     ])
    ]
}