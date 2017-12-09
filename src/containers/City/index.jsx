import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

class City extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
                <h1>City</h1>
            </div>
        )
    }
}

// 使用require.ensure异步加载，还不支持ES6的export 
// export default Detail
module.exports = City