/*global define*/
'use strict';

/**
 * The initialization controller for the app.
 */

(function(){

	define(
		function ()
		{
			var NewPlayerConfigService = function( )
			{
				/****************************
				 * New Player globals
						- score object
							- page / point requirements
							- interactions?
						- configurations
				 ****************************/

				// Score
				this.score = {};

				// manifestId
				this.manifestId = '';

				// default locality
				this.locality = '';

				// holds id of current page being viewed
				this.pageId = '';

				// holds current page modules
				this.page = new Array();

				// holds loaded "modules" by name
				this.module = {};

				// URL prefix and suffix for the manifest
				this.manifestURLPrefix = '';
				this.manifestURLSuffix = '.json';

				// manifest data
				this.manifest = null;
			}

			return [ NewPlayerConfigService ];
		}
	);

}());
