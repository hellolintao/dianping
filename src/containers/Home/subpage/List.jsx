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
        }
    }
    render() {
        console.log("render第"+this.state.data.length);
        return (
            <div>
                <h2 className="home-list-title">猜你喜欢</h2>
                {
                    this.state.data.length
                    ? <ListComponent data={this.state.data}/>
                    : <div>???</div>
                }
                {
                    this.state.hasMore
                    ? <LoadMore isLoadingMore={this.state.isLoadingMore}/>
                    : ''
                }
            </div>
        )
    }
    // 装载完之后被调用，render函数之后调用，
    // 或缺首页的数据，城市名字，根据城市取到的结果，
    componentDidMount() {
        const cityName = this.props.cityName;
        const result = getListData(cityName,0);
        console.log("获取到的猜你喜欢数据：");
        console.log(result);
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
                data: newdata
            });
            console.log("!!!!!!!!!!");
            console.log(this.state.data);
        }).catch(ex => {
            console.log('首页猜你喜欢获取数据错误',ex.message);
        })
    }
}

export default List;