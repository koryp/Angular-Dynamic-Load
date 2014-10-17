/*global define*/
'use strict';

/**
 * The initialization controller for the app.
 */

(function(){

	define(
		function ()
		{
			var NewPlayerManifestSrvc = function( )
			{
				/****************************
				 * New Player Loader
				 ****************************/
				console.log('NewPlayerManifestSrvc::');
				function manifestTools( manifest )
				{
					// move manifest parsing into here

					// parse manifest to establish default language, page (, etc.?)
					var initManifest = function( ) { }
				}
				return( manifestTools );
			}

			return [ '$rootScope', '$templateCache', '$q', NewPlayerManifestSrvc ];
		}
	);

}());
