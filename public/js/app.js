/**
 * angular/app.js
 * Created by HWhewell on 07/12/2015.
 */
(function(){
    angular
        .module('app', [
            'app.controllers',
            'app.services',
            'app.factories',
            'app.directives',
            'app.config',
            'ngRoute',
            'ui.bootstrap'
        ]);

    angular.module('app.controllers', []);
    angular.module('app.services', []);
    angular.module('app.factories', []);
    angular.module('app.directives', []);
    angular.module('app.config', ['ngRoute']);
}());
/**
 * angular/MainController.js
 * Created by HWhewell on 21/01/2016.
 */
(function(){

    angular
        .module('app.controllers')
        .controller('MainController', MainController);

    MainController.$inject = ['AuthService'];

    function MainController(AuthService){
        vm = this;

        vm.logout = function(){
            AuthService.logout && AuthService.logout()
        };

        vm.isAuthed = function () {
            return AuthService.isAuthed ? AuthService.isAuthed() : false
        };

        vm.isAdmin = function() {
            return AuthService.isAdmin ? AuthService.isAdmin() : false
        };
    }
}());
/**
 * angular/routes.js
 * Created by HWhewell on 07/12/2015.
 */
(function(){

    angular
        .module('app.config')
        .config(Route)
        .run(RouteInterceptor);

    RouteInterceptor.$inject = ['$rootScope', '$location', 'AuthService'];

    function Route($routeProvider, $locationProvider){

        $routeProvider
            .when('/', {
                templateUrl: 'public/views/home/home.html',
                controller: 'HomeController as vm'
            })
            .when('/login',{
                templateUrl: 'public/views/login/login.html',
                controller: 'LoginController as vm'
            })
            .when('/weapons',{
                templateUrl: 'public/views/weapons/weapon.html',
                controller: 'WeaponController as vm'
            })
            .when('/weapons/:ref',{
                templateUrl: 'public/views/weaponItem/weaponItem.html',
                controller: 'WeaponItemController as vm'
            })

            .when('/apparel',{
                templateUrl: 'public/views/apparel/apparel.html',
                controller: 'ApparelController as vm'
            })

            .when('/apparel/:ref',{
                templateUrl: 'public/views/apparelItem/apparelItem.html',
                controller: 'ApparelItemController as vm'
            })

            .when('/spells',{
                templateUrl: 'public/views/spells/spell.html',
                controller: 'SpellController as vm'
            })

            .when('/spells/:ref',{
                templateUrl: 'public/views/spellItem/spellItem.html',
                controller: 'SpellItemController as vm'
            })

            .when('/admin',{
                templateUrl: 'public/views/admin/admin.html',
                controller: 'AdminController as vm',
                requiresAdmin: true
            })

            .when('/order',{
                templateUrl: 'public/views/order/order.html',
                controller: 'OrderController as vm',
                requiresLogin: true
            })



    }

    function RouteInterceptor($rootScope, $location, AuthService){
        $rootScope.$on('$routeChangeStart', function(event, next){
            var authenticated = AuthService.isAuthed();
            var admin = AuthService.isAdmin();
            if(next.requiresLogin){
                if(!authenticated){
                    event.preventDefault();
                    $location.path('/');
                }
            }

            if(next.requiresAdmin){
                if(!admin){
                    event.preventDefault();
                    $location.path('/');
                }
            }


        })
    }
}());
/**
 * angular/config/authConfig.js
 * Created by HWhewell on 20/01/2016.
 */
(function(){
    angular
        .module('app.config')
        .config(authConfig);


    function authConfig($httpProvider){
        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};

        $httpProvider.interceptors.push('authInterceptor');
    }
}());
/**
 * angular/directives/reviewSection.js
 * Created by HWhewell on 22/01/2016.
 */
(function(){

    angular
        .module('app.directives')
        .directive('reviewSection', ReviewSection);

    function ReviewSection(){
        return {
            restrict: 'E',
            controller: 'ReviewController as review',
            bindToController: true,
            templateUrl: 'public/views/review/review-section.html'
        };
    }
}());
/**
 * angular/factories/authInterceptors.js
 * Created by HWhewell on 20/01/2016.
 */
(function(){
    angular
        .module('app.factories')
        .factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = [ 'AuthService', '$location'];

    function authInterceptor(AuthService, $location){
        return {
            // automatically attach Authorization header
            request: function(config) {

                var token = AuthService.getToken();
                if(config.url.indexOf('http://localhost:8080/api') === 0 && token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }

                return config;
            },

            // If a token was sent back, save it
            response: function(res) {

                if(res.config.url.indexOf('http://localhost:8080/api') === 0 && res.data.token) {
                    AuthService.saveToken(res.data.token);
                }
                return res;
            },

            responseError: function(rejection){
                if(rejection.status === 401 || rejection.status === 403){
                    console.log('Response Error 401', rejection);
                    $location.path('#/');
                }
                return rejection;
            }
        }
    }
}());
/**
 * angular/services/ApparelService.js
 * Created by HWhewell on 15/12/2015.
 */
(function(){

    angular
        .module('app.services')
        .service('ApparelService', ApparelService);

    ApparelService.$inject = ['CrudService'];

    function ApparelService(CrudService){
        var apparelService = {};

        // get all apparel
        apparelService.getAllApparel = function(success, error){
            return CrudService.getRequest('http://localhost:8080/api/apparel/', success, error);
        };

        // create apparel
        apparelService.createApparel = function(data, success, error){
            return CrudService.postRequest('http://localhost:8080/api/apparel/', data, success, error);
        };

        // get apparel by id
        apparelService.getApparelById = function(id, success, error){
            return CrudService.getRequest('http://localhost:8080/api/apparel/' + id, success, error);
        };

        // get apparel by ref
        apparelService.getApparelByRef = function(ref, success, error){
            return CrudService.getRequest('http://localhost:8080/api/apparel/ref/' + ref, success, error);
        };

        // update apparel by id
        apparelService.updateApparelById = function(id, data, success, error){
            return CrudService.putRequest('http://localhost:8080/api/apparel/' + id, data, success, error);
        };

        // delete apparel by id
        apparelService.deleteApparelById = function(id, success, error){
            return CrudService.deleteRequest('http://localhost:8080/api/apparel/' + id, success, error);
        };

        return apparelService;
    }
}());
/**
 * angular/services/AuthService.js
 * Created by HWhewell on 20/01/2016.
 */
(function(){

    angular
        .module('app.services')
        .service('AuthService', authService);

    authService.$inject = ['$window','$location'];

    function authService($window, $location){
        var vm = this;

        // decode jwt
        vm.parseJwt = function(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse($window.atob(base64));
        };

        // save token to local storage
        vm.saveToken = function(token) {
            $window.localStorage['jwtToken'] = token;
        };

        // retrieve token from localStorage
        vm.getToken = function() {
            return $window.localStorage['jwtToken'];
        };

        // check if the user is authenticated
        vm.isAuthed = function() {
            var token = vm.getToken();
            if(token) {
                var params = vm.parseJwt(token);

                //Unix Time is in seconds while JavaScript Date.now()
                // returns milliseconds, so a conversion is necessary
                return Math.round(new Date().getTime() / 1000) <= params.exp;
            } else {
                return false;
            }
        };

        // check if the user is an admin
        vm.isAdmin = function() {
            var token = vm.getToken();
            if(token){
                var params = vm.parseJwt(token);
                var role = params.role;

                return role == 'admin';

            } else {
                return false;
            }
        };

        vm.getTokenName = function(){
          var token = vm.getToken();
          if(token){
              var params = vm.parseJwt(token);
              return params.name;
          }
        };

        // logs out user
        vm.logout = function() {
            $window.localStorage.removeItem('jwtToken');
            $location.path('/');
        }
    }
}());
/**
 * angular/services/CrudService.js
 * Created by HWhewell on 11/12/2015.
 */
(function() {
    'use strict';

    angular
        .module('app.services')
        .service('CrudService', CrudService);

    function CrudService ($http) {
        var crudService = {};

        var error = function (error) {
            // Error with the request and you have not passed a callback of error
        };

        crudService.getRequest = function (url, success, error) {
            return $http({method: 'GET', url: url}).
                then(function successCallback(data, status) {
                    success(data, status);
                    return data;
                },
                function errorCallBack(data, status) {
                    error(data, status);
                    return data;
                });
        };

        crudService.postRequest = function (url, data, success, error) {
            return $http({method: 'POST',
                url: url,
                headers:{'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var ref in obj)
                        str.push(encodeURIComponent(ref) + "=" + encodeURIComponent(obj[ref]));
                    return str.join("&");
                },
                data: data}).
                then(function successCallback(data, status) {
                    success(data, status);
                    return data;
                },
                function errorCallBack(data, status) {
                    error(data, status);
                    return data;
                });
        };

        crudService.deleteRequest = function (url, success, error) {
            return $http({method: 'DELETE', url: url}).
                then(function successCallback(data, status) {
                    success(data, status);
                    return data;
                },
                function errorCallBack(data, status) {
                    error(data, status);
                    return data;
                });
        };

        crudService.putRequest = function (url, data, success, error) {
            return $http({method: 'PUT', url: url, data: data}).
                then(function successCallback(data, status) {
                    success(data, status);
                    return data;
                },
                function errorCallBack(data, status) {
                    error(data, status);
                    return data;
                });
        };

        return crudService;
    }
}());


/**
 * angular/app/services/OrderDetailsService.js
 * Created by HWhewell on 17/12/2015.
 */
(function(){

    angular
        .module('app.services')
        .service('OrderDetailsService', OrderDetailsService);

    OrderDetailsService.$inject = ['CrudService'];

    function OrderDetailsService(CrudService){
        var orderDetailsService = {};

        // get all order details
        orderDetailsService.getAllOrderDetails = function(success, error){
            return CrudService.getRequest('http://localhost:8080/api/order-details/', success, error);
        };

        // create order details
        orderDetailsService.createOrderDetails = function(data, success, error){
            return CrudService.postRequest('http://localhost:8080/api/order-details/', data, success, error);
        };

        // get order details by id
        orderDetailsService.getOrderDetailsById = function(id, success, error){
            return CrudService.getRequest('http://localhost:8080/api/order-details/' + id, success, error);
        };

        // update order details by id
        orderDetailsService.updateOrderDetailsById = function(id, data, success, error){
            return CrudService.putRequest('http://localhost:8080/api/order-details/' + id, data, success, error);
        };

        // delete order details by id
        orderDetailsService.deleteOrderDetailsById = function(id, success, error){
            return CrudService.deleteRequest('http://localhost:8080/api/order-details/' + id, success, error);
        };

        return orderDetailsService;
    }
}());
/**
 * angular/app/services/OrderService.js
 * Created by HWhewell on 17/12/2015.
 */
(function(){

    angular
        .module('app.services')
        .service('OrderService', OrderService);

    OrderService.$inject = ['CrudService'];

    function OrderService(CrudService){
        var orderService = {};

        // get all orders
        orderService.getAllOrders = function(success, error){
            return CrudService.getRequest('http://localhost:8080/api/orders/', success, error);
        };

        // create orders
        orderService.createOrder = function(data, success, error){
            return CrudService.postRequest('http://localhost:8080/api/orders/', data, success, error);
        };

        // get orders by id
        orderService.getOrderById = function(id, success, error){
            return CrudService.getRequest('http://localhost:8080/api/orders/' + id, success, error);
        };

        // update orders by id
        orderService.updateOrderById = function(id, data, success, error){
            return CrudService.putRequest('http://localhost:8080/api/orders/' + id, data, success, error);
        };

        // delete orders by id
        orderService.deleteOrderById = function(id, success, error){
            return CrudService.deleteRequest('http://localhost:8080/api/orders/' + id, success, error);
        };

        return orderService;
    }
}());
/**
 * angular/services/ReviewService.js
 * Created by HWhewell on 15/12/2015.
 */
(function(){

    angular
        .module('app.services')
        .service('ReviewService', ReviewService);

    ReviewService.$inject = ['CrudService'];

    function ReviewService(CrudService){
        var reviewService = {};

        // get all reviews
        reviewService.getAllReviews = function(success, error){
            return CrudService.getRequest('http://localhost:8080/api/reviews/', success, error);
        };

        // create review
        reviewService.createReview = function(data, success, error){
            return CrudService.postRequest('http://localhost:8080/api/reviews/', data, success, error);
        };

        // get review by id
        reviewService.getReviewById = function(id, success, error){
            return CrudService.getRequest('http://localhost:8080/api/reviews/' + id, success, error);
        };

        // get review by product ref
        reviewService.getReviewByRef = function(ref, success, error){
            return CrudService.getRequest('http://localhost:8080/api/reviews/ref/' + ref, success, error);
        };

        // update review by id
        reviewService.updateReviewById = function(id, data, success, error){
            return CrudService.putRequest('http://localhost:8080/api/reviews/' + id, data, success, error);
        };

        // delete review by id
        reviewService.deleteReviewById = function(id, success, error){
            return CrudService.deleteRequest('http://localhost:8080/api/reviews/' + id, success, error);
        };

        return reviewService;
    }
}());
/**
 * angular/services/SpellService.js
 * Created by HWhewell on 15/12/2015.
 */
(function(){

    angular
        .module('app.services')
        .service('SpellService', SpellService);

    SpellService.$inject = ['CrudService'];

    function SpellService(CrudService){
        var spellService = {};

        // get all spells
        spellService.getAllSpells = function(success, error){
            return CrudService.getRequest('http://localhost:8080/api/spells/', success, error);
        };

        // create spell
        spellService.createSpell = function(data, success, error){
            return CrudService.postRequest('http://localhost:8080/api/spells/', data, success, error);
        };

        // get spell by id
        spellService.getSpellById = function(id, success, error){
            return CrudService.getRequest('http://localhost:8080/api/spells/' + id, success, error);
        };

        // get spell by ref
        spellService.getSpellByRef = function(ref, success, error){
            return CrudService.getRequest('http://localhost:8080/api/spells/ref/' + ref, success, error);
        };

        // update spell by id
        spellService.updateSpellById = function(id, data, success, error){
            return CrudService.putRequest('http://localhost:8080/api/spells/' + id, data, success, error);
        };

        // delete spell by id
        spellService.deleteSpellById = function(id, success, error){
            return CrudService.deleteRequest('http://localhost:8080/api/spells/' + id, success, error);
        };

        return spellService;
    }
}());
/**
 * angular/services/ApparelService.js
 * Created by HWhewell on 16/12/2015.
 */
(function(){

    angular
        .module('app.services')
        .service('UserService', UserService);

    UserService.$inject = ['CrudService'];

    function UserService(CrudService){
        var userService = {};

        // get all users
        userService.getAllUsers = function(success, error){
            return CrudService.getRequest('http://localhost:8080/api/users/', success, error);
        };

        // create user
        userService.createUser = function(data, success, error){
            return CrudService.postRequest('http://localhost:8080/api/users/', data, success, error);
        };

        // get user by id
        userService.getUserById = function(id, success, error){
            return CrudService.getRequest('http://localhost:8080/api/users/' + id, success, error);
        };

        // get user by email
        userService.getUserByEmail = function(email, success, error){
            return CrudService.getRequest('http://localhost:8080/api/users/email/' + email, success, error);
        };

        // update user by id
        userService.updateUserById = function(id, data, success, error){
            return CrudService.putRequest('http://localhost:8080/api/users/' + id, data, success, error);
        };

        // delete user by id
        userService.deleteUserById = function(id, success, error){
            return CrudService.deleteRequest('http://localhost:8080/api/users/' + id, success, error);
        };

        // login user
        userService.login = function(data, success, error){
            return CrudService.postRequest('http://localhost:8080/api/auth/', data, success, error)
        };

        return userService;
    }
}());
/**
 * angular/services/WeaponService.js
 * Created by HWhewell on 15/12/2015.
 */
(function(){

    angular
        .module('app.services')
        .service('WeaponService', WeaponService);

    WeaponService.$inject = ['CrudService'];

    function WeaponService(CrudService){
        var weaponService = {};

        // get all weapons
        weaponService.getAllWeapons = function(success, error){
            return CrudService.getRequest('http://localhost:8080/api/weapons/', success, error);
        };

        // create weapon
        weaponService.createWeapon = function(data, success, error){
            return CrudService.postRequest('http://localhost:8080/api/weapons/', data, success, error);
        };

        // get weapon by id
        weaponService.getWeaponById = function(id, success, error){
            return CrudService.getRequest('http://localhost:8080/api/weapons/' + id, success, error);
        };

        // get weapon by ref
        weaponService.getWeaponByRef = function(ref, success, error){
            return CrudService.getRequest('http://localhost:8080/api/weapons/ref/' + ref, success, error);
        };

        // update weapon by id
        weaponService.updateWeaponById = function(id, data, success, error){
            return CrudService.putRequest('http://localhost:8080/api/weapons/' + id, data, success, error);
        };

        // delete weapon by id
        weaponService.deleteWeaponById = function(id, success, error){
            return CrudService.deleteRequest('http://localhost:8080/api/weapons/' + id, success, error);
        };

        return weaponService;
    }
}());
/**
 * angular/app/admin/admin.js
 * Created by HWhewell on 16/12/2015.
 */
(function(){

    angular
        .module('app.controllers')
        .controller('AdminController', AdminController);

    function AdminController(){
        var vm = this;
    }

}());
/**
 * angular/app/apparel/apparel.js
 * Created by HWhewell on 15/12/2015.
 */
(function(){

    angular
        .module('app.controllers')
        .controller('ApparelController', ApparelController);

    ApparelController.$inject = ['ApparelService'];

    function ApparelController(ApparelService) {
        var vm = this;

        vm.apparelList = vm.getApparel;

        vm.getApparel = ApparelService.getAllApparel(function (success) {
            vm.apparelList = success.data;
        }, function (error) {
            vm.apparelList = error;
        });

    }
}());
/**
 * angular/app/apparelItem/apparelItem.js
 * Created by HWhewell on 05/01/2016.
 */
(function(){

    angular
        .module('app.controllers')
        .controller('ApparelItemController', ApparelItemController);

    ApparelItemController.$inject = ['$routeParams','ApparelService'];

    function ApparelItemController($routeParams, ApparelService) {
        var vm = this;

        vm.item_ref = $routeParams.ref;

        vm.getApparel = ApparelService.getApparelByRef(vm.item_ref, function(success){
            vm.getApparel = success.data;

            vm.apparelType = vm.getApparel.type;
            vm.apparelName = vm.getApparel.name;
            vm.apparelDesc = vm.getApparel.desc;
            vm.apparelArmour = vm.getApparel.armour;
            vm.apparelPrice = vm.getApparel.price;
            vm.apparelQuantity = vm.getApparel.quantity;

        },function(error){
            vm.getApparel = error;
        });

    }

}());
/**
 * angular/app/home/home.js
 * Created by HWhewell on 07/12/2015.
 */
(function(){

    angular
        .module('app.controllers')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['AuthService'];

    function HomeController(AuthService){
        var vm = this;

        vm.userName = AuthService.getTokenName();
    }

}());
/**
 * angular/app/login/login.js
 * Created by HWhewell on 07/12/2015.
 */
(function(){

    angular
        .module('app.controllers')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['UserService','$location'];

    function LoginController(UserService, $location){
        var vm = this;
        vm.login = function(){
            var data = {email: vm.email, password: vm.password};
            UserService.login(data, function(res){
                if(res.data.success == true){
                    $location.path('/');
                }
                else{
                    window.alert('Wrong Login Credentials!')
                }
            },function(error){
                console.log(error);
                window.alert('Something Went Wrong!')
            })
        }
    }

}());
/**
 * angular/app/order/order.js
 * Created by HWhewell on 04/01/2016.
 */
(function(){

    angular
        .module('app.controllers')
        .controller('OrderController', OrderController);

    function OrderController() {
        var vm = this;

    }

}());
/**
 * angular/directives/review.js
 * Created by HWhewell on 22/01/2016.
 */
(function(){

    angular
        .module('app.controllers')
        .controller('ReviewController', ReviewController);

    ReviewController.$inject = ['$routeParams','ReviewService','AuthService'];

    function ReviewController($routeParams, ReviewService, AuthService){
        vm = this;

        vm.item_ref = $routeParams.ref;

        vm.isAuthed = function () {
            return AuthService.isAuthed ? AuthService.isAuthed() : false
        };

        vm.reviewList = vm.getReviews;

        vm.getReviews = ReviewService.getReviewByRef(vm.item_ref, function(res){
                vm.reviewList = res.data;
                console.log(vm.reviewList);
            }, function(err){
                console.log('Error: ' + err);

            });

        vm.makeReview = function(){
            vm.author = AuthService.getTokenName();
            data = {product_ref: vm.item_ref, stars: vm.stars, body: vm.body, author: vm.author };
            ReviewService.createReview(data, function(res){
                vm.body = "";
                window.alert('Review Added!');
            },function(err){

            })
        }

    }
}());
/**
 * angular/app/spellItem/spellItem.js
 * Created by HWhewell on 04/01/2016.
 */
(function(){

    angular
        .module('app.controllers')
        .controller('SpellItemController', SpellItemController);

    SpellItemController.$inject = ['$routeParams','SpellService'];

    function SpellItemController($routeParams, SpellService) {
        var vm = this;

        vm.item_ref = $routeParams.ref;

        vm.getSpell = SpellService.getSpellByRef(vm.item_ref, function(success){
            vm.getSpell = success.data;

            vm.spellName = vm.getSpell.name;
            vm.spellDesc = vm.getSpell.desc;
            vm.spellEffect = vm.getSpell.effect;
            vm.spellPrice = vm.getSpell.price;
            vm.spellQuantity = vm.getSpell.quantity;

        },function(error){
            vm.getSpell = error;
        });
    }

}());
/**
 * angular/app/spells/spell.js
 * Created by HWhewell on 15/12/2015.
 */
(function(){

    angular
        .module('app.controllers')
        .controller('SpellController', SpellController);

    SpellController.$inject = ['SpellService'];

    function SpellController(SpellService){
        var vm = this;

        vm.spellList = vm.getSpells;

        vm.getSpells = SpellService.getAllSpells(function(success){
            vm.spellList = success.data;
        },function(error){
            vm.spellList = error;
        });
    }

}());
/**
 * angular/app/weaponItem/weaponItem.js
 * Created by HWhewell on 05/01/2016.
 */
(function(){

    angular
        .module('app.controllers')
        .controller('WeaponItemController', WeaponItemController);

    WeaponItemController.$inject = ['$routeParams', 'WeaponService'];

    function WeaponItemController($routeParams, WeaponService) {
        var vm = this;

        vm.item_ref = $routeParams.ref;

        vm.getWeapon = WeaponService.getWeaponByRef(vm.item_ref, function(success){
            vm.getWeapon = success.data;

            vm.weaponType = vm.getWeapon.type;
            vm.weaponName = vm.getWeapon.name;
            vm.weaponDesc = vm.getWeapon.desc;
            vm.weaponDamage = vm.getWeapon.damage;
            vm.weaponPrice = vm.getWeapon.price;
            vm.weaponQuantity = vm.getWeapon.quantity;

        },function(error){
            vm.getWeapon = error;
        });
    }

}());
/**
 * angular/app/weapons/weapon.js
 * Created by HWhewell on 15/12/2015.
 */
(function(){

    angular
        .module('app.controllers')
        .controller('WeaponController', WeaponController);

    WeaponController.$inject = ['WeaponService'];

    function WeaponController(WeaponService){
        var vm = this;

        vm.weaponList = vm.getWeapons;

        vm.getWeapons = WeaponService.getAllWeapons(function(success){
            vm.weaponList = success.data;
        },function(error){
            vm.weaponList = error;
        });
    }

}());