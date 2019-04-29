import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
// import { Form, 
//   Button, 
//   Input, 
//   Icon, 
//   Layout, 
//   Breadcrumb,
//   Menu,
//   Dropdown,
//   Table,
//   Divider,
//  Row, Col } from 'ant-design-vue';
import {
  Affix,
  Anchor,
  AutoComplete,
  Alert,
  Avatar,
  BackTop,
  Badge,
  Breadcrumb,
  Button,
  Calendar,
  Card,
  Collapse,
  Carousel,
  Cascader,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  Icon,
  Input,
  InputNumber,
  Layout,
  List,
  LocaleProvider,
  message,
  Menu,
  Modal,
  notification,
  Pagination,
  Popconfirm,
  Popover,
  Progress,
  Radio,
  Rate,
  Row,
  Select,
  Slider,
  Spin,
  Steps,
  Switch,
  Table,
  Transfer,
  Tree,
  TreeSelect,
  Tabs,
  Tag,
  TimePicker,
  Timeline,
  Tooltip,
  Upload,
  Drawer,
  Skeleton,
} from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.less';

import './app.less';

import api from './api/api';

Vue.config.productionTip = false;

  Vue.prototype.$notification = notification;

  Vue.use(Affix),
  Vue.use(Anchor),
  Vue.use(AutoComplete),
  Vue.use(Alert),
  Vue.use(Avatar),
  Vue.use(BackTop),
  Vue.use(Badge),
  Vue.use(Breadcrumb),
  Vue.use(Button),
  Vue.use(Calendar),
  Vue.use(Card),
  Vue.use(Collapse),
  Vue.use(Carousel),
  Vue.use(Cascader),
  Vue.use(Checkbox),
  Vue.use(Col),
  Vue.use(DatePicker),
  Vue.use(Divider),
  Vue.use(Dropdown),
  Vue.use(Form),
  Vue.use(Icon),
  Vue.use(Input),
  Vue.use(InputNumber),
  Vue.use(Layout),
  Vue.use(List),
  Vue.use(LocaleProvider),
 // Vue.use(message),
  Vue.use(Menu),
  Vue.use(Modal),
  //Vue.use(notification),
  Vue.use(Pagination),
  Vue.use(Popconfirm),
  Vue.use(Popover),
  Vue.use(Progress),
  Vue.use(Radio),
  Vue.use(Rate),
  Vue.use(Row),
  Vue.use(Select),
  Vue.use(Slider),
  Vue.use(Spin),
  Vue.use(Steps),
  Vue.use(Switch),
  Vue.use(Table),
  Vue.use(Transfer),
  Vue.use(Tree),
  Vue.use(TreeSelect),
  Vue.use(Tabs),
  Vue.use(Tag),
  Vue.use(TimePicker),
  Vue.use(Timeline),
  Vue.use(Tooltip),
  Vue.use(Upload),
  Vue.use(Drawer),
  Vue.use(Skeleton),

//Vue.use();
// Vue.use(Form);
// Vue.use(Button);
// Vue.use(Input);
// Vue.use(Icon);
// Vue.component(Layout.Header.name, Layout.Header);
// Vue.component(Layout.Content.name, Layout.Content);
// Vue.component(Layout.Sider.name, Layout.Sider);
// Vue.use(Breadcrumb);
// Vue.use(Layout);
// Vue.use(Menu);
// Vue.use(Row);
// Vue.use(Col);
// Vue.use(Dropdown);
// Vue.use(Table);
// Vue.use(Divider);

//Vue.use(Antd);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');

api.onError((e:any) => {
  console.log('error', e);
  notification.open({
    message: '错误',
    description: e.msg,
  });
});
if(!sessionStorage.getItem('code')) {
  router.push('/login');
}
