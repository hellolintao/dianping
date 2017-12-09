# 这个是Redux-actions的目录


# About this folder
This folder will hold all of your **flux** actions if you are using flux.
You can include actions into your components or stores like this:
如果你是用action的话，这个文件夹将保存flux的actions，你可以像下面一样把它引入自己的组价之中。
```javascript
let react = require('react/addons');
let MyAction = require('actions/MyAction');
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    MyAction.exampleMethod();
  }
}
```
