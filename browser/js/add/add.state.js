app.config(function($stateProvider) {
	$stateProvider.state('add', {
		url: '/add',
		templateUrl: 'js/add/add.html',
		controller: 'AddCtrl',
		resolve: {
			currentUser: function(AuthService) {
        		return AuthService.getLoggedInUser().then(function(user) {
        			return user
        		})
        	}
		}
	})
});