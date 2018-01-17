import Route from '@ember/routing/route';

export default Route.extend({
	//model:
    //	return Ember.RSVP.hash({
    //       mapModel: this.get('store').findAll('map'),
    //       weathers: this.get('store').findAll('weather')
    //});
    model() {
    	return Ember.RSVP.hash({
      		maps: this.store.findAll('map', {limit: 3}),
      		weathers: this.store.findAll('weather')
    	});
  	},

  	setupController(controller, model) {
    	this._super(...arguments);
    	Ember.set(controller, 'maps', model.maps);
    	Ember.set(controller, 'weathers', model.weathers);
  	}
	
});
