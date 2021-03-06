// taken from https://guides.emberjs.com/v2.18.0/tutorial/service/
import EmberObject from '@ember/object';
const google = window.google;

export default EmberObject.extend({

	init() {
		this.set('geocoder', new google.maps.Geocoder());
		this.set('directionsService', new google.maps.DirectionsService());
		this.set('directionsDisplay', new google.maps.DirectionsRenderer());
	},

	createMap(element, originAddress, destinationAddress) {
		var mapOptions = {
			scrollwheel: false, 
			zoom: 10 ,
		}

		let map = new google.maps.Map(element, mapOptions);

		this.set('map', map);

		this.get('directionsDisplay').setMap(map);

		// Add markers, but right now unnecessary.
//		this.pinLocation(originAddress, map);
//		this.pinLocation(destinationAddress, map);

		this.calcRoute(originAddress, destinationAddress);

		return map;
	},

	updateMap(originAddress, destinationAddress){
		this.calcRoute(originAddress, destinationAddress);
	},

	pinLocation(location, map) {
		this.get('geocoder').geocode({address: location}, (result, status) => {
			if (status === google.maps.GeocoderStatus.OK) {
				let geometry = result[0].geometry.location;
				let position = { lat: geometry.lat(), lng: geometry.lng() };
				map.setCenter(position);
				new google.maps.Marker({ position, map, title: location });
			}
		});
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
				//this.get('')(google.maps.geometry.encoding.decodePath(result.routes[0].overview_polyline));
			}
		}.bind(this);

		this.get('directionsService').route(request,sendBack); 
	},

	getZipCodes(coordArray){
		//let coordArray = (google.maps.geometry.encoding.decodePath(result.routes[0].overview_polyline));
		let coord = coordArray.pop();
		while(coord !== undefined){
			//console.log(coord.toString());	
			//context.get('geonames').latlngToZip(coord.lat(), coord.lng());
			coord = coordArray.pop();
			 
			}
	}
});

//export default function googleMaps() {
//  return true;
//
