var config = require("./webpack.config");
var path = require("path");

module.exports = Object.assign(config, {
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 3000,
    }
})