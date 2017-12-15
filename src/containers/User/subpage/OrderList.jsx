import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { getOrderListData, postComment } from '../../../fetch/user/orderlist';

import OrderListComponent from '../../../components/OrderList';
import './style.less';

class OrderList extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			data: []
		}
	}
	render() {
		return (
			<div className="order-list-container">
				<h2>您的订单</h2>
				{
					this.state.data.length
					? <OrderListComponent data={this.state.data} submitComment={this.submitComment.bind(this)}/>
					: <div>加载中··</div>
				}
			</div>
		)
	}

	componentDidMount() {
		// 获取订单数据
		const username = this.props.username;
		if(username) {
			this.loadOrderList(username);
		}
	}

	loadOrderList(username) {
		const result = getOrderListData(username);
		result.then(res => {
			return res.json();
		}).then(json => {
			this.setState({
                data: json
            })
		}).catch(ex => {
			console.error('用户主页订单列表获取数据失败', ex.message);
		})
	}

	submitComment(id, value, star, callback) {
		const result = postComment(id, value, star);
		result.then(res => {
			return res.json()
		}).then(json => {
			if(json.errno === 0 ){
				callback()
			}
		})
	}

}

export default OrderList;