/**
 * angular/app/spells/spell.js
 * Created by HWhewell on 15/12/2015.
 */
(function(){

    angular
        .module('app.controllers')
        .controller('SpellController', SpellController);

    SpellController.$inject = ['SpellService'];

    function SpellController(SpellService){
        var vm = this;

        vm.response = vm.getSpells;

        vm.getSpells = SpellService.getAllSpells(function(success){
            vm.response = success.data;
        },function(error){
            vm.response = error;
        });
    }

}());