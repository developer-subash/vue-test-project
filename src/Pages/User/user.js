import Vue from 'vue';
import User from './User.vue';
import '@/registerServiceWorker';
Vue.config.productionTip = false;
new Vue({
    render: (h) => h(User),
}).$mount('#user');