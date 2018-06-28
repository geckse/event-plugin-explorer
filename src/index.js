import Vue from 'vue'
import Config from './config/config'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueMoment from 'vue-moment'
import jQuery from 'jquery'

import VueBootstrapDatetimePicker from 'vue-bootstrap-datetimepicker';  

Vue.use(BootstrapVue, axios, VueMoment);
Vue.component('date-picker', VueBootstrapDatetimePicker);

import App from "./App";
const events = [];


// Using font-awesome icons
jQuery.extend(true, jQuery.fn.datetimepicker.defaults, {
  icons: {
    time: 'fa fa-clock',
    date: 'fa fa-calendar',
    up: 'fa fa-arrow-up',
    down: 'fa fa-arrow-down',
    previous: 'fa fa-chevron-left',
    next: 'fa fa-chevron-right',
    today: 'fa fa-calendar-check',
    clear: 'fa fa-trash-alt',
    close: 'fa fa-times-circle'
  }
});

new Vue({
  el: '#app',
  render: h => h(App),
  data:{
  	  events
  },
  computed: {
	},
  mounted() {
		this.getPosts();
	},
  methods: {
	    getPosts() {
	      axios.get(Config.ROOT_API+'/list').then((response) => {
	        this.events = response.data;
	      }).catch( error => { console.log(error); });
	    }
  }

});
