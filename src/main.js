// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router/index'
import iView from 'iview'
import ElementUI from 'element-ui';
import ZkTable from 'vue-table-with-tree-grid'
import 'iview/dist/styles/iview.css'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/index.css';
import $ from 'jquery';
import store from './store';
import Pop from './components/common-components/pop-common.vue'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'videojs-contrib-hls'


Vue.use(ElementUI);
Vue.use(ZkTable);
Vue.use(iView)
  .use(VueVideoPlayer);


Vue.config.productionTip = false;
Vue.component('Pop',Pop)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
