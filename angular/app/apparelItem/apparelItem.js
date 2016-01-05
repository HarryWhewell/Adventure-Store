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

        vm.item_id = $routeParams.apparelId;

        vm.getApparel = ApparelService.getApparelById(vm.item_id, function(success){
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