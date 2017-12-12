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
		// 已经绑定了actionCreators，这个时候就有了新的属性了，就可以添加新属性了，
		// 实际上他就相当于导入进来的action的一个对象，调用对象方法
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
	// 绑定Action创建器，为这个action新添加一个属性，这个属性就是userInfoActions，调用update方法，将新的属性传递进去，
	// 这一部分的操作的优先程度是比较高的。
	// 绑定好了之后，就可以通过this.props.userInfoAction.update等等操作来更改Action了！
	// 在子组件中调用newaction.action1相当于实现了dispatch(action1);
	// 也就是说，在子组件中使用userinfo.cityname...就相当于使dispacth(cityname)``??
	return {
		userInfoActions:bindActionCreators(userInfoActionsFromOtherFile,dispatch)
	}
}

// 第一个参数负责输入逻辑，第二个参数负责输出逻辑，吧这两个组合成一个组件，然后导出
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)