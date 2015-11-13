app.config(function ($stateProvider) {
    $stateProvider.state('timeline', {
        url: '/timeline',
        templateUrl: 'js/timeline/timeline.html',
        controller: 'TimelineCtrl',
        resolve: {
        	currentTimeline: function(AuthService, MemoryFactory) {
        		return AuthService.getLoggedInUser().then(function(user) {
        			return user
        		})
        		.then(function(user) {
        			return MemoryFactory.getByUser(user._id)
        		})
        		.then(function(data) {
        			return data;
        		})
        	},
        	userPhoto: function(AuthService) {
        		return AuthService.getLoggedInUser()
        		.then(function(user) {
        			return user.photo
        		})
        	}
        }

    });
});