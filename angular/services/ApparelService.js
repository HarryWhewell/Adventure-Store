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
            return CrudService.getRequest('http://localhost:8080/api/apparel/', success, error);
        };

        // create apparel
        apparelService.createApparel = function(data, success, error){
            return CrudService.postRequest('http://localhost:8080/api/apparel/', data, success, error);
        };

        // get apparel by id
        apparelService.getApparelById = function(id, success, error){
            return CrudService.getRequest('http://localhost:8080/api/apparel/' + id, success, error);
        };

        // update apparel by id
        apparelService.updateApparelById = function(id, data, success, error){
            return CrudService.putRequest('http://localhost:8080/api/apparel/' + id, data, success, error);
        };

        // delete apparel by id
        apparelService.deleteApparelById = function(id, success, error){
            return CrudService.deleteRequest('http://localhost:8080/api/apparel/' + id, success, error);
        };

        return apparelService;
    }
}());