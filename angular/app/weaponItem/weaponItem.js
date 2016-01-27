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