'use strict';

(function(){

	var dependencies = [
		'new-player'
	];

	define(
		dependencies,
		function( angular )
		{
			// get reference to New Player module
			var npApp =
				angular
					.module( 'newPlayer' );
					//.config()
					//.service()
					//.controller();

			/****************************
			 * Bootstrap App
			 ****************************/
			console.log('app::inject app', npApp );
			var injector = angular.bootstrap(document, ['newPlayer']);
			console.log('app::injector', injector );

			return npApp;
		}
	);

}());
