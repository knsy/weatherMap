import Controller from '@ember/controller';

export default Controller.extend({
	currentStart: "Oakland, CA",
	currentEnd: "Emeryville, CA",
	actions: {
		addrSubmit: function(){
			let addrStart = this.get('addrStart');
			let addrEnd = this.get('addrEnd');

			this.set('currentStart', addrStart);
			this.set('currentEnd', addrEnd);

			let newMap = this.store.createRecord('map', {addrStart: addrStart, addrEnd:addrEnd});
			
			newMap.save();

			//((this.get('store').findAll('map')).then((response)=>{console.log(response)}));

		}
	}
});
