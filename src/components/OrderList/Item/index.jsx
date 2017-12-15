import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Star from '../../Star';

import './style.less';

class OrderListComponent extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			commentState: 2, // commentState 0-未评价 1-评价中 2-已评价
			stars:0
		}
	}
	render() {
		const data = this.props.data;
		return (
			<div className="clear-fix order-item-container">
				<div className="order-item-img float-left">
					<img src={data.img}/>
				</div>
				<div className="order-item-comment float-right">
					{
						this.state.commentState === 0
						? <button className="btn" onClick={this.showComment.bind(this)}>评价</button>
						: this.state.commentState ===1
							? ''
							: <button className="btn unseleted-btn">已评价</button>
					}
				</div>
				<div className="order-item-content">
					<span>商户：{data.title}</span>
					<span>数量：{data.count}</span>
					<span>价格：￥{data.price}</span>
				</div>
				{
					// 评价中显示输入框
					this.state.commentState === 1
					? <div className="comment-text-container">
						<div className="comment-star-container">
							<Star star={this.state.stars} clickCallback={this.starClickCallback.bind(this)}/>
						</div>
						<textarea className="comment-text" ref="commentText"></textarea>
						<button className="btn" onClick={this.submitComment.bind(this)}>提交</button>
						<button className="btn unseleted-btn" onClick={this.hideComment.bind(this)}>取消</button>
					</div>
					:''
				}
			</div>
		)
	}

	componentDidMount() {
		// 将状态维护到state中
		this.setState({
			commentState: this.props.data.commentState
		})
	}

	showComment() {
		this.setState({
			commentState: 1
		})
	}
	hideComment() {
		this.setState({
			commentState: 0
		})
	}
	// 利用传递的函数进行评价提交
	submitComment(){
		// 获取函数操作
		const submitComment = this.props.submitComment;
		// 获取id
		const id = this.props.data.id;
		// 获取start数量
		const stars = this.state.stars;
		const star = stars[id] || '0';
		// 获取评价内容
		const commentText = this.refs.commentText;
		const value = commentText.value.trim();
		if(!value) {
			return
		}
		// 执行数据提交
		submitComment(id, value, star,this.commentOk.bind(this));
	}

	// 已经评价传入回调函数，修改状态
	commentOk() {
		this.setState({
			commentState: 2
		})
	}

	starClickCallback(star) {
		this.setState({
			stars:star
		})
	}
}

export default OrderListComponent;