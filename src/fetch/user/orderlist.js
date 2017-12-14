import { get } from '../get';

export function getOrderListData(username) {
	console.log("获取数据了！！！");
	const result = get('/api/orderlist/' + username);
	console.log(result);
	return result;
}