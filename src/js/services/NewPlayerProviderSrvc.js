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
			var NewPlayerProviderSrvc =
				function( $controllerProvider, $compileProvider, $provide )
				{
					console.log('NewPlayerProviderSrvc::');
					/****************************
					 * Dynamic injection
					 * After the AngularJS has been bootstrapped, you can no longer
					 * use the normal module methods (ex, app.controller) to add
					 * components to the dependency-injection container. Instead,
					 * you have to use the relevant providers. Since those are only
					 * available during the config() method at initialization time,
					 * we have to keep a reference to them.
					 * --
					 * NOTE: This general idea is based on excellent article by
					 * Ben Nadel: http://www.bennadel.com/blog/2554-loading-angularjs-components-with-requirejs-after-application-bootstrap.htm
					 * and
					 * Ifeanyi Isitor: http://ify.io/lazy-loading-in-angularjs/
					 ****************************/

					// Let's keep the older references.
					NewPlayerApp.module._controller = NewPlayerApp.module.controller;
					NewPlayerApp.module._service = NewPlayerApp.module.service;
					NewPlayerApp.module._factory = NewPlayerApp.module.factory;
					NewPlayerApp.module._value = NewPlayerApp.module.value;
					NewPlayerApp.module._directive = NewPlayerApp.module.directive;

					// Provider-based controller.
					NewPlayerApp.module.controller = function( name, constructor ) {
						$controllerProvider.register( name, constructor );
						return( this );
					};

					// Provider-based service.
					NewPlayerApp.module.service = function( name, constructor ) {
						$provide.service( name, constructor );
						return( this );
					};

					// Provider-based factory.
					NewPlayerApp.module.factory = function( name, factory ) {
						$provide.factory( name, factory );
						return( this );
					};

					// Provider-based value.
					NewPlayerApp.module.value = function( name, value ) {
						$provide.value( name, value );
						return( this );
					};

					// Provider-based directive.
					NewPlayerApp.module.directive = function( name, factory ) {
						$compileProvider.directive( name, factory );
						return( this );
					};
					// NOTE: You can do the same thing with the "filter"
					// and the "$filterProvider"; but, I don't really use
					// custom filters.
				}

			return [
				'$controllerProvider',
				'$compileProvider',
				'$provide',
				NewPlayerProviderSrvc
			];
		}
	);

}());
