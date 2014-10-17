/*global define*/
'use strict';

/**
 * The initialization controller for the app.
 */

(function(){

	// TBD - move manifest parsing logic to service
	var dependencies = [
		'services/NewPlayerManifestSrvc'
	];

	define(
		dependencies,
		function( NewPlayerManifestSrvc ) {

			var NewPlayerInitCtrl = function( npConfig, $scope, $http, $location, $routeParams )
			{
				console.log( 'NewPlayerInitCtrl::config=', npConfig );
				/****************************
				 * Parse manifest
						- determine language
							- SCORM enabled with lang specified?
							- default lang specified?
							- language page
						- determine default page and re-route
				 ****************************/

				var isCorrectLocality = false;
				function parseModule( npModule ) {
					// parse current module
					var npmType = npModule.type;
					var npmId   = npModule.id;
					var npmData = npModule.data;
					var npmModules = npModule.modules;

					switch ( npmType )
					{
						case 'SCORM' :
							// Determine default language
							// parse SCORM settigns
							// if SCORM langauge/locality - replace manifest default
							// npConfig.locality = SCORM.getLocality ... or whatever...
							break;
						case 'content' :
							// is language known
							if ( !npConfig.locality )
							{
								// Determine default language
								// use manifest default - 1st npContent block
								npConfig.locality = npmData.language;
								isCorrectLocality = true;
							} else {
								// default language known
								// - set flag if parsing correct language
								//   for default page detection.
								if ( npConfig.locality == npmData.language )
								{
									isCorrectLocality = true;
								} else {
									isCorrectLocality = false;
								}
							}
							break;
						case 'page' :
							// Determine default page - 1st page in default language
							if ( isCorrectLocality && !npConfig.pageId )
							{
								npConfig.pageId = npmId;
							}
							break;
					}
					// TBD - detect SCORM flag (pull in library and detect language)


					for( var moduleIdx in npmModules )
					{
						var module = npmModules[moduleIdx];
						parseModule( module );
					}
				}
				function parseManifest( manifest )
				{
					console.log( 'NewPlayerInitCtrl::pre-parse:', npConfig );
					parseModule( manifest[0] );
					console.log( 'NewPlayerInitCtrl::post-parse:', npConfig );
					$location.path( npConfig.manifestId + '/' + npConfig.locality + '/' + npConfig.pageId );
				}

				if ( !! npConfig.manifest )
				{
					parseManifest( npConfig.manifest );
				} else {
					npConfig.manifestId = $routeParams.manifestId;
					var manifestURL = npConfig.manifestURLPrefix + npConfig.manifestId + npConfig.manifestURLSuffix;
					console.log( 'newPlayerInitCtrl - manifest:', manifestURL );
					$http.get( manifestURL )
						.then(
							function( npManifest )
							{
		console.log( 'manifest:', npManifest );
								npConfig.manifest = npManifest.data;
		console.log( 'data:', npConfig.manifest );
								parseManifest( npConfig.manifest );
							}
						);
				}
			}

			return ['npConfig', '$scope', '$http', '$location', '$routeParams', NewPlayerInitCtrl ];

		}
	);

}());
