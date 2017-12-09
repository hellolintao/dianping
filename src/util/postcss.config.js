module.exports = {  
    parser: 'postcss-less',  //这个有很多限制，可以对语法规则进行限制
	plugins: {  
        'postcss-import': {},  
        'autoprefixer':{  
            browers: ["last 5 versions","ie>=12"]  //可以限制ie的属性
	    },
		// 'cssnano': {},  //这个是给css压缩的  去除空格之类的东西,这个要写在后面
    }  
} 
