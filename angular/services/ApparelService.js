/**
 * angular/services/ApparelService.js
 * Created by HWhewell on 15/12/2015.
 */
(function(){

    angular
        .module('app.services')
        .service('ApparelService', ApparelService);

    ApparelService.$inject = ['CrudService'];

    function ApparelService(CrudService){
        var apparelService = {};

        // get all apparel
        apparelService.getAllApparel = function(success, error){
            return CrudService.getRequest('/localhost:8080/api/apparel/', success, error);
        };



        return apparelService;
    }
}());