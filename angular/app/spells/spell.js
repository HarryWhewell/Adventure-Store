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

        vm.spellList = vm.getSpells;

        vm.getSpells = SpellService.getAllSpells(function(success){
            vm.spellList = success.data;
        },function(error){
            vm.spellList = error;
        });
    }

}());