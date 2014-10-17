'use strict';

(function(){

	var dependencies = [
		'angular'
		,'services/NewPlayerConfigSrvc'
		,'services/NewPlayerRouteSrvc'
		,'services/NewPlayerProviderSrvc'
		,'services/NewPlayerLoadSrvc'
		,'controllers/NewPlayerCtrl'
		,'controllers/NewPlayerInitCtrl'
		,'controllers/NewPlayerPageCtrl'
	];

	define(
		dependencies,
		function(
			angular
			,NewPlayerConfigSrvc
			,NewPlayerRouteSrvc
			,NewPlayerProviderSrvc
			,NewPlayerLoadSrvc
			,NewPlayerCtrl
			,NewPlayerInitCtrl
			,NewPlayerPageCtrl
		)
		{
			var npMod =
				angular.module( 'NewPlayer', [] );

			/* Load NewPlayer configurations */
			npMod.service(
				'npConfig',
				NewPlayerConfigSrvc
			);

			/* Configure Routes */
			npMod.config(
				NewPlayerRouteSrvc
			);

			/* Configure Providers (for dynamic injection) */
			npMod.config(
				NewPlayerProviderSrvc
			);

			npMod.factory(
				'npLoad',
				NewPlayerLoadSrvc
			);

			npMod.controller(
				'npCtrl',
				NewPlayerCtrl
			);

			/* Controller for initializing from manifest */
			npMod.controller(
				'npInitCtrl',
				NewPlayerInitCtrl
			);

			/* Controller for pages */
			npMod.controller(
				'npPageCtrl',
				NewPlayerPageCtrl
			);

			return npMod;
		}
	);

}());
