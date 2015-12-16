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