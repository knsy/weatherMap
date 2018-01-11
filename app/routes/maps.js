import Route from '@ember/routing/route';
import config from '../config/environment';

export default Route.extend({
	model: function(params){
		//use API key here to get and display map
		//console.log("API KEY:" + config.gMapsAPIKey);
	}
});
