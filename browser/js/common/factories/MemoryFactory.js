app.factory('MemoryFactory', function($http) {
	return {
		getByUser: function(id) {
			return $http.get('/api/users/'+id).then(function(res) {
				return res.data;
			})
		}
	}
})