<template>
	<b-container>
	  		
	  		<h2>Veranstalungs-Kalender</h2>
	  		
	  		<div v-if="this.$parent.events.length > 0">
	  		
	  		<b-list-group v-if="this.$parent.events.length > 0">
			  <b-list-group-item href="#" class="flex-column align-items-start" v-for="event in this.$parent.events">
			    
			    <b-row>
			        
			       
			        <!-- ev is in same month -->
			        <b-col lg="2" md="3" sm="12" class="etc-same-month" v-if="new Date(event.startDate).getMonth() == new Date(event.endDate).getMonth()">
			        	 
			        	 
			        	 <span class="readable-time-left" v-if="( new Date(event.startDate).getTime() - (new Date().getTime()) ) < (7 * 24 * 60 * 60 * 1000)">
				        	 in {{ (new Date(event.startDate).getTime() - (new Date().getTime() )) | readableTime() }}
				         </span>
			        	 
			        	 <div v-if="new Date(event.startDate).getDay() == new Date(event.endDate).getDay()">
				        	
			        	 	<span class="date">{{ event.startDate | regularDate() }}</span><br/>
			        	 	<span class="time">{{ event.startDate | dateTime() }} – {{ event.endDate | dateTime() }}</span>
			        	 </div>
			        	 <div v-if="new Date(event.startDate).getDay() != new Date(event.endDate).getDay()">
			        	 	<span class="date">{{ event.startDate | regularDate() }} – {{ event.endDate | regularDate() }}</span><br/>
			        	 </div>
			        	 
			        </b-col>
			        <!-- ev is not in same month -->
			        <b-col lg="2" md="3" sm="12" class="etc-not-same-month" v-if="new Date(event.startDate).getMonth() != new Date(event.endDate).getMonth()">
			        	{{ event.startDate | regularDate() }} bis {{ event.endDate | regularDate() }}
			        </b-col>
			        
			        <b-col lg="10" md="9" sm="12">
			        	<h3 class="mb-1">{{ event.title }}</h3>
			        	<h5>
				        	<small><i class="fa fa-building"></i> {{event.location}}</small>
				        	<small>&middot; {{event.brand}}</small>
				        	
			        	</h5>
						<p class="mb-1">
							{{ event.description }}
			    		</p>	
			        </b-col>
			    </b-row>
			  </b-list-group-item>
			</b-list-group>
			
			  <div>
			  <b-btn v-b-modal.modal1><i class="fa fa-add"></i> Event hinzufügen</b-btn>
			
			  <!-- Modal Component -->
			  <b-modal id="modal1" title="Event hinzufügen">
			    <p class="my-4">Hello from modal!</p>
			  </b-modal>
			  </div>

	  		</div>
	  		<div v-if="this.$parent.events.length == 0">
			
	  		<b-list-group>
			  <b-list-group-item href="#" class="flex-column align-items-start">
			    <small>Lade daten ...</small>
			  </b-list-group-item>
			</b-list-group>
			
	  		</div>
	  	  				
      </b-container>

</template>

<script>

import moment from 'moment'

import ('moment/locale/de')

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'font-awesome/css/font-awesome.min.css'

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
		return moment(date).format("DD.MM.Y");
	},
	dateDay(date) {
		return moment(date).format("DD");
	},
	dateTime(date) {
		return moment(date).format("HH:mm");
	},
	readableTime(date) {
		console.log(date);
		return moment.duration(date).locale('de').humanize();
	},		
  }	
}
</script>