import Component from '@ember/component';
import { inject as service } from '@ember/service';
import config from '../config/environment';
import { observer } from '@ember/object'; 
import { run } from '@ember/runloop'; 

//import geonames from '..utils/geonames';

const google = window.google;


export default Component.extend({

	init(){
		this._super(...arguments);
		this.errors = [];

		this.set('geocoder', new google.maps.Geocoder());
		this.set('directionsService', new google.maps.DirectionsService());
		this.set('directionsDisplay', new google.maps.DirectionsRenderer());
	},

	actions:{
		sendIt(data){
			alert(data);
		},
		
		sendPolylineToStore(polyline){
			//save to store here
			//console.log("in sendpolylinetostore: ");
			//this.sendAction('savePolyline', polyline);
			this.sendAction('sendPolylineToStore', polyline);
		}
	},

	didInsertElement() {
		this._super(...arguments);
		let originAddress = this.get('originAddress');
		let destinationAddress = this.get('destinationAddress');
		let mapElement = this.getMapElement(originAddress, destinationAddress);
		this.$('.map-container').append(mapElement);
	},

	onLocationsChanged: observer('originAddress', 'destinationAddress', function() {
		run.once(this, 'updateMapNewAddr');
	}),

	updateMapNewAddr(){
		let originAddress = this.get('originAddress');
		let destinationAddress = this.get('destinationAddress');
		this.updateMapElement(originAddress, destinationAddress);
	},

	// From Service
	getMapElement(originAddress, destinationAddress) {
		//let camelizedLocation = camelize(originAddress);
		let element //= this.get(`cachedMaps.${camelizedLocation}`);
		if (!element) {
			element = this.createMapElement();
			this.createMap(element, originAddress, destinationAddress);
//						      this.set(`cachedMaps.${camelizedLocation}`, element);
		}
		return element;
	},

	createMapElement() {
		let element = document.createElement('div');
		element.className = 'map';
		return element;
	},

	updateMapElement(originAddress, destinationAddress) {
		this.updateMap(originAddress, destinationAddress);
	},

	createMap(element, originAddress, destinationAddress) {
		var mapOptions = {
			scrollwheel: false, 
			zoom: 10 ,
		}

		let map = new google.maps.Map(element, mapOptions);

		this.set('map', map);

		this.get('directionsDisplay').setMap(map);

		this.calcRoute(originAddress, destinationAddress);

		return map;
	},

	updateMap(originAddress, destinationAddress){
		this.calcRoute(originAddress, destinationAddress);
	},

	calcRoute(originAddress, destinationAddress) {
		var start = originAddress;
		var end = destinationAddress;
		let directionsDisplay = this.get('directionsDisplay');
		var request = {
			origin: start,
			destination: end,
			travelMode: 'DRIVING'
		};
		
		var sendBack = function(result, status) {
			if (status == 'OK') {
				directionsDisplay.setDirections(result);
				//console.log(google.maps.geometry.encoding.decodePath(result.routes[0].overview_polyline));
				//this.getZipCodes(google.maps.geometry.encoding.decodePath(result.routes[0].overview_polyline));
				this.sendPolyline(google.maps.geometry.encoding.decodePath(result.routes[0].overview_polyline));
			}
		}.bind(this);

		this.get('directionsService').route(request,sendBack); 
	},

	sendPolyline(polyline){
		this.send('sendPolylineToStore', polyline);
	},

	getZipCodes(coordArray){
		//let coordArray = (google.maps.geometry.encoding.decodePath(result.routes[0].overview_polyline));
		let coord = coordArray.pop();
		while(coord !== undefined){
			//console.log(coord.toString());	
			this.latlngToZip(coord.lat(), coord.lng());
			coord = coordArray.pop();
			 
			}
	},

	latlngToZip(lat, lng) {
		let serviceUrl = "http://api.geonames.org/findNearbyPostalCodesJSON?";
		let requestUrl = `${serviceUrl}lat=${lat}&lng=${lng}&username=${config.geonamesAPIKey}`
		//console.log(requestUrl);
		//this.send('sendIt', 666);

	}


});
