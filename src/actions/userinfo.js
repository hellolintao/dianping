import * as actionTypes from '../constants/userinfo';

// 一个简单的action，返回type是从actionType中获得的
export function update(data) {
	return {
		type: actionTypes.USERINFO_UPDATE,
		data
	}
}