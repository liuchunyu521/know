import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from './containers/login.vue';
import Home from './containers/home.vue';
import PaymentList from './containers/payments/payment-list.vue';
import PaymentCreate from './containers/payments/payment-create.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/login', component: Login },
    {
        path: '/', component: Home,
        children: [
            {
                path: "payment/list",
                component: PaymentList
            },
            {
                path:'payment/create',
                component: PaymentCreate
            },
            {
                path:'payment/edit/:id',
                component: PaymentCreate
            }
        ]
    },
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;