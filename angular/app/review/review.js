/**
 * angular/directives/review.js
 * Created by HWhewell on 22/01/2016.
 */
(function(){

    angular
        .module('app.controllers')
        .controller('ReviewController', ReviewController);

    ReviewController.$inject = ['ReviewService','AuthService'];

    function ReviewController(ReviewService, AuthService){
        vm = this;

        vm.isAuthed = function () {
            return AuthService.isAuthed ? AuthService.isAuthed() : false
        };
    }
}());