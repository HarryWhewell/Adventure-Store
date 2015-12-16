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
            return CrudService.getRequest('http://localhost:8080/api/users/', success, error);
        };

        // create user
        userService.createUser = function(data, success, error){
            return CrudService.postRequest('http://localhost:8080/api/users/', data, success, error);
        };

        // get user by id
        userService.getUserById = function(id, success, error){
            return CrudService.getRequest('http://localhost:8080/api/users/' + id, success, error);
        };

        // update user by id
        userService.updateUserById = function(id, data, success, error){
            return CrudService.putRequest('http://localhost:8080/api/users/' + id, data, success, error);
        };

        // delete user by id
        userService.deleteUserById = function(id, success, error){
            return CrudService.deleteRequest('http://localhost:8080/api/users/' + id, success, error);
        };

        return userService;
    }
}());