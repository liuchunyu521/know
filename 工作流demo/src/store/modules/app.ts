import router from '../../router';
import Vue from 'vue';
import Vuex from 'vuex';
import config from '../../api/config';
import api from '../../api/api';


Vue.use(Vuex);
interface State {
    payments: any;
}

const state: State = {
    // payments: {
    //     total: 1,
    //     rows: [{
    //     id: '1',
    //     type: '1',
    //     deptName: '财务部',
    //     date: 1900987654,
    //     reason: '22222',
    //     sum: 32,
    //     state: 1,
    //     username: 'aaa',
    //   }]
    // }
    payments: []
}

const getters = {
    // payments: (state: any, getters: any, rootState: any) {
    //     return state.payments;
    // }
}

const actions = {
    async getPaymentList({ commit, state }: any, req: any) {
        let url = req.status == 1　?  config.PAYMENT_SAVED_LIST_URL : config.PAYMENT_TASK_LIST_URL;
        if(req.status == 1) // 已保存
        {
            url = config.PAYMENT_SAVED_LIST_URL;
        } else if(req.status == 2) { // 审核中
            url = config.PAYMENT_TASK_LIST_URL;
        } else {  // 已完成
            url = config.PAYMENT_FINISH_LIST_URL;
        }
        req.status = undefined;
        console.log('getPaymentList', req);
        let data = await api.post(url, req);
        commit('setPayments', data);
    },
    login({ commit, state }: any, code: string) {
        console.log('login', code);
        sessionStorage.setItem('code', code);
        router.push('/');
    },

    async updatePayment(req:any) {
        let data = await api.post(config.PAYMENT_UPDATE_URL, req);
        router.push('/payment/list');
    },
    async deletePayment({ commit, state }: any, req: any) {
        console.log('deletePayment', req);
        let data = await api.post(config.PAYMENT_DELETE_URL, req);
        router.push('/payment/list');
    },

    async savePayment({ commit, state }: any,req:any) {
            let ret = await api.post(config.PAYMENT_SAVE_URL, req);
            //router.push('/payment/list');
            console.log('savePayment', ret);
            return ret.data;
    },
    async submitPayment({ commit, state }: any, req:any) {
        let data = await api.post(config.PAYMENT_SUBMIT_URL, req);
        router.push('/payment/list');
    },

    async updateFlowInstIdToPayment({ commit, state }: any, req:any){
        await api.post(config.PAYMENT_UPDATE_FLOW_INST_ID_URL, req);
    },

    async statePayment({ commit, state }: any, req: any) {
        let data = await api.post(config.PAYMENT_STATE_URL, req);
        router.push('/payment/list');
    },
    async getPaymentDetail({ commit, state }: any, id: any) {
            //console.log('request', id);
            let data = await api.get(`${config.PAYMENT_DETAIL_URL}?id=${id}` , {});
            return data;
    },

    async getDoc({ commit, state }: any, id: any) {
        let data = await api.getDoc(`/doc/${id}.md`);
        return data;
    }
};

const mutations = {
    setPayments(state: any, payments: any) {
        state.payments = payments;
    },
};

const store = {
    //namespace: true,
    state,
    getters,
    actions,
    mutations,
}
export default store;

