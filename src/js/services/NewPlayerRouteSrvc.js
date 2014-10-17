/*global define*/
'use strict';

/**
 * The initialization controller for the app.
 */

(function(){

	var dependencies = [
	];

	define(
		dependencies,
		function ( )
		{
			var NewPlayerRouteSrvc = function( $routeProvider )
			{
				console.log('NewPlayerRouteSrvc::');
				/****************************
				 * New Player Routes
					- root = /#/manifestId
					- page = /#/manifestId/pageId
				 ****************************/
				$routeProvider.
					when('/:manifestId', {
						templateUrl: 'views/init.html'
						,controller: 'npInitCtrl'
					}).
					when('/:manifestId/:locality/:pageId', {
						templateUrl: 'views/page.html'
						,controller: 'npPageCtrl'
					}).
					otherwise({redirectTo: '/home'});
			}

			return [ '$routeProvider', NewPlayerRouteSrvc ];
		}
	);

}());
