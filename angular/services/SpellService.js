/**
 * app/services/SpellService.js
 * Created by HWhewell on 15/12/2015.
 */
(function(){

    angular
        .module('app.services')
        .service('SpellService', SpellService);

    SpellService.$inject = ['CrudService'];

    function SpellService(CrudService){
        var spellService = {};

        // get all spells
        spellService.getAllSpells = function(success, error){
            return CrudService.getRequest('/localhost:8080/api/spells/', success, error);
        };

        return spellService;
    }
}());