import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from './containers/login.vue';
import Home from './containers/home.vue';
import PaymentList from './containers/payments/payment-list.vue';
import PaymentCreate from './containers/payments/payment-create.vue';
import DocComponent from './containers/doc/component.vue';

Vue.use(VueRouter);

function dynamicPropsFn (route) {
    const now = new Date()
    console.log('bbbb', route);
    return {
      name: (now.getFullYear() + parseInt(route.params.id)) + '!'
    }
  }

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
            },
            { path: 'doc/:id', component:  DocComponent, props: dynamicPropsFn},
        ]
    },
];

const router = new VueRouter({
    //mode: 'history',
    routes
});

export default router;