import Vue from 'vue';
import Admin from './Admin.vue';
import router from "@/Pages/Admin/Route/Routes.ts";
import '@/registerServiceWorker';
import store from "@/Pages/Admin/Store/index.ts";
import $ from 'jquery';
import 'bootstrap';
import Spinner from "@/Pages/Admin/Modules/Common/Controllers/Spinner.ts";
Vue.component('spinner', Spinner);
import VueCookies from 'vue-cookies';

Vue.config.productionTip = false;

import Multiselect from 'vue-multiselect'
Vue.component('multiselect', Multiselect)

import { Datetime } from 'vue-datetime';
Vue.component('datetime', Datetime);
import 'vue-datetime/dist/vue-datetime.css'

import Loading from 'vue-loading-overlay';
Vue.component('loading', Loading);

import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

import Tooltip from 'vue-directive-tooltip';
import 'vue-directive-tooltip/css/index.css';
Vue.use(Tooltip);

import FlashMessage from '@smartweb/vue-flash-message';
Vue.use(FlashMessage);

// import FlashMessage from "@smartweb/vue-flash-message";
// Vue.use(FlashMessage);

const loadingconfig = {
    time: 1000,
    position :"left bottom",
  };
  Vue.use(FlashMessage, loadingconfig);



import Sortable from 'vue-sortable';
Vue.use(Sortable);

import StarRating from 'vue-star-rating';
Vue.component('star-rating', StarRating);

import VuejsClipper from 'vuejs-clipper'
// install
Vue.use(VuejsClipper);

import VueRx from 'vue-rx'
// install vue-rx
Vue.use(VueRx)

// offline detection imported
// import offline from 'v-offline'
// Vue.component(offline)

import { VueSpinners } from '@saeris/vue-spinners'
Vue.use(VueSpinners)

// Vue.component("news-content", {
//   template: '<p>{{description}}</p>',
//   props: ['description']
// });

// Vue.directive("trim", {
//   inserted: function(el) {
//     var str = el.innerHTML;
//     var resultString = str.split(' ').slice(0, 5).join(" ") + "...";
//     el.innerHTML = resultString
//   }
// });

import * as moment from 'moment';
// Vue.use(moment);

Vue.use(VueCookies);
new Vue({
    router,
    store,
    PulseLoader,
    FlashMessage,
    render: (h) => h(Admin),
}).$mount('#admin');