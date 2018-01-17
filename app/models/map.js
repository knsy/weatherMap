import DS from 'ember-data';

export default DS.Model.extend({
	addrStart: DS.attr('string'),
	addrEnd: DS.attr('string'),
	routePolyline: DS.attr('string')
});
