
const config = {
	htmloptions : {//压缩配置，模块化思想
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
   },
   serveroptions: {// 热更新服务
        root: './dist',
        port: 8000,
        livereload: true 
   },
   pages:['index','list','register','show','goods'],
   cssoptions: {//css配置
   		'index':{//index页面的css
   			'common': [//index页面处理之后的common.min.css需要合并的文件
   				'./src/stylesheets/reset.css',
   				'./src/views/index/stylesheets/common/*.css'
   			],
   			//index页面处理之后的index.min.css需要合并的文件
   			'index':'./src/views/index/stylesheets/index/*.css'
   		},
   		'list':{
   			'list':[
   				'./src/stylesheets/reset.css',
   				'./src/views/list/stylesheets/list.css'
   			]
		},
		'register':{
			'register':[
				'./src/stylesheets/reset.css',
				'./src/views/register/stylesheets/register.css'
			]
		},
		 'show':{
			'show':[
				'./src/stylesheets/reset.css',
				'./src/views/show/stylesheets/show.css'
			]
		 },
		 'goods':{
			'goods':[
				'./src/stylesheets/reset.css',
				'./src/views/goods/stylesheets/goods.css'
			]
	 	}
		   
   },
   jsoptions:{//js配置
   		'index':{
   				index :'./src/views/index/javascripts/index.js',
				vendor :'./src/views/index/javascripts/vendor.js'
   		},
		   'list': './src/views/list/javascripts/list.js',
		   'register': './src/views/register/javascripts/register.js',
		   'show': './src/views/show/javascripts/show.js',
		   'goods': './src/views/goods/javascripts/goods.js'
   }
}
module.exports = config //把config暴露出去，只能暴露一个，但是可以暴露一个数组