import { combineReducers } from 'redux';
import userinfo from './userinfo';

// 使用combineReduers将多个Reducer放在一起
export default combineReducers({
	userinfo
});