/*global require*/
'use strict';

/* see important shim notes if optimizer is causing issues:
 * http://requirejs.org/docs/api.html#config-shim
 */

require.config({
	//enforceDefine: true,
	//urlArgs: "bust=" +  (new Date()).getTime(),
	paths: {
		'text': '../lib/requirejs-text/text'
		,'angular': '../lib/angular/angular'
		,'angular-route': '../lib/angular-route/angular-route.min'
		//,'angular-logX': '../lib/angular-logX/release/amd/angular-logX.min',
	},
	shim: {
		'angular': {
			exports: 'angular'
		},
		'angular-route': {
			deps: ['angular'],
			exports: 'angular-route'
		}
		//,'angular-route': ['angular']
	},
	deps: ['app'],
	callback: function() {
		// done loading deps
	}
});

