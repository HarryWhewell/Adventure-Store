/**
 * angular/services/CrudService.js
 * Created by HWhewell on 11/12/2015.
 */
(function() {
    'use strict';

    angular
        .module('app.services')
        .service('CrudService', CrudService);

    function CrudService ($http) {
        var crudservice = {};

        var error = function (error) {
            // Error with the request and you have not passed a callback of error
        };

        crudservice.getRequest = function (url, success, error) {
            return $http({method: 'GET', url: url}).
                success(function(data, status) {
                    success(data);
                    return data;
                }).
                error(function(data, status) {
                    error(data);
                    return data;
                });
        };

        crudservice.postRequest = function (url, data, success, error) {
            return $http({method: 'POST', url: url, data: data}).
                success(function(data, status) {
                    success(data, status);
                    return data;
                }).
                error(function(data, status) {
                    error(data, status);
                    return data;
                });
        };

        crudservice.deleteRequest = function () {

        };

        crudservice.putRequest = function () {

        };

        return crudservice;
    }
}());

