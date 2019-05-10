import Vue from 'vue';
import WorkflowApprove from './workflow-approve';
import WorkflowReject from './workflow-reject';
import WorkflowFlow from './workflow-flow';
import config from './services/config';
import { reject, canTaskRevoke, revoke, startWorkflow } from './workflow-func';
export { WorkflowApprove, WorkflowReject };
export { reject, canTaskRevoke, revoke, startWorkflow };
import { Affix, Anchor, AutoComplete, Alert, Avatar, BackTop, Badge, Breadcrumb, Button, Calendar, Card, Collapse, Carousel, Cascader, Checkbox, Col, DatePicker, Divider, Dropdown, Form, Icon, Input, InputNumber, Layout, List, LocaleProvider, Menu, Modal, notification, Pagination, Popconfirm, Popover, Progress, Radio, Rate, Row, Select, Slider, Spin, Steps, Switch, Table, Transfer, Tree, TreeSelect, Tabs, Tag, TimePicker, Timeline, Tooltip, Upload, Drawer, Skeleton, } from 'ant-design-vue';
/**
 * 默认选项参数
 */
const defaultOptions = {
    debug: false
};
function setConfig(options) {
    let opt = { ...defaultOptions, ...options };
    config.setDebug(opt.debug);
    config.setBaseAddress(opt.flowModelerBaseUrl, opt.flowProcessBaseUrl);
    if (opt.userCode) {
        config.setUserCode(opt.userCode);
    }
    if (opt.token) {
        config.setAuthToken(opt.token);
    }
}
function install(vue) {
    vue.component('workflow-approve', WorkflowApprove);
    vue.component('workflow-reject', WorkflowReject);
    vue.component('workflow-flow', WorkflowFlow);
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
        Vue.use(Skeleton);
}
export default { install, config: setConfig };
