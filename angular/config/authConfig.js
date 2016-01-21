/**
 * angular/config/authConfig.js
 * Created by HWhewell on 20/01/2016.
 */
(function(){
    angular
        .module('app.config')
        .config(authConfig);


    function authConfig($httpProvider){
        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};

        $httpProvider.interceptors.push('authInterceptor');
    }
}());