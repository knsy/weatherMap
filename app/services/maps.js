// taken from https://guides.emberjs.com/v2.18.0/tutorial/service/
import Service from '@ember/service';
import { camelize } from '@ember/string';
import EmberObject from '@ember/object';
import config from '../config/environment';

const google = window.google;

//const { observer, run} = Ember;

export default Service.extend({

	init() {
		this.set('geocoder', new google.maps.Geocoder());
		this.set('directionsService', new google.maps.DirectionsService());
		this.set('directionsDisplay', new google.maps.DirectionsRenderer());
	},

	getMapElement(originAddress, destinationAddress) {
		let camelizedLocation = camelize(originAddress);
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
				this.getZipCodes(google.maps.geometry.encoding.decodePath(result.routes[0].overview_polyline));
			}
		}.bind(this);

		this.get('directionsService').route(request,sendBack); 
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
		console.log(requestUrl);
		this.send('sendIt', 666);
	}

});
