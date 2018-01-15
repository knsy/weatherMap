'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'weather-map',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

		firebase: {
			apiKey: process.env.firebaseAPIKey,
			authDomain: process.env.firebaseAuthDomain,
			databaseURL: process.env.firebaseURL,
			storageBucket: process.env.firebaseStorageBucket,
			projectId: process.env.firebaseProjectId,
			messagingSenderId: process.env.firebaseMessagingSenderId
		},

		 contentSecurityPolicy: {
			 'script-src': "'self' 'unsafe-eval' apis.google.com",
			 'frame-src': "'self' https://*.firebaseapp.com",
			 'connect-src': "'self' wss://*.firebaseio.com https://*.googleapis.com"
		 }
		
		
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
		
		//API keys
		ENV.gMapsAPIKey = process.env.gMapsAPIKey;
		
		//Google Maps parameters
		ENV['g-map'] = {
				libraries: ['places', 'geometry'],
				key: process.env.gMapsAPIKey,
				language: 'en',
				protocol: 'https'
		}
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;

		//API keys
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature

		//API keys
  }

  return ENV;
};
