import Vue from 'vue'
import Config from './config/config'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'

import App from "./App";

Vue.use(BootstrapVue, axios);

new Vue({
  el: "#app",
  render: h => <App />,
  data() {
    return {
	  events: [{
		id: '0',
	  	title: 'Test Title', 
	  	description: '',
	  	startDate: ''
	  }],
	  event: {
	  	id: '0',
	  	title: 'Test Title', 
	  	description: '',
	  	startDate: ''  
	  }
	};
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
