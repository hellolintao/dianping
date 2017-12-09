# About this folder
This folder will hold all of your **flux** datasources.
You can include them into your components or stores like this:
这个文件夹用来保存 flux 的数据源文件，你可以像下面这段代码一样把它引入你自己的组件
```javascript
let react = require('react/addons');
let MySource = require('sources/MyAction');
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    MySource.getRemoteData();
  }
}
```
