app.config(function($stateProvider) {
	$stateProvider.state('add', {
		url: '/add',
		templateUrl: 'js/add/add.html',
		controller: 'AddCtrl'
	})
});