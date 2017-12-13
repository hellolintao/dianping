import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import * as storeActionsFromFile from '../../../actions/store';

import BuyAndStore from '../../../components/BuyAndStore';

class Buy extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    	this.state = {
    		isStore: false
    	}
    }

    render() {
        return (
            <div>
                <BuyAndStore isStore={this.state.isStore} buyHandle={this.buyHandle.bind(this)} storeHandle={this.storeHandle.bind(this)}/> 
            </div>
        )
    }

    componentDidMount() {
        // 验证当前商户是否收藏
        this.checkStoreState();
    }

    // 检验当期啊你商户是否收藏过
    checkStoreState() {
        const id = this.props.id;
        const store = this.props.store;

        // some其中任何一个满足就可以
        store.some(item => {
            if(item.id === id ) {
                // 已经被收藏
                this.setState({
                    isStore:true
                })
                // 跳出循环
                return true;
            }
        })
    }

    // 检查登录状态
    loginCheck() {
        const id = this.props.id;
        const userinfo = this.props.userinfo;
        if(!userinfo.username) {
            // 跳转到登录页面之后，登录之后，传入路由中的login中的可选参数，，然后登录成功之后，跳转到对应的路由页面
            hashHistory.push('/login/' + encodeURIComponent('/detail/' + id));
            return false;
        }
        return true;
    }

    // 购买事件
    buyHandle() {
        // 验证登录,没有登录的话则结束，跳转到登录页面
        const loginFlag = this.loginCheck();
        if(!loginFlag) {
            return 
        }

        // 套转到用户主页???
        hashHistory.push('/User');
    }

    // 收藏事件 
    storeHandle() {
        // 验证登录，未登录则return
        const loginflag = this.loginCheck();
        if(!loginflag){
            return
        }

        const id = this.props.id;
        const storeActions=this.props.storeActions;
        if(this.state.isStore) {
            // 已经收藏的话，就取消收藏
            storeActions.rm({id:id});
        } else {
            // 未收藏，则添加到收藏中
            storeActions.add({id: id});
        }

        // 修改状态
        this.setState({
            isStore: !this.state.isStore
        })

    }
}

// 绑定react-redux
function mapStateToProps(state) {
    return {
        userinfo: state.userinfo,
        store: state.store
    }
}

function mapDispatchToProps(dispatch) {
    return {
        storeActions: bindActionCreators(storeActionsFromFile,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Buy);