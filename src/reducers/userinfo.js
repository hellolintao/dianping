// 一个简单的Reducer
// 引入一个常量
import * as actionTypes from '../constants/userinfo';

// 定义初始化state
const initialState = {};

export default function userinfo (state = initialState,action) {
	console.log("userinfo.js");
	// 按照不同的条件返回不同的值
	switch(action.type){
		case actionTypes.USERINFO_UPDATE:
			return action.data;
		default:
			return state;
	}
}