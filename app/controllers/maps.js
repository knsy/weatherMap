import Controller from '@ember/controller';

export default Controller.extend({
	//definitely shouldn't use hardcoded things like this.
	currentStart: "Oakland, CA",
	currentEnd: "Emeryville, CA",
	currentMapId: '-L3-fZX9ZHWd0eLCINeR',

	actions: {
		addrSubmit: function(){
			let addrStart = this.get('addrStart');
			let addrEnd = this.get('addrEnd');

			this.set('currentStart', addrStart);
			this.set('currentEnd', addrEnd);

			let newMap = this.store.createRecord('map', {addrStart: addrStart, addrEnd:addrEnd, routePolyline: null});
			
			this.set('currentMapId', newMap.get('id'));

			//console.log(this.get('currentMap'));

			//newMap.save();

			//((this.get('store').findAll('map')).then((response)=>{console.log(response)}));

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

			

		}
	
	}
});
