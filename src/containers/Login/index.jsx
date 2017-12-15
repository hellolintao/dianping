import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux'

import * as userInfoActionsFromOtherFile from '../../actions/userinfo';

import Header from '../../components/Header';
import LoginComponent from '../../components/Login';

class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            checking: true
        }
    }
    render() {
        return (
            <div>
                <Header title="登录"/>
                {
                    // 等待验证之后，再显示登录信息
                    this.state.checking
                    ? <div>{/*等待中*/}</div>
                    :<LoginComponent loginHandle={this.loginHandle.bind(this)}/>
                }
            </div>
        )
    }
    componentDidMount() {
        // 判断是否已经登录
        this.doCheck();
    }

    doCheck() {
        const userinfo = this.props.userinfo;

        if(userinfo.username) {
            // 已经登录，跳转到用户主页
            this.goUserPage();
        } else {
            // 未登录，验证结束
            this.setState({
                checking: false
            })
        }
    }

    // 处理登录按钮按下之后的事情
    loginHandle(username) {
        // 保存用户名
        const actions = this.props.userinfoAction;
        let userinfo = this.props.userinfo;
        userinfo.username = username;
        actions.update(userinfo);

        const params = this.props.params;
        const router = params.router;
        if(router) {
            // 跳转到指定页面
            hashHistory.push(router);
        } else {
            // 跳转到用户主页
            this.goUserPage();
        }
    }
    goUserPage() {
        hashHistory.push('/User');
    }
}



// redux react绑定·····
// 这里的意思就是，把state中的userinfo，转化成props中的userinfo
// 这样就模拟了是从父组件中传递的过来的userinfo，这样就可以在上面使用this.props.userinfo这种方式调用了。

function mapStateToProps(state) {
   return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    // Dispatch是view发出action的唯一的方法
    // 绑定一个actions创建器userInfoActionsFromOtherFile,来自于这个action中的info
    // 绑定了dispatch之后，dispatch就可以自动发送action
    // userinfoAction相当于action/userinfo的一个对象，可以调用他的update方法对action进行更新
    return {
        userinfoAction:bindActionCreators(userInfoActionsFromOtherFile,dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);