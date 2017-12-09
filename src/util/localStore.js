export default {
	getItem: function(key) {
		let value;
		try{
			value = localStorage.getItem(key);
		}catch(e){
			// 开发环境下报错，提示error
			if(__DEV__) {
				console.log('localStorage.getItem报错',e.message);
			}
		}finally {
			return value;
		}
	},
	setItem: function(key, value) {
		try{
			// ios safari无痕模式下，直接使用localStorage.setItem会出错
			localStorage.setItem(key,value);
		}catch(e){
			// 开发环境下会出错
			if(__DEV__){
				console.error('localStorage.setItem报错',e.message);
			}
		}
	}
}