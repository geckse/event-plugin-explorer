<template>
	<b-container>
	
	  		<b-row>
	  		<h2>Veranstalungs-Kalender</h2>
	  		</b-row>
	  			
	  		<b-row v-if="this.$parent.events.length > 0">
	  		
	  		  <b-button-toolbar key-nav class="pull-right"  aria-label="Toolbar">
			   
			    <b-button-group  size="sm" class="mx-1">
					<b-dropdown size="sm"  class="mx-1" right text="Filtern">
				      <b-dropdown-item>Berlin</b-dropdown-item>
				      <b-dropdown-item>Lübeck</b-dropdown-item>
				    </b-dropdown>
			    </b-button-group>
			    
			    <b-button-group  size="sm" class="mx-1">
					<b-btn variant="primary" v-b-modal.modal1><i class="fa fa-plus"></i>&nbsp; Event hinzufügen</b-btn>
			    </b-button-group>
			    
			   </b-button-toolbar>
	  		
	  		</b-row>
	  		
	  		<b-row class="py-3 px-2">
			  
			  <b-col style="max-width: 60px;">
			  <h5>Filter: </h5>
			  </b-col>
			  
			  <b-col>
			  <b-badge href="#" variant="primary">Filter <span class="dismiss">&times;</span> </b-badge>
			  </b-col>
			  
			</b-row>
	  		
	  		<b-list-group v-if="this.$parent.events.length > 0">
			  <b-list-group-item href="#" class="flex-column align-items-start" v-for="event in this.$parent.events">
			    
			    <b-row>
			        
			        <!-- ev is in same month -->
			        <b-col lg="2" md="3" sm="12" class="etc-same-month" v-if="new Date(event.startDate).getMonth() == new Date(event.endDate).getMonth()">
			        	 
			        	 
			        	 <span class="readable-time-left" v-if="( new Date(event.startDate).getTime() - (new Date().getTime()) ) < (7 * 24 * 60 * 60 * 1000)">
				        	 <small>in {{ (new Date(event.startDate).getTime() - (new Date().getTime() )) | readableTime() }}</small>
				         </span>
			        	 
			        	 <div v-if="new Date(event.startDate).getDay() == new Date(event.endDate).getDay()">
				        	
			        	 	<span class="date">{{ event.startDate | regularDate() }}</span><br/>
			        	 	<span class="time">{{ event.startDate | dateTime() }} – {{ event.endDate | dateTime() }}</span>
			        	 </div>
			        	 <div v-if="new Date(event.startDate).getDay() != new Date(event.endDate).getDay()">
			        	 	<span class="date">{{ event.startDate | dateDay() }}. – {{ event.endDate | regularDate() }}</span><br/>
			        	 </div>
			        	 
			        </b-col>
			        <!-- ev is not in same month -->
			        <b-col lg="2" md="3" sm="12" class="etc-not-same-month" v-if="new Date(event.startDate).getMonth() != new Date(event.endDate).getMonth()">
			        	{{ event.startDate | regularDate() }} bis {{ event.endDate | regularDate() }}
			        </b-col>
			        
			        <b-col lg="10" md="9" sm="12">
			        	<h3 class="mb-1">{{ event.title }}</h3>
			        	<h5>
				        	<small v-if="event.location"><i class="fa fa-building"></i> {{event.location}}</small>
				        	<small>{{event.brand}}</small>
				        	<small v-if="event.room"><i class="fa fa-tag"></i> {{event.room}}</small>
				        	<small v-if="event.organiser"><i class="fa fa-user"></i> {{event.organiser}}</small>

			        	</h5>
						<p class="mb-1">
							{{ event.description }}
			    		</p>	
			        </b-col>
			    </b-row>
			  </b-list-group-item>
			</b-list-group>
			
			  <div>			
			  <!-- Modal Component -->
			  <b-modal id="modal1" size="lg" title="Event hinzufügen" cancel-title="Abbrechen" @ok="onSubmit" ok-title="Speichern">
			    
			    
			    <b-form @submit="onSubmit" @reset="onReset" v-if="status == 'idle'">
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

				<b-row>
					<b-col md="6" sm="12">
					
					<b-form-group id="inputEventRoomLabel"
				                    label="Raum"
				                    label-for="inputEventRoom"
				                    description="">
				
				      <b-form-input id="inputEventRoom"
	                      type="text"
	                      v-model="form.room"
	                      required>
					  </b-form-input>
      			
					 </b-form-group>
					 
				     </b-col>
				     <b-col md="6" sm="12">
					 	<b-form-group id="inputEventLocationLabel"
				                    label="Standort"
				                    label-for="inputEventLocation"
				                    description="">
				        
					        <b-form-select id="inputEventLocation"
					                      :options="locations"
					                      required
					                      v-model="form.location">
					        </b-form-select>					
						</b-form-group>
				     </b-col>
				 </b-row>
				 
				 <b-row>
					<b-col md="6" sm="12">
					
					<b-form-group id="inputEventContactLabel"
				                    label="Ansprechpartner"
				                    label-for="inputEventContact"
				                    description="">
				
				      <b-form-input id="inputEventRoom"
	                      type="text"
	                      v-model="form.organiser"
	                      required>
					  </b-form-input>
      			
					 </b-form-group>
					 
				     </b-col>
				     <b-col md="6" sm="12">
					 	<b-form-group id="inputEventBrandLabel"
				                    label="Veranstalter"
				                    label-for="inputEventBrand"
				                    description="">
				        
					        <b-form-select id="inputEventBrand"
					                      :options="brands"
					                      required
					                      v-model="form.brand">
					        </b-form-select>					
						</b-form-group>
				     </b-col>
				 </b-row>

			      <b-form-group id="inputEventDescription"
			                    label="Kurzbeschreibung"
			                    label-for="inputEventDescription"
			                    description="">
			                    
			       <b-form-textarea id="inputEventDescription"
                      v-model="form.description"
                      placeholder="(optional)"  style="min-height: 140px;">
				   </b-form-textarea>
				   
			    </b-form-group>

			    </b-form>
			    
			  </b-modal>
			  </div>

	  		</div>
	  		<div v-if="this.$parent.events.length == 0">
			
	  		<b-list-group>
			  <b-list-group-item href="#" class="flex-column align-items-start">
			    <small>Lade Daten ...</small>
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
import 'bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
  
export default {
  name: 'app',
  props: {
	event: {
		title: String,
		startDate: String,
		description: String,
	}	  
  },
  data() {
	return { 
		status: 'idle',
		form: {
	        title: '',
	        startDate: { 
		      date: new Date(),
			  options: {
				  format: 'DD.MM.Y HH:mm',
				  useCurrent: false,
				  sideBySide: true,
				  showClear: true,
				  showClose: true,
				  locale: 'de',
			  }
        	},
        	endDate: { 
		      date: new Date(),
			  options: {
				  format: 'DD.MM.Y HH:mm',
				  useCurrent: false,
				  sideBySide: true,
				  showClear: true,
				  showClose: true,
				  locale: 'de',
			  }
        	},
	        description: '',
	        room: '',
	        location: '',
			organiser: '',
	        brand: ''
		},
		locations: [
			{ text: 'Standort wählen', value: null },
			'Berlin', 'Lübeck',
		],
		brands: [
			{ text: 'Unternehmen wählen', value: null },
			'Hypoport', 'EUROPACE', 'Genopace', 'FINMAS'
		]		
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
	  this.status = 'load';
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