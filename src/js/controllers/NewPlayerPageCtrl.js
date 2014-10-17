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

			var NewPlayerPageCtrl = function( npConfig, npLoad, $scope, $routeParams, $http, $templateCache, $location )
			{
				console.log( 'NewPlayerPageCtrl' );
				/****************************
						- Page rendering
							- recursive module loading
				 ****************************/
				var npmLoading=0;
				var npmLoaded=0;

				function parseManifest( manifest )
				{
					if ( !npConfig.manifestId )
						npConfig.manifestId = $routeParams.manifestId
					if ( !npConfig.locality )
						npConfig.locality = $routeParams.locality
					if ( !npConfig.pageId )
						npConfig.pageId = $routeParams.pageId
					console.log( 'NewPlayerPageCtrl::pre-parse' );
					$scope.pageStatus = 'loading';
					parseModule( manifest[0] );
					console.log( 'NewPlayerPageCtrl::post-parse:', npConfig.module, npmLoading, npmLoaded );
				}

				function parseModule( npModule ) {
					// parse current module
					var npmType = npModule.type;
					var npmId   = npModule.id;
					var npmData = npModule.data;
					var npmModules = npModule.modules;

					console.log( 'NewPlayerPageCtrl::parse:', npmType, npmId, npmData, npmModules );
					var skip=false;
					if ( npmType == 'content' && npmData.language != npConfig.locality )
					{
						skip = true;
						console.log( 'NewPlayerPageCtrl::skip:', npmType, npmData.language + '!=' + npConfig.locality );
					}
					if ( npmType == 'page' && npmId != npConfig.pageId )
					{
						skip = true;
						console.log( 'NewPlayerPageCtrl::skip:', npmType, npmId + '!=' + npConfig.page );
					}
					if (!skip)
					{
						npmLoading++;
						console.log( 'NewPlayerPageCtrl::loading:', npmType, npmLoading, npmLoaded );
						npConfig.page.push( npModule );
						npLoad(
							npmType,
							function()
							{
								// need to track queue of loading modules
								// and update status after all have loaded
								npmLoading--;
								npmLoaded++;
								console.log( 'NewPlayerPageCtrl::loaded:', npmType, npmLoading, npmLoaded );
								if ( npmLoading )
								{
									$scope.pageStatus = 'loading';
								} else {
									parseDone();
								}
							},
							function()
							{
								console.log( 'NewPlayerPageCtrl::error:', npmType );
								$scope.pageStatus = 'error';
							}
						);

						for( var moduleIdx in npmModules )
						{
							var module = npmModules[moduleIdx];
							parseModule( module );
						}
					}
				}

				function parseDone() {
					//console.log( 'NewPlayerPageCtrl::done loading:', npmLoading, npmLoaded, npConfig.page, npConfig.module );
					$scope.pageStatus = 'loaded';
					var page = '';
					for ( var mIdx in npConfig.page )
					{
						console.log( 'NewPlayerPageCtrl::adding:', npConfig.page[mIdx], npConfig.module[ npConfig.page[mIdx].type ] );
						page += npConfig.module[ npConfig.page[mIdx].type ].content;
					}
					$templateCache.put( 'lazy', page );
				}

				if ( !! npConfig.manifest )
				{
					parseManifest( npConfig.manifest );
				} else {
					npConfig.manifestId = $routeParams.manifestId;
					var manifestURL = npConfig.manifestURLPrefix + npConfig.manifestId + npConfig.manifestURLSuffix;
					console.log( 'NewPlayerPageCtrl:: - manifest:', manifestURL );
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

			return ['npConfig', 'npLoad', '$scope', '$routeParams', '$http', '$templateCache', '$location', NewPlayerPageCtrl ];
		}
	);

}());
