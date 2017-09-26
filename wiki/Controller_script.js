// Define a new module for our app
var app = angular.module("instantSearch", []);

app.controller('InstantSearchController', ['$scope', function($scope) {

  $scope.search = function search() {
  	//console.log($scope.search_item);

  	var search_item=$scope.search_item;
  	
	var flickerAPI ="https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search="+search_item;
  return $.getJSON( flickerAPI, {
    tags: "mount rainier",
    tagmode: "any",
    format: "json"
  })
            .success(function(data) { 
            	var new_data={
    	data1:[]
    	
    };
    //console.log($scope.search_item);
        for(var i=1;i<=10;i++)
        {
        	
    	new_data.data1.push({
	    	"name":data[1][i],
	    	"subject":data[2][i],
	    	"url":data[3][i],

	    });
    }
    $scope.wiki_data = new_data;
    //console.log(new_data.data1);
             // return data; 
            }) 
            .error(function(err) { 
              return err; 
            }); 
}
}]);



// Create the instant search filter

app.filter('searchFor', function(){

	// All filters must return a function. The first parameter
	// is the data that is to be filtered, and the second is an
	// argument that may be passed with a colon (searchFor:searchString)

	return function(arr, searchString){

		if(!searchString){
			return arr;
		}

		var result = [];

		searchString = searchString.toLowerCase();

		// Using the forEach helper method to loop through the array
		angular.forEach(arr, function(item){

			if(item.title.toLowerCase().indexOf(searchString) !== -1){
				result.push(item);
			}

		});

		return result;
	};

});

