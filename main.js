var foodieApp = angular.module('foodieApp',['ngRoute']);

foodieApp.config(function ($routeProvider) {
	$routeProvider


	.when('/',{
		templateUrl: 'pages/login.html',
		controller: 'loginController'
	})
	.when('/home',{
		templateUrl: 'pages/home.html',
		controller: 'mainController'
	})
	.when('/restaurant/:id', {
		templateUrl: 'pages/restaurant.html',
		controller: 'restaurantController'
	})
})

foodieApp.controller('loginController',function($scope,$location) {
$scope.goToHome= function(){
	// console.log('Do Something')
	$location.url('home')
}
})
foodieApp.controller('restaurantController',function($scope,$routeParams,$http) {
	//Empty
	//console.log($routeParams.id);
	$scope.ingredients = [];


	$scope.getIngredients = function(url) {
	// Do something
	var data = '{"inputs":[{"data":{"image":{"url":"' + url + '"}}}]}'
	    $http({
	        'method': 'POST',
	        'url': 'https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs',
	        'headers': {
	            'Authorization': 'Key d34db9c8fbfc4fa48bc87b06a5b8e676',
	            'Content-Type': 'application/json'
	        },
	        'data': data,
	       /* success: function (response) {
	           // console.log(response.outputs[0]);
				var ingredients = response.outputs[0].data.concepts;
	            var list = '';
	            for (var i =0;i < ingredients.length;i++) {
	                list += '<div class="ingredient">' + ingredients[i].name + '</div>'
	            }
	           // $('.ingredients').html(list);
	        },
	        error: function (xhr) {
	           // console.log(xhr);
	        } */
	    }).then(function (response) {
								var ingredients = response.data.outputs[0].data.concepts;
						for (var i =0;i < ingredients.length;i++) {
						$scope.ingredients.push(ingredients[i].name);
						}
    		// $('.ingredients').html(list);
    		console.log(list);
        }, function (xhr) {
        	console.log(xhr);
        })
	}

	$scope.toDoList = function(){


		 var todoarray = angular.copy($scope.ingredients);

			$scope.todoList = [];
			for(var i = 0 ; i<todoarray.length; i++){
				$scope.todoList.push({todoText:todoarray[i], done:false});
			}

			 $scope.remove = function() {
					 var oldList = $scope.todoList;
					 $scope.todoList = [];
					 angular.forEach(oldList, function(x) {
							 if (!x.done) $scope.todoList.push(x);
					 });
			 };

			 $scope.done = function() {

					console.log("hhhh");
				//	donee=!donee;
					//$.text-decoration: overline;

			 }



	}

	$scope.restaurantId = $routeParams.id;
	var restaurants = [{
	name: 'The Oberio Cecil',
	address: '  Chaura Maidan Road, Shimla',
	location: 'Shimla',
	category: 'Casual Dining, Bar',
	vote: '4.8',
	cuisines: 'Modern Indian and Foreigners',
	cost: '2000',
	hours: 'Always Open',
 id:1,
	image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
},
{
	name: 'Dominos',
	address: 'Hadimba Road,Kullu Valley,Manali',
	location: 'Manali',
	category: 'Pizza',
	vote: '4.7',
	cuisines: 'Italian',
	cost: '1500',
	hours: '12 Noon to 12 AM (Mon-Sun)',
 id :2,
 bestDish: {
	name: 'Pizza de Francais',
	image: 'http://noblepig.com/images/2016/06/Avocado-and-Three-Bean-Salad-is-perfect-for-a-summertime-barbecue-side-dish.JPG'
           },
	image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt_2XFEpZvUI_wAMAqEnnWoVr61jAej6k4VgzwRr-yONk2Es-h'
},
{
	name: 'Buzz',
	address: 'SCO 45,46 & 47,Near Taj Hotel,Sector 17A,Chandigarh ',
	location: 'Chandigarh',
	category: 'Family Restaurant',
	vote: '4.9',
	cuisines: 'Indian',
	cost: '1000',
	hours: '8 AM to 11 PM (Mon-Sun)',
 id:3,
	image: 'http://lovethiscitytv.com/wp-content/uploads/2015/06/Top-25-New-Restaurants-in-Toronto2.jpeg'
},
{
	name: 'Dee Jay by One Earth',
	address: 'Near Post Office Dhaliara,Teh.Dehra,H.P177103',
	location: 'Dhaliara',
	category: 'Casual Dining',
	vote: '4.5',
	cuisines: 'Modern Indian ',
	cost: '2500',
	hours: '10 AM to 12 AM (Mon-Sun)',
 id :4,
	image: 'http://restaurant.business.brookes.ac.uk/images/slideshow/restaurant.jpg'
},
{
	name: 'KC Royal Park',
	address: 'City Center,Sector 3,Panchkulahkula',
	location: 'Haryana',
	category: 'Bar & Restaurant',
	vote: '4.8',
	cuisines: 'Italian',
	cost: '2200',
	hours: '11 AM to 11 PM (Mon-Sun)',
 id :5,
 bestDish: {
	name: 'lamb cheezza',
	image: 'http://noblepig.com/images/2016/06/Avocado-and-Three-Bean-Salad-is-perfect-for-a-summertime-barbecue-side-dish.JPG'
          },
	image: 'https://media.timeout.com/images/101564675/630/472/image.jpg'
}]
	$scope.restaurant = restaurants[$routeParams.id - 1];

})
//controller bnaya h....
foodieApp.controller('mainController',function($scope) {
	//what it will do.....
	$scope.restaurants = [{
	name: 'The Oberio Cecil',
	address: 'Chaura Maidan Road, Shimla',
	location: 'Shimla',
	category: 'Casual Dining, Bar',
	vote: '4.8',
	cuisines: 'Modern Indian and Foreigners',
	cost: '2000',
	hours: 'Always Open',
 id:1,
	image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
},
{
	name: 'Dominos',
	address: 'Hadimba Road,Kullu Valley,Manali',
	location: 'Manali',
	category: 'Pizza',
	vote: '4.7',
	cuisines: 'Italian',
	cost: '1500',
	hours: '12 Noon to 12 AM (Mon-Sun)',
 id :2,
	image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt_2XFEpZvUI_wAMAqEnnWoVr61jAej6k4VgzwRr-yONk2Es-h'
},
{
	name: 'Buzz',
	address: 'SCO 45,46 & 47,Near Taj Hotel,Sector 17A,Chandigarh',
	location: 'Chandigarh',
	category: 'Family Restaurant',
	vote: '4.9',
	cuisines: 'Indian',
	cost: '1000',
	hours: '8 AM to 11 PM (Mon-Sun)',
 id:3,
	image: 'http://lovethiscitytv.com/wp-content/uploads/2015/06/Top-25-New-Restaurants-in-Toronto2.jpeg'
},
{
	name: 'Dee Jay by One Earth',
	address: 'Near Post Office Dhaliara,Teh.Dehra,H.P177103',
	location: 'Dhaliara',
	category: 'Casual Dining',
	vote: '4.5',
	cuisines: 'Indian',
	cost: '2500',
	hours: '10 AM to 12 AM (Mon-Sun)',
 id :4,
	image: 'http://restaurant.business.brookes.ac.uk/images/slideshow/restaurant.jpg'
},
{
	name: 'KC Royal Park',
	address: ' City Center,Sector 3,Panchkulahkula',
	location: 'Haryana',
	category: 'Bar & Restaurant',
	vote: '4.8',
	cuisines: 'Italian',
	cost: '2200',
	hours: '11 AM to 11 PM (Mon-Sun)',
 id :5,
	image: 'https://media.timeout.com/images/101564675/630/472/image.jpg'
},
]
//3434
		$scope.ingredients = [];
		$scope.probabilityvalue=[];



})
