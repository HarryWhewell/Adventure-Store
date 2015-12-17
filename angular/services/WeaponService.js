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
        weaponService.getReviewByProductRef = function(ref, success, error){
            return CrudService.getRequest('http://localhost:8080/api/weapons/product/' + ref, success, error);
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