<template>
	<b-container>
	  		
	  		<h2>Veranstalungs-Kalender</h2>
	  		
	  		<b-list-group v-if="this.$parent.events.length > 0">
			  <b-list-group-item href="#" class="flex-column align-items-start" v-for="event in this.$parent.events">
			    
			    <b-row>
			        <b-col lg="2" md="3" sm="12">{{ event.startDate | regularDate() }}</b-col>
			        <b-col lg="10" md="9" sm="12">
			        	<h3 class="mb-1">{{ event.title }}</h3>
						<p class="mb-1">
							{{ event.description }}
			    		</p>	
			        </b-col>
			    </b-row>
			  </b-list-group-item>
			</b-list-group>

	  		<b-list-group v-if="this.$parent.events.length == 0">
			  <b-list-group-item href="#" class="flex-column align-items-start">
			    <small>Lade daten ...</small>
			  </b-list-group-item>
			</b-list-group>
	  		
	  		
      </b-container>

</template>

<script>

import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'app',
  props: {
	event: {
		title: String,
		startDate: String,
		description: String,
	}	  
  },
  filters: {
	regularDate(date) {
		return moment(date).format("D.M.Y HH:mm");
	}
  }	
}
</script>