//from https://guides.emberjs.com/v2.18.0/tutorial/service/
import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
	maps: service(),

	didInsertElement() {
		this._super(...arguments);
		console.log("map got updated");
		let originAddress = this.get('originAddress');
		let destinationAddress = this.get('destinationAddress');
		let mapElement = this.get('maps').getMapElement(originAddress, destinationAddress);
		this.$('.map-container').append(mapElement);
	}
});
