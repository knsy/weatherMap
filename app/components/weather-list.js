import Component from '@ember/component';
import { observer } from '@ember/object'; 
import { run } from '@ember/runloop'; 
import config from '../config/environment';

const google = window.google;

export default Component.extend({

	currentZipCodes:[],

	actions:{
		sendZipToStore(polyline){
			//save to store here
			//console.log("in sendpolylinetostore: ");
			//this.sendAction('savePolyline', polyline);
			this.sendAction('sendPolylineToStore', polyline);
		},

		getZipCodes: function(reqAddress) {

        	var self = this;
        	Ember.$.ajax({
            	url: reqAddress,
            	// your other details...
        	}).then(function(resolve) {
            	//self.set('name', resolve.doc.name);
            	//console.log(resolve.postalCodes[0].postalCode);
            	let zipCode = resolve.postalCodes[0].postalCode;
            	// process the result...
            	if(!self.get('currentZipCodes').includes(zipCode)){
            		self.get('currentZipCodes').push(zipCode);
            		//console.log(zipCode);
            		self.send('getWeather', zipCode);
            	}
        	});
    	},

    	getWeather: function(zipCode){
    		var self = this;

    		var reqAddress = this.get('compileWeatherReq')(zipCode);
    		//console.log(reqAddress);
        	Ember.$.ajax({
            	url: reqAddress,
            	// your other details...
        	}).then(function(resolve) {
            	//self.set('name', resolve.doc.name);
            	//console.log(resolve.postalCodes[0].postalCode);
            	//let zipCode = resolve.postalCodes[0].postalCode;
            	// process the result...
            	//if(!self.get('currentZipCodes').includes(zipCode)){
            	//	self.get('currentZipCodes').push(zipCode);
            		//console.log(zipCode);

            		self.sendAction('sendWeatherToStore', resolve, zipCode);
            	//}
        	});

    	}
	},

	onLocationsChanged: observer('currentPoly', function() {
		run.once(this, 'getCoordFromPoly');
	}),

	getCoordFromPoly(){
		console.log("we in weatherlist: " + this.get('currentPoly'));
		//let coordArray = google.maps.geometry.encoding.decodePath(this.get('currentPoly'));
		//console.log(coordArray);
		let coordArray = google.maps.geometry.encoding.decodePath(this.get('currentPoly'));
		let coord = coordArray.pop();
		while(coord !== undefined){
			//console.log(coord.toString());	
			//this.latlngToZip(coord.lat(), coord.lng());
			let reqAddress = this.get('compileGeoReq')(coord.lat(), coord.lng());
			
			this.send('getZipCodes', reqAddress);

			coord = coordArray.pop();
			 
			}

	},

	compileGeoReq(lat, lng) {
		let serviceUrl = "http://api.geonames.org/findNearbyPostalCodesJSON?";
		let requestUrl = `${serviceUrl}lat=${lat}&lng=${lng}&username=${config.geonamesAPIKey}`;
		return (requestUrl);
	},

	compileWeatherReq(zipCode) {
		//api.openweathermap.org/data/2.5/forecast?zip=94040,us&APPID=1111111111
		let serviceUrl = "http://api.openweathermap.org/data/2.5/forecast?";
		let requestUrl = `${serviceUrl}zip=${zipCode},us&APPID=${config.openWeatherAPIKey}`;
		return (requestUrl);
	}
});
