/**
 * Created by HWhewell on 05/01/2016.
 */
(function(){

    angular
        .module('app.controllers')
        .controller('ApparelItemController' ,ApparelItemController);

    ApparelItemController.$inject = ['ApparelService'];

    function ApparelItemController($routeParams , ApparelService) {
        var vm = this;

        vm.item_id = $routeParams.apparelId;

        vm.apparel = vm.getApparel;

        vm.getApparel = ApparelService.getApparelById(vm.item_id, function(success){
            vm.getApparel = success.data;
        },function(error){
            vm.getApparel = error;
        });
    }

}());