# 工作流组件
> 提供一个方便，灵活的集成工作流前端的方法

[toc]

## 版本下载

## 在线demo

[http://10.16.21.29:17001](http://10.16.21.29:17001)


## 组件安装
1. 下载组件
2. copy组件到src下libs/workflow目录下
3. 引入组件
```javascript
import workflow, {
  startWorkflow
} from "./libs/workflow";
```

4.注册组件
```javascript
Vue.use(workflow, {
  debug: true,
  authToken: 'Bearer ' + 'aaaaa',
  userCode: sessionStorage.getItem('code'),
  flowModelerBaseUrl: 'http://10.16.21.29:8888/fbpm-modeler',
  flowProcessBaseUrl: 'http://10.16.21.29:8889/fbpm-process'
});
```




