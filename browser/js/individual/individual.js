app.controller('IndividualCtrl', function($scope, currentMemory) {
    $scope.memory = currentMemory;

    $scope.memory.score = Math.abs($scope.memory.score);

    $scope.memory.date = currentMemory.date.slice(5, 7) + '/' + currentMemory.date.slice(8, 10) + '/' + currentMemory.date.substr(0, 4);

    $scope.setColor = function() {
    	if ($scope.memory.type === 'positive') {
    		return {color: '#32CD32'}
    	}
    	else if ($scope.memory.type === 'negative') {
    		return {color: 'red'}
    	}
    	else {
    		return {coor: 'grey'}
    	}
    }
})