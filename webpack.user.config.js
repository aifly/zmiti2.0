var path = require('path');
//const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
//const HtmlWebpackPlugin = require('html-webpack-plugin');
var port = 8001;
//var webpack = require('webpack');
//const VueLoaderPlugin = require('vue-loader/lib/plugin')
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
	// 定义模块引用的绝对路径前缀
	context: path.resolve(__dirname, './'),

	// 输入配置
	entry: {
		index: './index.js',
	},
	optimization: {
		splitChunks: {
			chunks: "all",
			cacheGroups: {
				commons: {
					chunks: "initial",
					minChunks: 2,
					maxInitialRequests: 5, // The default limit is too small to showcase the effect
					minSize: 0,// This is example is too small to create commons chunks,
					reuseExistingChunk: true // 可设置是否重用该chunk
				},
				'vue': {
					test: /vue/, // 直接使用 test 来做路径匹配
					chunks: "initial",
					name: "vue",
					enforce: true,
					reuseExistingChunk: true // 可设置是否重用该chunk
				},
				'iview': {
					test: /iview/, // 直接使用 test 来做路径匹配
					chunks: "initial",
					name: "iview",
					enforce: true,
					reuseExistingChunk: true // 可设置是否重用该chunk
				},
			}
		},
		runtimeChunk: {
			name: "manifest"
		}
	},
	// 输出配置
	output: {
		// 输出目录
		path: path.resolve(__dirname, './assets/js'),
		// 输出文件名 name 为 entry 的 key 值，也可以加上 hash 值， 如：[name].[hash:8].js
		filename: '[name].js',
		// 构建生成的 js 在html中引用时的路径
		publicPath: process.env.WEBPACK_DEV_SERVER ? "/" : '/assets/js/',
		//publicPath: '/'
	},

	// 模块引用配置
	resolve: {
		// 定义模块查找的后缀，方便在代码引用时可省略后缀
		extensions: ['.js', '.vue', '.json'],
		// 定义引用路径别名 配置别名可以加快webpack查找模块的速度      
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			//'@': resolve('src'),
		}
	},


	// 模块加载配置
	module: {
		// 指定 不同的模块使用不同的加载器处理
		// 以 .css 结尾的文件，使用 css-loader 解析css模块，使用 style-loader 将生成的 css 内容以标签的形式添加到 HTML 文档中
		noParse: [/ali-oss/],
		rules: [{
			test: /\.vue$/,
			use: [{
				loader: 'vue-loader',
				options: {}
			},
			{
				loader: 'iview-loader',
				options: {
					prefix: false
				}
			}
			]
		}, {
			test: /\.scss$/,
			use: [
				"style-loader", // creates style nodes from JS strings
				"css-loader", // translates CSS into CommonJS
				"scss-loader" // compiles Sass to CSS, using Node Sass by default
			]
			}, {
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							// you can specify a publicPath here
							// by default it uses publicPath in webpackOptions.output
							publicPath: './',
							hmr: process.env.NODE_ENV === 'development',
						},
					},
					'css-loader',
				],
			},
		{
			test: /\.less$/,
			exclude: /node_modules/,
			use: [{
				loader: 'style-loader'
			},
			{
				loader: 'css-loader'
			},
			{
				loader: 'less-loader'
			}
			]
		},
		{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			options: {
				'babelrc': false,
				"plugins": [
					"dynamic-import-webpack"
				]
			}
		}, {
			test: /\.(eot|svg|ttf|woff|woff2|png)\w*/,
			loader: 'file-loader'
		}
		]
	},

	// 插件
	plugins: [
		///new WebpackDeepScopeAnalysisPlugin(),
		///new VueLoaderPlugin(),

        /*new HtmlWebpackPlugin({
          template: './src/index.html',
          filename: 'index.html',
          title: '首页',
          hash: true,
		})*/
		// Make sure this is after ExtractTextPlugin!
		/* new PurifyCSSPlugin({
			// Give paths to parse for rules. These should be absolute!
			paths: glob.sync(path.join(__dirname, './*.html')),
		}), */
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// all options are optional
			filename: '[name].css',
			chunkFilename: '[id].css',
			ignoreOrder: false, // Enable to remove warnings about conflicting order
		}),
	],
	// 使用 HtmlWebpackPlugin 将构建好的 js/css 嵌入到模板 index.html 中

	// Web服务器配置
	devServer: {
		contentBase: './',
		host: 'localhost',
		port: port,
	}

}