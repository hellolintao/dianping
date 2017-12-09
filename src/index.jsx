import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { hashHistory } from 'react-router';
import configureStore from './store/configureStore.js';

// 引入两个基础style
import './styles/App.less';
import './styles/font.css';

// 创建Redux的store对象
const store = configureStore();

// 引入路由配置
import RouteMap from './router/routeMap';

// Render the main component into the dom
ReactDOM.render(
	<Provider store={store}>
		<RouteMap history={hashHistory}/>
	</Provider>,
	document.getElementById('app'));
