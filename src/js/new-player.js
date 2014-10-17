'use strict';

var NewPlayerApp = function() {
	var module = {};
};

/**
 * New Player
 */
(function()
{

	var dependencies = [
		'angular'
		,'angular-route'
		,'modules/NewPlayer'
	];

	define(
		dependencies,
		function( angular, ngRoute, NewPlayer )
		{

			/****************************
			 * Create New Player Module
			 ****************************/
			var appModules = [ 
				'ngRoute'
				,'NewPlayer'
			];

			var app =
				angular.module(
					'newPlayer',
					appModules
				);

/*
			//app.config();
			//app.controller('Ctrl', function( $scope, $rootScope, fooService ) {
			//app.service(...)
			//app.factory(...)
			//app.directive(...)
			//app.run(
			//	function( instanceInjectables ) {
			//	}
			//);

			app.directive(
				'helloWorld',
				function()
				{
					console.log('parsing helloWorld');
					return {
						restrict: 'E',
						scope:{
							name:'@'
						},
						template: '<span>Hello {{name}}</span>'
					}
				}
			);
*/

			NewPlayerApp.module = app;

			return angular;
		}
	);

}());
