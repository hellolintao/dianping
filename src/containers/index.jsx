import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LocalStore from '../util/LocalStore';

import { CITYNAME } from '../constants/localStoreKey';
import * as userInfoActionsFromOtherFile from '../actions/userinfo';

class App extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			initDone:true
		}
	}
	render() {
		return (
			<div>
				{
					this.state.initDone
					? this.props.children
					:<div>正在加载...</div>
				}
			</div>
		)
	}

	componentDidMount() {
		// 获取地理职位信息
		let cityName = LocalStore.getItem(CITYNAME);
		if(cityName == null){
			cityName = '北京'
		}
		this.props.userInfoActions.update({
			cityName:cityName
		})

		// 更改状态
		this.setState({
			initDone:true
		})
	}
}

// 绑定Redux
// 负责输入逻辑，将state映射到UI组件的参数（props）
function mapStateToProps(state) {
	return {

	}
}

// 负责输出逻辑,将用户对UI组件的操作映射成Action
function mapDispatchToProps(dispatch) {
	return {
		userInfoActions:bindActionCreators(userInfoActionsFromOtherFile,dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)