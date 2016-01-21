/**
 * angular/factories/authInterceptors.js
 * Created by HWhewell on 20/01/2016.
 */
(function(){
    angular
        .module('app.factories')
        .factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = [ 'AuthService', '$location'];

    function authInterceptor(AuthService, $location){
        return {
            // automatically attach Authorization header
            request: function(config) {

                var token = AuthService.getToken();
                if(config.url.indexOf('http://localhost:8080/api') === 0 && token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }

                return config;
            },

            // If a token was sent back, save it
            response: function(res) {

                if(res.config.url.indexOf('http://localhost:8080/api') === 0 && res.data.token) {
                    AuthService.saveToken(res.data.token);
                }
                return res;
            },

            responseError: function(rejection){
                if(rejection.status === 401 || rejection.status === 403){
                    console.log('Response Error 401', rejection);
                    $location.path('#/');
                }
                return rejection;
            }
        }
    }
}());