import { createStore } from 'redux';
import rootReducer from '../reducers';

// 生成store并且制定reducer（收到action的时候，会自动调用这个action）
export default function configureStore(initialState) {
	console.log("生成store");
	console.log(window.devToolsExtension);
	const store = createStore(rootReducer,initialState,
		window.devToolsExtension ? window.devToolsExtension():undefined
	)
	return store;
}