'use strict';

angular.module('Authentication').controller('signinController', ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
        $scope.show_menu = false;
        $scope.show_menu1 = false;
        AuthenticationService.ClearCredentials();
        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.email, $scope.password, function (response) {
                
                if (response['0']['valid'] === "true") {
                    AuthenticationService.SetCredentials($scope.email, $scope.password, response['fname'], response['lname'], response['user_type']);
                    $scope.show_menu = true;
                    $location.path('/');
                } else {
                    $scope.error = response;
                    $scope.dataLoading = false;
                }
            });
        };

    }])