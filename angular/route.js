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
            .when('/weapons/item/:itemRef',{
                templateUrl: 'public/views/weaponItem/weaponItem.html',
                controller: 'WeaponItemController as vm'
            })

            .when('/apparel',{
                templateUrl: 'public/views/apparel/apparel.html',
                controller: 'ApparelController as vm'
            })

            .when('/apparel/:apparelId',{
                templateUrl: 'public/views/apparelItem/apparelItem.html',
                controller: 'ApparelItemController as vm'
            })

            .when('/spells',{
                templateUrl: 'public/views/spells/spell.html',
                controller: 'SpellController as vm'
            })

            .when('/spells/item/:itemRef',{
                templateUrl: 'public/views/spellItem/spellItem.html',
                controller: 'SpellItemController as vm'
            })

    }
}());