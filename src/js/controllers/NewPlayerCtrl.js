/*global define*/
'use strict';

/**
 * The main controller for NewPlayer.
 */

(function(){

	define( function () {

		var NewPlayerCtrl = function( $scope, $http, $location, npLoad )
		{
			console.log( 'NewPlayerCtrl::' );
			/****************************
			 * Core NewPlayer controller
			 ****************************/
			$scope.message = "Message from NewPlayerCtrl"; 


			/*
			// post-bootstrap module load example
			npLoad(
				'HTML',
				function()
				{
					$scope.pageStatus = "loaded";
				},
				function()
				{
					$scope.pageStatus = "error";
				}
			);
			*/
		}

		return [ '$scope', '$http', '$location', 'npLoad', NewPlayerCtrl ];

	});

}());
