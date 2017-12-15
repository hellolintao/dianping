export default {
	getItem: function(key) {
		let value;
		try{
			value = localStorage.getItem(key);
		}catch(e){
			console.log('localStorage.getItem报错',e.message);
		}finally {
			return value;
		}
	},
	setItem: function(key, value) {
		try{
			// ios safari无痕模式下，直接使用localStorage.setItem会出错
			localStorage.setItem(key,value);
		}catch(e){
			console.error('localStorage.setItem报错',e.message);
			
		}
	}
}
