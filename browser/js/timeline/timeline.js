app.controller('TimelineCtrl', function($scope, currentTimeline, userPhoto) {

	$scope.photo = userPhoto

	var data = currentTimeline[0].memories.sort(function(a, b) {
		return a.date > b.date;
	})

	data.forEach(function(i) {
		var date = i.date.toString()
		var newDate = date.slice(5, 7) + '/' + date.slice(8, 10) + '/' + date.substr(0, 4)
		i.date = newDate;
	})

	$scope.memories = data;
})