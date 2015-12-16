/**
 * angular/app.js
 * Created by HWhewell on 07/12/2015.
 */
(function(){
    angular
        .module('app', [
            'app.controllers',
            'app.services',
            'app.directives',
            'app.config',
            'ngRoute'
        ]);

    angular.module('app.controllers', []);
    angular.module('app.services', []);
    angular.module('app.directives', []);
    angular.module('app.config', ['ngRoute']);
}());
/**
 * angular/routes.js
 * Created by HWhewell on 07/12/2015.
 */
(function(){

    angular
        .module('app.config')
        .config(Route);

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
            .when('/apparel',{
                templateUrl: 'public/views/apparel/apparel.html',
                controller: 'ApparelController as vm'
            })
            .when('/spells',{
                templateUrl: 'public/views/spells/spell.html',
                controller: 'SpellController as vm'
            })

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
            return $http({method: 'POST', url: url, data: data}).
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
        userService.getAllReviews = function(success, error){
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

        // update user by id
        userService.updateUserById = function(id, data, success, error){
            return CrudService.putRequest('http://localhost:8080/api/users/' + id, data, success, error);
        };

        // delete user by id
        userService.deleteUserById = function(id, success, error){
            return CrudService.deleteRequest('http://localhost:8080/api/users/' + id, success, error);
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
 * angular/app/apparel/apparel.js
 * Created by HWhewell on 15/12/2015.
 */
(function(){

    angular
        .module('app.controllers')
        .controller('ApparelController', ApparelController);

    ApparelController.$inject = ['ApparelService'];

    function ApparelController(ApparelService){
        var vm = this;

        vm.apparelList = vm.getApparel;

        vm.getApparel = ApparelService.getAllApparel(function(success){
            vm.apparelList = success.data;
        },function(error){
            vm.apparelList = error;
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

    function HomeController(){
        var vm = this;
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

    function LoginController(){
        var vm = this;
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