var webpack = require('webpack');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var port = 8000;
var config = {
    entry: {
        'index': "./index.js",
        'admin': "./admin.js",
        ///endor: ['react','react-dom','iscroll','jquery']
    },
    output: {
        //publicPath: './static/js',
        path: './assets/js',
        filename: "[name].js",
        chunkFilename: "[name].js"
    },
    devServer: {
        inline: true,
        port: port,
        hot: true,
        //historyApiFallback: true 
    },
    externals: {
        //'react':'React',
        //'react-dom':'ReactDOM',
        //'jquery':"$",
        // 'iscroll':'IScroll'
    },

    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js',
        },
        extensions: ['', '.js', '.vue'],
    },

    plugins: [
        /* new webpack.optimize.CommonsChunkPlugin({
            name:"vendor",  
         }),*/

        new OpenBrowserPlugin(
            { 
                url: 'http://localhost:'+port
            }
        )
    ],
    module: {

        rules:[
            {
                use:[
                    {loader: 'vue-loader'},
                    {
                        loader: 'iview-loader',
                        options: {
                            prefix: false
                        }
                    }
                ]
            }
        ],
        loaders: [{
            test: /\.js|\.es6$/,
            exclude: /node_modules/,
            loaders: ['babel-loader']
        }, {
            test: /\.vue$/,
            exclude: /node_modules/,
            loaders: ['vue-loader']
        }, {
            test: /\.less$/,
            exclude: /node_modules/,
            loader: 'style-loader!css-loader!less-loader'
        }, {
            test: /\.(css)$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.(eot|svg|ttf|woff|woff2|png)\w*/,
            loader: 'file'
        }]
    },
    babel: {

    }

}

module.exports = config;