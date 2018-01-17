import DS from 'ember-data';

export default DS.Model.extend({
	mapID: DS.attr('string'),
	zipcode: DS.attr('string'),
	weather: DS.attr('string')
});
