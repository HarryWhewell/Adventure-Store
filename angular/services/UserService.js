/**
 * angular/services/ApparelService.js
 * Created by HWhewell on 16/12/2015.
 */
(function(){

    angular
        .module('app.services')
        .service('UserService', UserService);

    UserService.$inject = ['CrudService'];

    function UserService(CrudService){
        var userService = {};

        // get all users
        userService.getAllReviews = function(success, error){
            return CrudService.getRequest('/localhost:8080/api/users/', success, error);
        };



        return userService;
    }
}());