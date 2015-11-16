app.config(function ($stateProvider) {
    $stateProvider.state('individual', {
        url: '/individual/:id',
        templateUrl: 'js/individual/individual.html',
        controller: 'IndividualCtrl',
        resolve: {
        	currentMemory: function(MemoryFactory, $stateParams) {
                return MemoryFactory.getOneMemory($stateParams.id)
                    .then(function(data) {
                        console.log(data)
                        return data;
                    })
            }
        }

    });
});