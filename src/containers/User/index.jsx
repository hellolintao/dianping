import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux'

import * as userInfoActionsFromOtherFile from '../../actions/userinfo';

import Header from '../../components/Header';
import Login from '../../components/Login';

class User extends React.Component {
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
                <Header title="用户中心"/>
                <p>这里是用户中心</p> 
            </div>
        )
    }
}

export default User;