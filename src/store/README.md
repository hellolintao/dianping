# Redux store文件

# About this folder
This folder will hold all of your **flux** stores.
You can include them into your components like this:
这个文件夹主要来保存 flux 的stores文件，你可以像下面这段代码一样来把它导入你自己的组件之中。
```javascript
let react = require('react/addons');
let MyStore = require('stores/MyStore');
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    MyStore.doSomething();
  }
}
```
