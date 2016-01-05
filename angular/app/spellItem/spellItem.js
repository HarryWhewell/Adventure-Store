/**
 * angular/app/spellItem/spellItem.js
 * Created by HWhewell on 04/01/2016.
 */
(function(){

    angular
        .module('app.controllers')
        .controller('SpellItemController', SpellItemController);

    SpellItemController.$inject = ['$routeParams','SpellService'];

    function SpellItemController($routeParams, SpellService) {
        var vm = this;

        vm.item_id = $routeParams.spellId;

        vm.getSpell = SpellService.getSpellById(vm.item_id, function(success){
            vm.getSpell = success.data;

            vm.spellName = vm.getSpell.name;
            vm.spellDesc = vm.getSpell.desc;
            vm.spellEffect = vm.getSpell.effect;
            vm.spellPrice = vm.getSpell.price;
            vm.spellQuantity = vm.getSpell.quantity;

        },function(error){
            vm.getSpell = error;
        });
    }

}());