'use strict'
const path = require('path')
const IS_PRO = ['production', 'test'].includes(process.env.NODE_ENV)
module.exports = {
	// baseUrl: process.env.NODE_ENV === 'production' ? '/online/' : '/',
    publicPath:'./',//vue-cli3.3+新版本使用
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    assetsDir: 'static',
	// outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist'
	outputDir: 'dist',
	// pages:{ type:Object,Default:undfind }
	//生产环境是否生成 sourceMap 文件，一般情况不建议打开
	productionSourceMap: false,
	css:{
		// 是否使用css分离插件
		extract: IS_PRO,
		// 开启 CSS source maps，一般不建议开启
        sourceMap: false,
        // 为所有的 CSS 及其预处理文件开启 CSS Modules
        modules: false,
        // 这个选项不会影响 `*.vue` 文件
        requireModuleExtension: true
    },
	devServer: {
        host: '39.106.24.22',
        port: 8088, // 端口号
        disableHostCheck: true,
		https: false,  // https:{type:Boolean}
		open: true,    //配置自动启动浏览器
        compress: true,//配置热更新
        inline: false, // 关闭热更新
		// proxy: {       // 跨域
        //     '/api': {
        //         target: '', //API服务器的地址
        //         ws: true, //代理websockets
        //         changeOrigin: true, // 虚拟的站点需要更管origin
        //     }
		// },
		overlay: {
            warnings: false,
            errors: false
        }
	},
	pluginOptions: {
		'style-resources-loader': {
			preProcessor: 'less',
			patterns: [path.resolve(__dirname, './src/less/variables.less')]
		}
    },
    configureWebpack: {
        performance: false
    }
}