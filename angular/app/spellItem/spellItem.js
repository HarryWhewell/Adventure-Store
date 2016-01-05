/**
 * angular/app/spellItem/spellItem.js
 * Created by HWhewell on 04/01/2016.
 */
(function(){

    angular
        .module('app.controllers')
        .controller('SpellItemController', SpellItemController);

    SpellItemController.$inject = ['SpellService'];

    function SpellItemController(SpellService, $routeParams) {
        var vm = this;

        vm.item_ref = $routeParams.itemRef;

    }

}());