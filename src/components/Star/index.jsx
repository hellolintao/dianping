import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less';

class Star extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render() {
		// 获取star数量，并取余5（最多五哥star）
		let star = this.props.star || 0;
		console.log("star组件中的star:"+this.props.star);
		if (star > 5) {
			star = star % 5;
		}

		return (
			<div className="star-container">
				{[1,2,3,4,5].map((item,index) => {
					const lightClass = star >= item ? ' light' : ''
					return <i key={index} className={'icon-star' + lightClass}></i>
				})}
			</div>
		)
	}
}

export default Star;

/*


*/
