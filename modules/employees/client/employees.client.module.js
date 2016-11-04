(function (app){
	'use strict';

	// Use Applicaion configuration module to register a new module
	app.registerModule('employees', ['ui.bootstrap','oitozero.ngSweetAlert','angularUtils.directives.dirPagination']);
}(ApplicationConfiguration));
