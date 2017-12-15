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
		console.log(this.state.data);
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
			console.log(this.setState)
			this.setState({
                data: json
            })
			console.log(this.state.data)
		}).catch(ex => {
			console.log(this.state);
			console.error("用户主页订单列表获取数据失败", ex.message);
		})
	}

	submitComment(id, value, callback) {
		const result = postComment(id,value);
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