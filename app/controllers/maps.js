import Controller from '@ember/controller';

export default Controller.extend({
	//definitely shouldn't use hardcoded things like this.
	currentStart: "Oakland, CA",
	currentEnd: "Emeryville, CA",
	currentMapId: '-L3-fZX9ZHWd0eLCINeR',
	currentPoly: null,

	init(){
		this._super(...arguments);
		this.errors = [];
		
		//clear out old weather data.
		this.get('store').findAll('weather').then(function(record){
     		record.content.forEach(function(rec) {
        		Ember.run.once(this, function() {
           			rec.deleteRecord();
           			rec.save();
       			 });
     		}, this);
  		});
	},

	actions: {
		addrSubmit: function(){
			//clear out old weather data.
			this.get('store').findAll('weather').then(function(record){
     			record.content.forEach(function(rec) {
        			Ember.run.once(this, function() {
           				rec.deleteRecord();
           				rec.save();
       			 	});
     			}, this);
  			});


			let addrStart = this.get('addrStart');
			let addrEnd = this.get('addrEnd');

			this.set('currentStart', addrStart);
			this.set('currentEnd', addrEnd);

			let newMap = this.store.createRecord('map', {addrStart: addrStart, addrEnd:addrEnd, routePolyline: null});
			
			this.set('currentMapId', newMap.get('id'));
			

		},

		sendPolylineToStore(polyline){
			//console.log('maps controller savePoly');
			//save polyline.
			//this.get('store').findRecord('map', 1).then(function(mapRecord) {
			  // ...after the record has loaded
			  //console.log(mapRecord);
			//});
			var writeMap = function(map) {
				let currentMap = map;
  				this.set('currentMapId' , currentMap.get('id'));
  				this.set('currentPoly', polyline);
  				currentMap.set('routePolyline', polyline);
  				//console.log(this.get('currentMap'));
  				currentMap.save();
  				//console.log('yey save poly');

			}.bind(this);

			this.store.findRecord('map', this.get('currentMapId')).
				then(response => writeMap(response));
			//this.store.findAll('map').then(function(response){writeMap(response)});

			//console.log(this.get('currentMap'));
			//this.get('currentMap').set(routePlolyline, polyline);
			//this.get('currentMap').save();

			

		},

		sendWeatherToStore(weatherForPlace, placeZipcode){
			//console.log('save new weather object here');
			console.log(weatherForPlace);

			let weatherDescription = weatherForPlace.list[0].weather[0].description;
			//let weatherZip = weatherForPlace.

			let newWeather = this.store.createRecord('weather', 
				{mapID: this.get('currentMapId'), zipcode: placeZipcode, weather: weatherDescription });


			newWeather.save();
		}
	
	}
});
