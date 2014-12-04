var app = angular.module("tvShowsApp", []);

app.controller("tvShowsController", function($scope, $http) {
    
	var serviceUrl = "http://da03d:15246/tvshows/";
		
	$scope.refreshData = function() {
		$scope.showForm = false;
		
		$http.get(serviceUrl)
			.success(function(response) {$scope.tvShows = response;});
	};
	
	$scope.refreshData();

	$scope.create = true;
	$scope.incomplete = false; 
	$scope._id = null;
	$scope.title = "";
	$scope.year = "";
		
	$scope.editTvShow = function(tvShow) {
	
		$scope.showForm = true;
	
		if (tvShow == "new") {
			$scope.create = true;
			$scope.incomplete = true;
			$scope._id = null;
			$scope.title = "";
			$scope.year = "";
		} else {
			$scope.create = false;
			$scope._id = tvShow._id;
			$scope.title = tvShow.title;
			$scope.year = tvShow.year; 
		}
	};

	$scope.$watch("title", function() {$scope.validate();});
	$scope.$watch("year", function() {$scope.validate();});

	$scope.validate = function() {  
		$scope.incomplete = false;
		if ($scope.title.length == 0 || $scope.year.length == 0) {
			$scope.incomplete = true;
		}
	};	
	
	$scope.saveTvShow = function() {
	
		if ($scope.create) {		
			// create		
			var tvShow = {
				title : $scope.title,
				year : $scope.year
			};
			
			$http.post(serviceUrl, tvShow)
					.success(function(response){ $scope.refreshData();
												$scope._id = null;
												$scope.title = "";
												$scope.year = "";});		
		} else {
			// update		
			var tvShow = {
				_id : $scope._id,
				title : $scope.title,
				year : $scope.year
			};
			
			$http.put(serviceUrl + $scope._id, tvShow)
					.success(function(response){ $scope.refreshData(); } );
		}
	};
	
	$scope.removeTvShow = function(tvShow) {

			if (!confirm(tvShow.title + " is about to be removed. Are you sure to proceed?")) {
				return;
			}
			
			$http.delete(serviceUrl + tvShow._id)
					.success(function(response){ $scope.refreshData(); } );
	}
});