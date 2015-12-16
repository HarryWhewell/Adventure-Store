/**
 * angular/services/SpellService.js
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

        // create spell
        spellService.createSpell = function(data, success, error){
            return CrudService.postRequest('/localhost:8080/api/spells/', data, success, error);
        };

        // get spell by id
        spellService.getSpellById = function(id, success, error){
            return CrudService.getRequest('/localhost:8080/api/spells/' + id, success, error);
        };

        // update spell by id
        spellService.updateSpellById = function(id, data, success, error){
            return CrudService.putRequest('/localhost:8080/api/spells/' + id, data, success, error);
        };

        // delete spell by id
        spellService.deleteSpellById = function(id, success, error){
            return CrudService.deleteRequest('/localhost:8080/api/spells/' + id, success, error);
        };

        return spellService;
    }
}());