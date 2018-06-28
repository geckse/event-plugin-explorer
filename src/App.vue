<template>
	<b-container>
	  		
	  		<h2>Veranstalungs-Kalender</h2>
	  		
	  		<b-list-group>
			  <b-list-group-item href="#" class="flex-column align-items-start" v-for="event in events" v-bind:todo="event" :key="event.id">
			    
			    <b-row>
			        <b-col lg="2" md="3" sm="12">{{ event.startDate | moment("d.m.Y H:i") }}</b-col>
			        <b-col lg="10" md="9" sm="12">
			        	<h3 class="mb-1">{{ event.title }}</h3>
						<p class="mb-1">
							{{ event.description }}
			    		</p>	
			        </b-col>
			    </b-row>
			  </b-list-group-item>
			</b-list-group>

	  		<b-list-group>
			  <b-list-group-item href="#" class="flex-column align-items-start">
			    <small>Lade daten ...</small>
			  </b-list-group-item>
			</b-list-group>
	  		
	  		
      </b-container>

</template>
