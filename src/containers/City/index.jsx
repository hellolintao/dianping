import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

// 引入redux的基础包
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

// 导入木偶组件，头部、当前城市、城市列表、
import Header from '../../components/Header';
import CurrentCity from '../../components/CurrentCity';
import CityList from '../../components/CityList';

// 导入地址工具和城市名字常量
import localStore from '../../util/localStore';
import { CITYNAME } from '../../constants/localStoreKey';

// 导入userinfoaction
import * as userInfoActionsFromOtherFile from '../../actions/userinfo';

class City extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    // render函数，返回木偶组件中的Header，CurrentCity CityList组件
    // Header传入的固定参数
    // CurrentCity 传递的是cityName，这个属性来自于props，在调用处被传递的
    // 但是这个组件是在路由被打开的
    // 那么这个属性来自于哪里呢？
    render() {
        return (
            <div>
                <Header title="选择城市"/>
                <CurrentCity cityName={this.props.userinfo.cityName}/>
                <CityList changeFn={this.changeCity.bind(this)}/>
            </div>
        )
    }

    changeCity(newCity){
        if(newCity == null) {
            return;
        }

        // 修改redux
        const userinfo = this.props.userinfo;
        userinfo.cityName = newCity;
        this.props.userinfoAction.update(userinfo);

        // 修改cookie
        localStore.setItem(CITYNAME,newCity);

        // 跳转页面
        hashHistory.push('/');
    }
}






// --------redux react 绑定

// 控制输入逻辑，这个是控制输入的逻辑，也就是表示外部传递进来的state中，吧userinfo这个state赋值给props中userinfo
function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

// 输出逻辑，绑定actionCreators
function mapDispatchToProps(dispatch) {
    return {
        userinfoAction: bindActionCreators(userInfoActionsFromOtherFile,dispatch)
    }
}

// 导出组件，完成绑定
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(City)