const gulp = require('gulp')
//引入封装出去的东西,因为已经模块化，所以不用加js后缀,默认找index,所以不用写
const config = require('./config')
//压缩
const htmlmin = require('gulp-htmlmin')
//热更新
const connect = require("gulp-connect")
//合并文件
const concat = require('gulp-concat')
//压缩文件
const minifycss = require('gulp-minify-css')
//加前缀
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
//合并文件操作流
const merge = require('merge-stream')
//引入webpack
const webpack = require('webpack-stream')
//自动引入依赖文件
const inject = require('gulp-inject')
//处理html
gulp.task('handle:html',function(){
	return gulp.src('./src/views/*/*.html')
		//.pipe(htmlmin(config.htmloptions))
	    .pipe(gulp.dest('./dist'))
})

//处理css 合并css 压缩css 加前缀，输出
gulp.task('handle:css',function(){
	let streams = []//定义数组存放多个文件流
	//for循环，灵活处理多个页面
	for(const page in config.cssoptions){//遍历各个页面打包的css配置文件
		for(const file in config.cssoptions[page]){
			let stream = gulp.src(config.cssoptions[page][file])
			   .pipe(autoprefixer({//自动加前缀
		            browsers: ['last 2 versions','Safari >0', 'Explorer >0', 'Edge >0', 'Opera >0', 'Firefox >=20'],//last 2 versions- 主流浏览器的最新两个版本
		            cascade: false, //是否美化属性值 默认：true 像这样：
		            //-webkit-transform: rotate(45deg);
		            //        transform: rotate(45deg);
		            remove:true //是否去掉不必要的前缀 默认：true 
		        }))
			   .pipe(concat(file + '.css'))//合并文件
			   .pipe(minifycss())//压缩文件
			   .pipe(rename({suffix:'.min'}))//重命名
	    	   .pipe(gulp.dest('./dist/'+page+'/css'))//输入到对应的目录中
	    	   //把文件流push到streams里面
	    	   streams.push(stream)
		}
	}
	return merge(...streams)//...用来展开文件流，一个一个返回,...是es6语法，是node在运行代码
})
//处理es6 -> es 合并 压缩
gulp.task('handle:js',function(){
//	return gulp.src('src/entry.js')//随便写一个，不写会报错
//		.pipe(webpack({
//			mode:'production',//设置打包模式  none development production(压缩，默认)
//			//根据项目情况选择模式
//			//单入口 单出口
////			entry:'./src/views/index/javascripts/index.js',//入口
////			output:{
////				filename:'index.js'//打包后的名字
////			}//出口
//			//多入口  单出口  数组中谁在前面，打包的时候谁就在前面
////			entry:['./src/views/index/javascripts/index.js','./src/views/index/javascripts/vendor.js'],//入口
////			output:{
////				filename:'index.js'//打包后的名字
////			}//出口
//			//多入口  多出口  对象，键值对格式
//			entry:{
//				index :'./src/views/index/javascripts/index.js',
//				vendor :'./src/views/index/javascripts/vendor.js'
//				},//入口
//			output:{
//				filename:'[name].min.js'//打包后的名字,中括号的作用：键值是什么名字，打包的文件就叫什么名字
//			}//出口
//		}))
//		.pipe(gulp.dest('./dist/index/js'))
	let streams = []
		//遍历
	for(const page in config.jsoptions){
		//判断如果是数组，是单出口，否则是多出口
		let entry = config.jsoptions[page]
		let filename = Array.isArray(entry) || ((typeof entry) === 'string') ? page : '[name]'
		let stream = gulp.src('src/entry.js')
			.pipe(webpack({
				mode:'production',
				entry:entry,
				output:{filename : filename + '.min.js'},
				module:{
					rules:[
						{
							test:/\.js$/,
							loader: 'babel-loader',
							query:{
								presets:['es2015']//es6->es5
							}
						}
					]
				}
			}))
			.pipe(gulp.dest('./dist/' + page + '/js'))
			streams.push(stream)
	}
	return merge(...streams)
})

//给各个页面自动引入依赖文件任务
gulp.task('inject', function () {
  config.pages.forEach(page => {
  		var target = gulp.src('./dist/' +page+ '/' +page+ '.html');
	   // It's not necessary to read the files (will speed up things), we're only after their paths:
	   var sources = gulp.src(['./dist/' +page+ '/js/*.js', './dist/' +page+ '/css/*.css'], {read: false});
	   return target.pipe(inject(sources,{ignorePath:'/dist'}))
	    .pipe(gulp.dest('./dist/' +page+ ''));
  })
  
});

//监听函数
gulp.task('watch',function(){
	gulp.watch('./src/views/*/*html',['handle:html','inject','reload'])
	gulp.watch('./src/**/*css',['handle:css','inject','reload'])//*指的是儿子，**指的是后代，不能处理IE的兼容
	gulp.watch('./src/**/*js',['handle:js','inject','reload'])
})
//创建热更新服务器
gulp.task('server', function () {
    connect.server(config.serveroptions)
})

// 让服务器刷新的任务
gulp.task("reload", function(){
	return gulp.src("./dist/**/*.html") //让所有的html文件都重新加载一下
		.pipe(connect.reload());
})
//默认任务
gulp.task('default',['server','handle:html','handle:css','handle:js','inject','watch'])


