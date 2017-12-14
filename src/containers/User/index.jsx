import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux'

import * as userInfoActionsFromOtherFile from '../../actions/userinfo';

import Header from '../../components/Header';
import UserInfo from '../../components/UserInfo';
import OrderList from './subpage/OrderList';

class User extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            checking: true
        }
    }
    render() {
        const userinfo = this.props.userinfo;
        return (
            <div>
                <Header title="用户中心" backRouter="/"/>
                <UserInfo username={userinfo.username} city={userinfo.cityName}/>
                <OrderList username={userinfo.username}/>
            </div>
        )
    }

    componentDidMount() {
        // 如果没有登录，跳转到登录页面
        if(!this.props.userinfo.username) {
            hashHistory.push('/login');
        }
    }
}

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(User)