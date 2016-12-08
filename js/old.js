//Angular Module
angular.module('Authentication', []);

var app = angular.module('capstoneApp', []);

angular.module('capstoneApp',['Authentication','Home','ngRoute','ngCookies'])

//angular.module('bimpiesApp').config(function ($routeProvider) {
.config(['$routeProvider', function ($routeProvider) {
    // configure the routes
    $routeProvider
    .when('/login', {
        // route for the home page
        templateUrl: 'pages/signin.html',
        //        templateUrl: 'pages/register.html',
        controller: 'js/signinController'
        //        controller: 'registerController'
    })
    .when('/profile', {
        // route for the profile page
        templateUrl: 'pages/profile.html',
        controller: 'profileController'
    })
    .when('/register', {
        // route for the profile page
        templateUrl: 'pages/register.html',
        controller: 'registerController'
    })
    .when('/forgetpassword', {
        // route for the forgetpassword page
        templateUrl: 'pages/forgetpassword.html',
        controller: 'forgetPasswordController'
    })
    .when('/thankyou', {
        // route for the forgetpassword page
        templateUrl: 'pages/thankyou.html',
        controller: 'thankyouController'
    })

    .otherwise({ redirectTo: '/login' });
    //.otherwise({
    // when all else fails
    //        templateUrl: 'pages/routeNotFound.html',
    //        controller: 'notFoundController'
    //    });
}])

.run(['$rootScope', '$location', '$cookieStore', '$http',
function ($rootScope, $location, $cookieStore, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in
        if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
            $location.path('/login');
        }
    });
}]);

angular.module('capstoneApp').controller('forgetPasswordController', function ($scope) {
    $scope.message = 'Welcome to my home page!';
});

angular.module('capstoneApp').controller('thankyouController', function ($scope) {
    $scope.message = 'Welcome to my home page!';
});

angular.module('capstoneApp').controller('profileController', function ($scope) {
    $scope.message = 'Welcome to my home page!';
});

angular.module('capstoneApp').factory('bimpieService',function ($http) {
    return {
        //checkLogin:
        //        function (data) {
        //            data = JSON.stringify(data);
        //            alert(data);
        //            $http.post("ajax/controller.php", data).success(function(data, status, headers, config){
        //                alert(data);
        //            });
        //        },

        doRegistration:
        function (data, profiledata, $location) {
            data = JSON.stringify(data);

            var predata = '{"user" :'+data+'}';
            alert(predata);


        }
    };
});



angular.module('bimpiesApp').directive("passwordVerify", function() {
    return {
        require: "ngModel",
        scope: {
            passwordVerify: '='
        },
        link: function(scope, element, attrs, ctrl) {
            scope.$watch(function() {
                var combined;

                if (scope.passwordVerify || ctrl.$viewValue) {
                    combined = scope.passwordVerify + '_' + ctrl.$viewValue; 
                }                    
                return combined;
            }, function(value) {
                if (value) {
                    ctrl.$parsers.unshift(function(viewValue) {
                        var origin = scope.passwordVerify;
                        if (origin !== viewValue) {
                            ctrl.$setValidity("passwordVerify", false);
                            return undefined;
                        } else {
                            ctrl.$setValidity("passwordVerify", true);
                            return viewValue;
                        }
                    });
                }
            });
        }
    };
});

angular.module('bimpiesApp').controller('registerController',
function ($scope, bimpieService, $route, $routeParams, $location, $http) {
    $scope.submit = function(){
        bimpieService.doRegistration($scope.registration, $scope.profile, $location);

    };    
});

