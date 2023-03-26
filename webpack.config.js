const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("node:path");
const { DefinePlugin } = require("webpack");

module.exports = {
    entry: "./src/ts/index.ts",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/bundle.js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    to({ context, absoluteFilename }) {
                        return `css/${path.relative(context, absoluteFilename)}`;
                    },
                    from: "src/css",
                },
            ],
        }),
        new DefinePlugin({
            'process.env': {
                SERVICE_URL: JSON.stringify(process.env["SERVICE_URL"] ?? "http://localhost:3000")
            }
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        compress: true,
        port: 9000,
    },
}
