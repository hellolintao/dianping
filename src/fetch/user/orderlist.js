import { get } from '../get';
import { post } from '../post';

export function getOrderListData(username) {
	console.log("获取数据了！！！");
	const result = get('/api/orderlist/' + username);
	console.log(result);
	return result;
}

// 提交评价的方法
export function postComment(id,comment) {
	const result = post('/api/submitComment',{
		id:id,
		comment:comment
	})
	return result;
}