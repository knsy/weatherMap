import DS from 'ember-data';

export default DS.Model.extend({
	mapID: DS.attr('string'),
	zipcode: DS.attr('string'),
	weatherNow: DS.attr('string'),
	weatherThen: DS.attr('string'),
	weatherLater: DS.attr('string')
});
