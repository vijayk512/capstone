//Angular Module
angular.module('Authentication', []);
angular.module('Registration', []);

var app = angular.module('capstoneApp', ['Authentication', 'Registration', 'ngRoute', 'ngCookies']);
app.config(['$routeProvider',
    function ($routeProvider) {

        $routeProvider.when('/login', {
            templateUrl: 'pages/signin.html',
            controller: 'signinController',
            hideMenus: true
        }).when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        }).when('/crmuser', {
            // route for the profile page
            templateUrl: 'pages/crmuser.html',
            controller: 'crmuserController'
        }).when('/customerList', {
            // route for the profile page
            templateUrl: 'pages/customerList.html',
            controller: 'customerListController'
        }).when('/itemList', {
            // route for the profile page
            templateUrl: 'pages/itemList.html',
            controller: 'itemListController'
        }).when('/services', {
            // route for the profile page
            templateUrl: 'pages/services.html',
            controller: 'servicesController'
        }).when('/addCRMuser/:UID/:Utype', {
            // route for the profile page
            templateUrl: 'pages/include/addCRMuser.html',
            controller: 'addcrmuserController'
        }).when('/addCRMuser/:Utype', {
            // route for the profile page
            templateUrl: 'pages/include/addCRMuser.html',
            controller: 'addcrmuserController'
        }).when('/addCustomer/:UID/:Utype', {
            // route for the profile page
            templateUrl: 'pages/include/addCustomer.html',
            controller: 'addCustomerController'
        }).when('/addCustomer/:Utype', {
            // route for the profile page
            templateUrl: 'pages/include/addCustomer.html',
            controller: 'addCustomerController'
        }).when('/additemlist/:UID/:Utype', {
            // route for the profile page
            templateUrl: 'pages/include/additemlist.html',
            controller: 'itemListController'
        }).when('/additemlist/:Utype', {
            // route for the profile page
            templateUrl: 'pages/include/additemlist.html',
            controller: 'itemListController'
        }).when('/addservices/:UID/:Utype', {
            // route for the profile page
            templateUrl: 'pages/include/addservices.html',
            controller: 'servicesController'
        }).when('/addservices/:Utype', {
            // route for the profile page
            templateUrl: 'pages/include/addservices.html',
            controller: 'servicesController'
        }).when('/viewcustomerdetail/:UID/:Utype', {
            // route for the profile page
            templateUrl: 'pages/include/viewcustomerdetail.html',
            controller: 'viewCustomerServicesController'
        }).otherwise({
            redirectTo: '/login'
        });

    }]).run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        //    alert($cookieStore.get('globals'));
        $rootScope.globals = $cookieStore.get('globals') || {};
//	    alert($rootScope.globals.currentUser);
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;



        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {

                $location.path('/login');
            }
        });
    }]);

angular.module('Authentication').controller('headerController', ['$scope', '$rootScope', '$location', '$cookieStore', '$http',
    function ($scope, $rootScope, $location, $cookieStore, $http) {
        $rootScope.globals = $cookieStore.get('globals') || {};


        if (!$rootScope.globals.currentUser) {
            $scope.show_menu = false;
            $scope.show_menu1 = false;
            $scope.userlogin = false;
        } else {
            $scope.show_menu = true;
            $scope.show_menu1 = true;
            $scope.userlogin = true;
            $scope.useremail = $rootScope.globals.currentUser.fname + " " + $rootScope.globals.currentUser.lname;
        }

        if ($rootScope.globals.currentUser) {

            if ($rootScope.globals.currentUser.usertype === "admin") {
                $scope.CRMUSer = true;

            } else if ($rootScope.globals.currentUser.usertype === "marketing") {
                $scope.CRMUSer = false;
            } else {
                $scope.CRMUSer = false;
            }
        }


    }]);

angular.module('capstoneApp').controller('homeController', function ($scope, $http, $rootScope) {
    $scope.message = 'Welcome to my home page!';

    $http.post('ajax/crmuser.php', {action: "homepage"})
            .success(function (data) {
                $scope.homecrmuserget = data;
            });

    $http.post('ajax/customer.php', {action: "homeget"})
            .success(function (data) {
                if (data === '0') {
                    $scope.noerror = true;
                    $scope.errormessage = "No record founds";
                } else {
                    $scope.noerrorr = false;
                    $scope.homeuserget = data;
                }
            });

    $http.post('ajax/itemlist.php', {action: "getlist"})
            .success(function (data) {
                if (data === '0') {
                    $scope.noerror = true;
                    $scope.errormessagee = "No record founds";
                } else {
                    $scope.noerror = false;
                    $scope.itemlistget = data;
                }
            });

   if ($rootScope.globals.currentUser.usertype === "admin") {
       
        $scope.CRMUSer = true;
        $scope.addcustomer = true;
        $scope.itemlist = true;
        $scope.service = true;
        $scope.itemhide= true;
    } else if ($rootScope.globals.currentUser.usertype === "marketing") {
        $scope.CRMUSer = false;
        $scope.addcustomer = true;
        $scope.itemlist = true;
        $scope.service = false;
        $scope.itemhide= false;
    } else {
        $scope.CRMUSer = false;
        $scope.addcustomer = false;
        $scope.itemlist = false;
        $scope.service = true;
        $scope.itemhide= false;
    }
});

angular.module('capstoneApp').controller('customerListController', function ($scope, $http, $route, $rootScope) {

    $http.post('ajax/customer.php', {action: "customerget"})
            .success(function (data) {
                if (data === '0') {
                    $scope.noerror = true;
                    $scope.errormessage = "No record founds";
                } else {
                    $scope.noerror = false;
                    $scope.customerget = data;
                }
            });

    $scope.deletecustomer = function (id) {
        $http.post('ajax/customer.php', {action: "delete", id: id})
                .success(function (data) {
                    alert(data);
                    $route.reload();
                });
    };

    if ($rootScope.globals.currentUser.usertype === "admin") {
        $scope.CRMUSer = true;
        $scope.addcustomer = true;
        $scope.itemlist = true;
        $scope.service = true;
    } else if ($rootScope.globals.currentUser.usertype === "marketing") {
        $scope.CRMUSer = false;
        $scope.addcustomer = true;
        $scope.itemlist = true;
        $scope.service = false;
    } else {
        $scope.CRMUSer = false;
        $scope.addcustomer = false;
        $scope.itemlist = false;
        $scope.service = true;
    }

});

angular.module('capstoneApp').controller('itemListController', function ($scope, addData, $http, $route, $routeParams, $location, $rootScope) {

    var utype = $routeParams.Utype;

    if (utype === "new") {
        $scope.buttontype = "Add New Item";
        $scope.add_user = false;
        $scope.submitForm = function () {
            addData.addDataitemlist($scope.getuserdata, $scope, $location);
        };
    } else if (utype === "edit") {
        $scope.buttontype = "Update Item";
        $scope.add_user = true;
        $http.post('ajax/itemlist.php', {action: "edit", uid: $routeParams.UID})
                .success(function (data) {
                    angular.forEach(data, function (value) {
                        $scope.getuserdata = value;
                    });
                });
        $scope.submitForm = function () {
            addData.editDataitemlist($scope.getuserdata, $scope, $location);
        };

    } else {
        $http.post('ajax/itemlist.php', {action: "getlist"})
                .success(function (data) {
                    if (data === '0') {
                        $scope.noerror = true;
                        $scope.errormessage = "No record founds";
                    } else {
                        $scope.noerror = false;
                        $scope.itemlistget = data;
                    }
                });
    }

    $scope.deleteitemlist = function (id) {
        $http.post('ajax/itemlist.php', {action: "delete", id: id})
                .success(function (data) {
                    alert(data);
                    $route.reload();
                });
    };

    if ($rootScope.globals.currentUser.usertype === "admin") {
        $scope.CRMUSer = true;
        $scope.addcustomer = true;
        $scope.itemlist = true;
        $scope.service = true;
        $scope.itemhide= true;
    } else if ($rootScope.globals.currentUser.usertype === "marketing") {
        $scope.CRMUSer = false;
        $scope.addcustomer = true;
        $scope.itemlist = true;
        $scope.service = false;
        $scope.itemhide= true;
    } else {
        
        $scope.CRMUSer = false;
        $scope.addcustomer = false;
        $scope.itemlist = false;
        $scope.itemhide = false;
        $scope.service = true;
    }

});
angular.module('capstoneApp').controller('servicesController', function ($scope, addData, $http, $route, $routeParams, $location, $rootScope) {
    var utype = $routeParams.Utype;
    if (utype === "new") {
        $scope.buttontype = "Add Services";
        $http.post('ajax/services.php', {action: "clist", uid: $routeParams.UID})
                .success(function (data) {
                    $scope.customerlist = data;
                });
        $scope.submitForm = function () {
            addData.addDatanewservices($scope.getuserdata, $scope, $location, $rootScope);
        };
    } else if (utype === "edit") {
        $scope.buttontype = "Update Services";
        $http.post('ajax/services.php', {action: "clist", uid: $routeParams.UID})
                .success(function (data) {
                    $scope.customerlist = data;
                });
        $http.post('ajax/services.php', {action: "updateservices", uid: $routeParams.UID})
                .success(function (data) {
                    angular.forEach(data, function (value) {
                        $scope.getuserdata = value;
                    });
                });
        $scope.submitForm = function () {
            addData.editDataservices($scope.getuserdata, $scope, $location, $rootScope);
        };

    } else {
        $http.post('ajax/services.php', {action: "getservices"})
                .success(function (data) {
                    if (data === '0') {
                        $scope.noerror = true;
                        $scope.errormessage = "No record founds";
                    } else {
                        $scope.noerror = false;
                        $scope.servicesget = data;
                    }
                });
    }
    $scope.deleteservices = function (id) {
        $http.post('ajax/services.php', {action: "delete", id: id})
                .success(function (data) {
                    alert(data);
                    $route.reload();
                });
    };

    if ($rootScope.globals.currentUser.usertype === "admin") {
        $scope.CRMUSer = true;
        $scope.addcustomer = true;
        $scope.itemlist = true;
        $scope.service = true;
    } else if ($rootScope.globals.currentUser.usertype === "marketing") {
        $scope.CRMUSer = false;
        $scope.addcustomer = true;
        $scope.itemlist = true;
        $scope.service = false;
    } else {
        $scope.CRMUSer = false;
        $scope.addcustomer = false;
        $scope.itemlist = false;
        $scope.service = true;
    }

});

app.controller('crmuserController', function ($scope, $http, $route, $rootScope) {

    $http.post('ajax/crmuser.php', {action: "get"})
            .success(function (data) {
                $scope.crmuserget = data;
            });

    $scope.deletecrmuser = function (id) {
        $http.post('ajax/crmuser.php', {action: "delete", id: id})
                .success(function (data) {
                    alert(data);
                    $route.reload();
                });
    };
    if ($rootScope.globals.currentUser.usertype === "admin") {
        $scope.CRMUSer = true;
        $scope.addcustomer = true;
        $scope.itemlist = true;
        $scope.service = true;
    } else if ($rootScope.globals.currentUser.usertype === "marketing") {
        $scope.CRMUSer = false;
        $scope.addcustomer = true;
        $scope.itemlist = true;
        $scope.service = false;
    } else {
        $scope.CRMUSer = false;
        $scope.addcustomer = false;
        $scope.itemlist = false;
        $scope.service = true;
    }
});

app.controller('addcrmuserController', function ($scope, addData, $route, $routeParams, $location, $http, $rootScope) {
    $scope.message = 'Welcome to my home page!';

    var utype = $routeParams.Utype;
    if (utype === 'edit') {
        $scope.add_user = true;
        $http.post('ajax/crmuser.php', {action: "edit", uid: $routeParams.UID})
                .success(function (data) {
                    angular.forEach(data, function (value) {
                        $scope.getuserdata = value;
                    });
                });

        $scope.submitForm = function () {
            addData.editDataCrmUser($scope.getuserdata, $scope, $location);
        };

    } else {
        $scope.add_user = false;
        $scope.submitForm = function () {
            addData.addDataCrmUser($scope.getuserdata, $scope, $location);
        };
    }
    if ($rootScope.globals.currentUser.usertype === "admin") {
        $scope.CRMUSer = true;
        $scope.addcustomer = true;
        $scope.itemlist = true;
        $scope.service = true;
    } else if ($rootScope.globals.currentUser.usertype === "marketing") {
        $scope.CRMUSer = false;
        $scope.addcustomer = true;
        $scope.itemlist = true;
        $scope.service = false;
    } else {
        $scope.CRMUSer = false;
        $scope.addcustomer = false;
        $scope.itemlist = false;
        $scope.service = true;
    }


});

app.controller('addCustomerController', function ($http, addData, $scope, $routeParams, $location, $rootScope) {
    var utype = $routeParams.Utype;
    if (utype === 'edit') {
        $scope.buttontype = "Update Customer";
        $scope.add_user = true;
        $http.post('ajax/customer.php', {action: "edit", uid: $routeParams.UID})
                .success(function (data) {
                    angular.forEach(data, function (value) {
                        $scope.getuserdata = value;
                    });
                });

        $scope.submitForm = function () {

            addData.editDataCustomer($scope.getuserdata, $scope, $location);

        };
    } else {
        $scope.buttontype = "Add Customer";
        $scope.add_user = false;
        $scope.submitForm = function () {
            addData.addDataCustomer($scope.getuserdata, $scope, $location);
        };
    }
    if ($rootScope.globals.currentUser.usertype === "admin") {
        $scope.CRMUSer = true;
        $scope.addcustomer = true;
        $scope.itemlist = true;
        $scope.service = true;
    } else if ($rootScope.globals.currentUser.usertype === "marketing") {
        $scope.CRMUSer = false;
        $scope.addcustomer = true;
        $scope.itemlist = true;
        $scope.service = false;
    } else {
        $scope.CRMUSer = false;
        $scope.addcustomer = false;
        $scope.itemlist = false;
        $scope.service = true;
    }
});

app.controller('viewCustomerServicesController', function ($http, $scope, $routeParams, $rootScope) {
    $scope.add_user = true;
    $http.post('ajax/customer.php', {action: "edit", uid: $routeParams.UID})
            .success(function (data) {
                angular.forEach(data, function (value) {
                    $scope.getuserdata = value;
                });
            });
    $http.post('ajax/services.php', {action: "getservicedetails", uid: $routeParams.UID})
            .success(function (data) {
//                angular.forEach(data, function (value) {
                $scope.getcustomerservicedetails = data;
//                });
            });

    if ($rootScope.globals.currentUser.usertype === "admin") {
        $scope.CRMUSer = true;
        $scope.addcustomer = true;
        $scope.itemlist = true;
        $scope.service = true;
    } else if ($rootScope.globals.currentUser.usertype === "marketing") {
        $scope.CRMUSer = false;
        $scope.addcustomer = true;
        $scope.itemlist = true;
        $scope.service = false;
    } else {
        $scope.CRMUSer = false;
        $scope.addcustomer = false;
        $scope.itemlist = false;
        $scope.service = true;
    }
});

app.factory('addData', function ($http) {
    return {

        addDataCrmUser:
                function (data, $scope, $location) {
                    data['action'] = 'addCrmUser';
                    data = JSON.stringify(data);
                    $http.post("ajax/crmuser.php", data)
                            .success(function (response) {
                                $scope.message = response;
                                alert(response);
                                $location.path('/crmuser');

                            }).error(function () {
                        $scope.message = "Invalid data please check carefuly";
                    });
                },
        editDataCrmUser:
                function (data, $scope, $location) {
                    data['action'] = 'editCrmUser';
                    data = JSON.stringify(data);
                    $http.post("ajax/crmuser.php", data)
                            .success(function (response) {
                                $scope.message = response;
                                alert(response);
                                $location.path('/crmuser');

                            }).error(function () {
                        $scope.message = "Invalid data please check carefuly";
                    });
                },
        addDataCustomer:
                function (data, $scope, $location) {
                    data['action'] = 'addcustomer';
                    data = JSON.stringify(data);
                    $http.post("ajax/customer.php", data)
                            .success(function (response) {
                                $scope.message = response;
                                alert(response);
                                $location.path('/customerList');

                            }).error(function () {
                        $scope.message = "Invalid data please check carefuly";
                    });
                },
        editDataCustomer:
                function (data, $scope, $location) {

                    data['action'] = 'editcustomer';

                    data = JSON.stringify(data);
                    $http.post("ajax/customer.php", data)
                            .success(function (response) {
                                $scope.message = response;
                                alert(response);
                                $location.path('/customerList');

                            }).error(function () {
                        $scope.message = "Invalid data please check carefuly";
                    });
                },
        addDataitemlist:
                function (data, $scope, $location) {

                    data['action'] = 'addItem';

                    data = JSON.stringify(data);
                    $http.post("ajax/itemlist.php", data)
                            .success(function (response) {
                                $scope.message = response;
                                alert(response);
                                $location.path('/itemList');

                            }).error(function () {
                        $scope.message = "Invalid data please check carefuly";
                    });
                },
        editDataitemlist:
                function (data, $scope, $location) {

                    data['action'] = 'editItem';

                    data = JSON.stringify(data);
                    $http.post("ajax/itemlist.php", data)
                            .success(function (response) {
                                $scope.message = response;
                                alert(response);
                                $location.path('/itemList');

                            }).error(function () {
                        $scope.message = "Invalid data please check carefuly";
                    });
                },
        addDatanewservices:
                function (data, $scope, $location, $rootScope) {

                    data['action'] = 'addservices';
                    data['userlogin'] = $rootScope.globals.currentUser.email;
                    data = JSON.stringify(data);
                    $http.post("ajax/services.php", data)
                            .success(function (response) {
                                $scope.message = response;
                                alert(response);
                                $location.path('/services');

                            }).error(function () {
                        $scope.message = "Invalid data please check carefuly";
                    });
                },
        editDataservices:
                function (data, $scope, $location, $rootScope) {

                    data['action'] = 'editservices';
                    data['userlogin'] = $rootScope.globals.currentUser.email;

                    data = JSON.stringify(data);
                    $http.post("ajax/services.php", data)
                            .success(function (response) {
                                $scope.message = response;
                                alert(response);
                                $location.path('/services');

                            }).error(function () {
                        $scope.message = "Invalid data please check carefuly";
                    });
                }

    };
});