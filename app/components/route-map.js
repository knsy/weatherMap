//from https://guides.emberjs.com/v2.18.0/tutorial/service/
import Component from '@ember/component';
import { inject as service } from '@ember/service';

const { isEmpty, isPresent, observer, computed, run, assert } = Ember;

export default Component.extend({
	maps: service(),

	didInsertElement() {
		this._super(...arguments);
		let originAddress = this.get('originAddress');
		let destinationAddress = this.get('destinationAddress');
		let mapElement = this.get('maps').getMapElement(originAddress, destinationAddress);
		this.$('.map-container').append(mapElement);
	},

	onLocationsChanged: observer('originAddress', 'destinationAddress', function() {
		run.once(this, 'updateMap');
	}),

	updateMap(){
		let originAddress = this.get('originAddress');
		let destinationAddress = this.get('destinationAddress');
		this.get('maps').updateMapElement(originAddress, destinationAddress);
	}
});
