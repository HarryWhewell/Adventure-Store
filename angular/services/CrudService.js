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
        var crudService = {};

        var error = function (error) {
            // Error with the request and you have not passed a callback of error
        };

        crudService.getRequest = function (url, success, error) {
            return $http({method: 'GET', url: url}).
                then(function successCallback(data, status) {
                    success(data, status);
                    return data;
                },
                function errorCallBack(data, status) {
                    error(data, status);
                    return data;
                });
        };

        crudService.postRequest = function (url, data, success, error) {
            return $http({method: 'POST',
                url: url,
                headers:{'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var ref in obj)
                        str.push(encodeURIComponent(ref) + "=" + encodeURIComponent(obj[ref]));
                    return str.join("&");
                },
                data: data}).
                then(function successCallback(data, status) {
                    success(data, status);
                    return data;
                },
                function errorCallBack(data, status) {
                    error(data, status);
                    return data;
                });
        };

        crudService.deleteRequest = function (url, success, error) {
            return $http({method: 'DELETE', url: url}).
                then(function successCallback(data, status) {
                    success(data, status);
                    return data;
                },
                function errorCallBack(data, status) {
                    error(data, status);
                    return data;
                });
        };

        crudService.putRequest = function (url, data, success, error) {
            return $http({method: 'PUT', url: url, data: data}).
                then(function successCallback(data, status) {
                    success(data, status);
                    return data;
                },
                function errorCallBack(data, status) {
                    error(data, status);
                    return data;
                });
        };

        return crudService;
    }
}());

