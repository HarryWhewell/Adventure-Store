/**
 * Created by HWhewell on 05/01/2016.
 */
(function(){

    angular
        .module('app.controllers')
        .controller('WeaponItemController', WeaponItemController);

    WeaponItemController.$inject = ['WeaponService'];

    function WeaponItemController(WeaponController, $routeParams) {
        var vm = this;

        vm.item_ref = $routeParams.itemRef;

    }

}());