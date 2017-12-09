import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import HomeAd from '../../../components/HomeAd/index';
// 这个地方涉及到了get和post方法
// import { getAdData } from '../../../fetch/home/home';

class Ad extends React.Component {
	constructor(props, context){
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render() {
		return (
			<div>
				{
					this.state.data.length
					? <HomeAd data={this.state.data}/>
					: <div>{/*加载中···*/}</div>
				}
			</div>
		)
	}

// 这个地方涉及到了fetch，先不写
/*	componentDidMount() {
		// 获取广告数据
		const result = getAdData();
		result.then(res)
	}*/
}

export default Ad;