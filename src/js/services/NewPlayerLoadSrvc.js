/*global define*/
'use strict';

/**
 * The initialization controller for the app.
 */

(function(){

	define(
		function ()
		{
			var NewPlayerLoadSrvc = function( npConfig, $rootScope, $templateCache, $q )
			{
				/****************************
				 * New Player Loader
				 ****************************/
				console.log('NewPlayerLoadSrvc::');
				var deferred = {};
				var promise = {};
				function loadModule( module, successCallback, errorCallback )
				{
					console.log('NewPlayerLoadSrvc::loadModule:', module);
					successCallback = ( successCallback || angular.noop );
					errorCallback = ( errorCallback || angular.noop );

					// If the module has already been loaded then
					// simply bind the handlers to the existing promise.
					// No need to try and load the files again.
					if ( promise[module] )
					{
						return(
							promise[module].then( successCallback, errorCallback )
						);
					}

					deferred[module] = $q.defer();

					// Wire the callbacks into the deferred outcome.
					promise[module] = deferred[module].promise;
					promise[module].then( successCallback, errorCallback );

					// Load the module templates and components.
					// --
					// The first dependency here is an HTML file which
					// is loaded using the text! plugin. This will pass
					// the value through as an HTML string.
console.log('NewPlayerLoadSrvc::require module=',module);
					require(
						[
							'text!modules/' + module + '/' + 'view.html',
							'js/modules/' + module + '/' + 'behavior.js'
						],
						function requireSuccess( templatesHtml )
						{
							// Fill the template cache. The file content
							// is expected to be a list of top level
							// Script tags.
//console.log('NewPlayerLoadSrvc::template=', templatesHtml );
							var newContent = templatesHtml.replace( /<\/?script.*>/g, '' );
//console.log('NewPlayerLoadSrvc::content=', newContent );
							npConfig.module[module] = { content: newContent };
//console.log('NewPlayerLoadSrvc::module=', npConfig.module );

							// Module loaded, resolve deferred.
							$rootScope.$apply(
								function() {
									deferred[module].resolve();
								}
							);
						},
						function requireError( error )
						{
console.log('NewPlayerLoadSrvc::requireError=', error);
							// Module load failed, reject deferred.
							$rootScope.$apply(
								function()
								{
									deferred[module].reject( error );
								}
							);
						}
					);

					return( promise[module] );
				}
				return( loadModule );
			}

			return [ 'npConfig', '$rootScope', '$templateCache', '$q', NewPlayerLoadSrvc ];
		}
	);

}());
