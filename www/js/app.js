(function(){
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('reddit', ['ionic']);

app.controller('redditCtrl', function($http, $scope){
  $http.get('https://www.reddit.com/.json')
  .success(function(res){
      console.log(res.data.children);
      $scope.reddits = [];
      angular.forEach(res.data.children, function(child){
          $scope.reddits.push(child.data);
      });
  }).error(function(err){

  });
});

app.controller('detailsCtrl', function($scope, $state){
  var url = $state.params.url;
  $scope.url = url;
});

app.config(function($stateProvider, $urlRouterProvider){
    $stateProvider.state('list',  {
      url:'/list', 
      templateUrl:'templates/list.html'
    });

    $stateProvider.state('details',  {
    url:'/details/:url', 
    templateUrl:'templates/details.html'
  });

  $urlRouterProvider.otherwise('/list');
});






app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
}());