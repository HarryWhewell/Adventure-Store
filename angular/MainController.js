/**
 * angular/MainController.js
 * Created by HWhewell on 21/01/2016.
 */
(function(){

    angular
        .module('app.controllers')
        .controller('MainController', MainController);

    MainController.$inject = ['AuthService'];

    function MainController(AuthService){
        vm = this;

        vm.logout = function(){
            AuthService.logout && AuthService.logout()
        };

        vm.isAuthed = function () {
            return AuthService.isAuthed ? AuthService.isAuthed() : false
        };
    }
}());