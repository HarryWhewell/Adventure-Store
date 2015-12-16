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

        vm.response = vm.getApparel;

        vm.getApparel = ApparelService.getAllApparel(function(success){
            vm.response = success.data;
        },function(error){
            vm.response = error;
        });
    }

}());