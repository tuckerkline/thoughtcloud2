angular.module('thoughtApp', ['ngRoute'])

angular.module('thoughtApp')
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/', {
	            templateUrl : '/html/home.html',
	            controller  : 'mainController'
	            })
			.when('/thoughts', {
				templateUrl : '/html/thoughts.html',
				controller  : 'thoughtsController'
				})


	            	}])

angular.module('thoughtApp')
	.controller('mainController', ['$scope', '$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location) {

		var lat, lng
		var locURL = {url : ''}

    $scope.showPosition= function(loc){
    	lat = loc.coords.latitude.toString()
    	lng = loc.coords.longitude.toString()
    	locURL.url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&key=AIzaSyCUwxKvlHSXxTblHybE0O0KtodRFFm6UGg"
    	$http.post('/getCity', locURL)
    		.then(function(returnData){
    			console.log(returnData)
    		})
    }

		$scope.getLocation = function() {
			console.log("page loaded")
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition($scope.showPosition)
	    } else { 
	        console.log("location services not enabled")
	    }
	  }

	  window.onLoad = $scope.getLocation()

	  $scope.submitThought = function() {
			console.log('hi')
			$http.post('/thoughtAdd', $scope.newThought)
                .then(function(returnData){
                    console.log(returnData)
                })

		}
		
}])

	angular.module('thoughtApp')
	.controller('thoughtsController', ['$scope', '$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location) {

		$http({
            method : 'GET',
            url    : '/allthoughts',
        }).then(function(returnData) {
            console.log(returnData.data)
            $scope.thoughts = returnData.data
        })

        console.log($scope.thoughts)


        $scope.addComment = function(thought) {

        	thought.comments.push(thought.addedComment)
        	$http({
                method : 'POST',
                url    : '/commentadd',
                data   : thought
            }).then(function(returnData) {
                // no need for anything here
            })
        	console.log(thought.thought)

        	thought.addedComment = ""
        }


}])