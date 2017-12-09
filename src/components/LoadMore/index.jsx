import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less';

class LoadMore extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	render() {
		return (
			<div className="load-more" ref="wrapper">
				{
					this.props.isLoadingMore
					? <span>加载中···</span>
					: <span onClick={this.loadMoreHandle.bind(this)}></span>
				}
			</div>
		)
	}

	loadMoreHandle() {
		// 执行传输过来的方法
		this.props.loadMoreFn();
	}

	// 这个地方的代码难以理解，先不做了
	/*componentDidMount() {
		// 使用滚动的时候加载更多
		const loadMoreFn = this.props.loadMoreFn;
		const wrapper = this.refs.wrapper;
		let timeoutId;
		function callback() {
			const top = wrapper.getBoundingClient
		}
	}*/
}

export default LoadMore;