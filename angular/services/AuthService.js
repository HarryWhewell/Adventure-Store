/**
 * angular/services/AuthService.js
 * Created by HWhewell on 20/01/2016.
 */
(function(){

    angular
        .module('app.services')
        .service('AuthService', authService);

    authService.$inject = ['$window','$location'];

    function authService($window, $location){
        var vm = this;

        // decode jwt
        vm.parseJwt = function(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            console.log('JSON: ',JSON.parse($window.atob(base64)));
            return JSON.parse($window.atob(base64));
        };

        // save token to local storage
        vm.saveToken = function(token) {
            $window.localStorage['jwtToken'] = token;
        };

        // retrieve token from localStorage
        vm.getToken = function() {
            return $window.localStorage['jwtToken'];
        };

        // check if the user is authenticated
        vm.isAuthed = function() {
            var token = vm.getToken();
            if(token) {
                var params = vm.parseJwt(token);

                //Unix Time is in seconds while JavaScript Date.now()
                // returns milliseconds, so a conversion is necessary
                return Math.round(new Date().getTime() / 1000) <= params.exp;
            } else {
                return false;
            }
        };

        // check if the user is an admin
        vm.isAdmin = function() {
            var token = vm.getToken();
            if(token){
                var params = vm.parseJwt(token);
                var role = params.role;

                return role == 'admin';

            } else {
                return false;
            }
        };

        vm.getTokenName = function(){
          var token = vm.getToken();
          if(token){
              var params = vm.parseJwt(token);
              return params.name;
          }
        };

        // logs out user
        vm.logout = function() {
            $window.localStorage.removeItem('jwtToken');
            $location.path('/');
        }
    }
}());