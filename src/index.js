import Vue from 'vue'
import Config from './config/config'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueMoment from 'vue-moment'


import App from "./App";

Vue.use(BootstrapVue, axios, VueMoment);

const events = [];

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
