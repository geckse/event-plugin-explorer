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
			  <b-modal id="modal1" title="Event hinzufügen" cancel-title="Abbrechen" ok-title="Speichern">
			    
			    
			    <b-form @submit="onSubmit" @reset="onReset">
			      <b-form-group id="inputEventTitle"
			                    label="Titel"
			                    label-for="inputEventTitle"
			                    description="">
			                    
			       <b-form-input id="inputEventTitle"
                      type="text"
                      v-model="form.title"
                      required
                      placeholder="">
				   </b-form-input>
			    </b-form-group>
				
				
				<b-row>
					<b-col md="6" sm="12">
					<b-form-group id="inputEventStartDate"
				                    label="Start-Datum"
				                    label-for="inputEventStartDate"
				                    description="">
				                    
						<date-picker id="inputEventStartDate" v-model="form.startDate" :config="form.startDate.options"></date-picker>
	
					 </b-form-group>
				     </b-col>
				     <b-col md="6" sm="12">
					 <b-form-group id="inputEventEndDate"
				                    label="End-Datum"
				                    label-for="inputEventEndDate"
				                    description="">
				                    
						<date-picker id="inputEventEndDate" v-model="form.endDate" :config="form.endDate.options"></date-picker>
	
					 </b-form-group>
				     </b-col>
				 </b-row>
			    </b-form>
			    
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
import datePicker from 'vue-bootstrap-datetimepicker';  

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
  components: {
    datePicker
  },
  data() {
	return { 
		form: {
	        title: '',
	        startDate: { 
		      date: new Date(),
			  options: {
				  format: 'DD.MM.Y',
				  useCurrent: false,
				  sideBySide: true
			  }
        	},
        	endDate: { 
		      date: new Date(),
			  options: {
				  format: 'DD.MM.Y',
				  useCurrent: false,
				  sideBySide: true
			  }
        	},
	        description: '',
	        location: '',
	        brand: '',
     }
    };
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
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset (evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.title = '';
    }
   } 	
}
</script>