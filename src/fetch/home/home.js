import { get } from '../get';

export function getAdData() {
	const result = get('/api/homead');
	return result;
}

export function getListData(city, page) {
	const city1 = city ? city : '北京';
	const result = get('/api/homelist/' + encodeURIComponent(city1) + '/' + page);
	return result;
} 