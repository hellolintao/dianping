import React from 'react';
import PureRenderMixiin from 'react-addons-pure-render-mixin';

import { getInfoData } from '../../../fetch/detail/detail';

import DetailInfo from '../../../components/DetailInfo';

class Info extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixiin.shouldComponentUpdate.bind(this);
		// 设置state的初始值
		this.state = {
			info: false
		}
	}
	render() {
		return (
			<div>
			{
				this.state.info
				? <DetailInfo data={this.state.info}/>
				: ''
			}
			</div>
		)
	}
	componentDidMount() {
		// 获取商户信息
		this.getInfo();
	}
	getInfo() {
		const id = this.props.id;
		const result = getInfoData(id);
		result.then(res => {
			return res.json();
		}).then(json => {
			this.setState({
				info:json
			})
		}).catch(ex => {
			console.log("详情页获取商户信息出错了！");
		})
	}
}

export default Info;