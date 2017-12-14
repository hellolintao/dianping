import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { getListData } from '../../../fetch/home/home'; 

import ListComponent from '../../../components/List';
import LoadMore from '../../../components/LoadMore';

import './style.less';

class List extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data:[],
            hasMore:false,
            isLoadingMore:false,
            page:0
        };
    }
    render() {
        console.log(this.props);
        return (
            <div>
                <h2 className="home-list-title">猜你喜欢</h2>
                {
                    this.state.data.length
                    ? <ListComponent data={this.state.data}/>
                    : <div></div>
                }
                {
                    this.state.hasMore
                    ? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}/>
                    : <p className="no-more">没有更多了</p>
                }
            </div>
        )
    }
    // 装载完之后被调用，render函数之后调用，
    // 获取首页的数据，城市名字，根据城市取到的结果，
    componentDidMount() {
        console.log(this.props);
        this.loadFirstPageData();
    }
    // 获取第一个组数据
    loadFirstPageData() {
        const cityName = this.props.cityName;
        console.log("使用这个cityname获取列表"+cityName);
        const result = getListData(cityName,0);
        console.log("cityName"+cityName);
        console.log(this.props);
        this.resultHandle(result);
    }

    // 加载更多数据
    loadMoreData() {
        // 记录状态
        this.setState({
            isLoadingMore:true
        });

        const cityName = this.props.cityName;
        const page = this.state.page;
        const result = getListData(cityName,page);
        this.resultHandle(result);
        console.log("cityName"+cityName);
        // 增加page
        this.setState({
            page: page + 1,
            isLoadingMore:false
        })
    }

    // 处理数据
    // 这个地方理解的不透彻
    //*****************
    resultHandle(result) {
        result.then(res => {
            return res.json();
        }).then(json => {
            console.log(json);
            const hasMore = json.hasMore;
            const newdata = json.data;

            this.setState({               
                hasMore: hasMore,
                // 这里把获取到的最新数据拼接到原始数据之后
                data: this.state.data.concat(newdata)
            });
            console.log("!!!!!!!!!!");
            console.log(this.state.data);
        }).catch(ex => {
            console.log('首页猜你喜欢获取数据错误',ex.message);
        })
    }
}

export default List;