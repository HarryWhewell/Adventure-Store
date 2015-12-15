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
 * angular/services/CrudService.js
 * Created by HWhewell on 11/12/2015.
 */
(function() {
    'use strict';

    angular
        .module('app.services')
        .service('CrudService', CrudService);

    function CrudService ($http) {
        var crudservice = {};

        var error = function (error) {
            // Error with the request and you have not passed a callback of error
        };

        crudservice.getRequest = function (url, success, error) {
            return $http({method: 'GET', url: url}).
                success(function(data, status) {
                    success(data);
                    return data;
                }).
                error(function(data, status) {
                    error(data);
                    return data;
                });
        };

        crudservice.postRequest = function (url, data, success, error) {
            return $http({method: 'POST', url: url, data: data}).
                success(function(data, status) {
                    success(data, status);
                    return data;
                }).
                error(function(data, status) {
                    error(data, status);
                    return data;
                });
        };

        crudservice.deleteRequest = function () {

        };

        crudservice.putRequest = function () {

        };

        return crudservice;
    }
}());


/**
 * angular/services/WeaponService.js
 * Created by HWhewell on 15/12/2015.
 */

/**
 * angular/app/apparel/apparel.js
 * Created by HWhewell on 15/12/2015.
 */
(function(){

    angular
        .module('app.controllers')
        .controller('ApparelController', ApparelController);

    function ApparelController(){
        var vm = this;
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

    function SpellController(){
        var vm = this;
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

    function WeaponController(){
        var vm = this;
    }

}());