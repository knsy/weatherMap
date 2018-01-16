// taken from https://guides.emberjs.com/v2.18.0/tutorial/service/
import Service from '@ember/service';
import { camelize } from '@ember/string';
import EmberObject from '@ember/object';

import MapUtil from '../utils/google-maps';

export default Service.extend({

	init() {
//			    if (!this.get('cachedMaps')) {
//						      this.set('cachedMaps', EmberObject.create());
//						    }
		if (!this.get('mapUtil')) {
			this.set('mapUtil', MapUtil.create());
		}
	},

	getMapElement(originAddress, destinationAddress) {
		let camelizedLocation = camelize(originAddress);
		let element //= this.get(`cachedMaps.${camelizedLocation}`);
		if (!element) {
			element = this.createMapElement();
			this.get('mapUtil').createMap(element, originAddress, destinationAddress);
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
		this.get('mapUtil').updateMap(originAddress, destinationAddress);
	}

});