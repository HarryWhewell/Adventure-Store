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
            return CrudService.getRequest('/localhost:8080/api/weapons/', success, error);
        };

        return weaponService;
    }
}());