angular.module('Authentication')

        .factory('capstoneService', function ($http) {
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

                            var predata = '{"user" :' + data + '}';
                            alert(predata);


                        }
            };
        })

        .directive("passwordVerify", function () {
            return {
                require: "ngModel",
                scope: {
                    passwordVerify: '='
                },
                link: function (scope, element, attrs, ctrl) {
                    scope.$watch(function () {
                        var combined;

                        if (scope.passwordVerify || ctrl.$viewValue) {
                            combined = scope.passwordVerify + '_' + ctrl.$viewValue;
                        }
                        return combined;
                    }, function (value) {
                        if (value) {
                            ctrl.$parsers.unshift(function (viewValue) {
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
        })

        .controller('registerController',
                function ($scope, capstoneService, $route, $routeParams, $location, $http) {
                    $scope.submit = function () {
                        capstoneService.doRegistration($scope.registration, $scope.profile, $location);

                    };
                });