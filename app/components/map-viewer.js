import Component from '@ember/component';
import config from '../config/environment';

export default Component.extend({
//	init(){
//		this._super(...arguments);
//		this.errors = [];
//
//		//we want to go get the model and display first entry
//		//((this.get('store').findAll('map')).then((response)=>{console.log(response)}));
//	},

	model: function(){
		// var stuffFromServer = this.get('store').query('map', {
		//   filter: {
		//     toDisplay: true
		//   }
		// });
		console.log(this.get('store').findAll('map'));
		return this.get('store').findAll('map');
	},
	
	actions: {
		onLocationChangeHandler(lat, lng, results) {
			// Ember.Logger.log(`lat: ${lat}, lng: ${lng}`);
			// Ember.Logger.debug(results);
		}
	}
});
