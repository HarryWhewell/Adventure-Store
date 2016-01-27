/**
 * angular/directives/review.js
 * Created by HWhewell on 22/01/2016.
 */
(function(){

    angular
        .module('app.controllers')
        .controller('ReviewController', ReviewController);

    ReviewController.$inject = ['$routeParams','ReviewService','AuthService'];

    function ReviewController($routeParams, ReviewService, AuthService){
        vm = this;

        vm.item_ref = $routeParams.ref;

        vm.isAuthed = function () {
            return AuthService.isAuthed ? AuthService.isAuthed() : false
        };

        vm.reviewList = vm.getReviews;

        vm.getReviews = ReviewService.getReviewByRef(vm.item_ref, function(res){
                vm.reviewList = res.data;
                console.log(vm.reviewList);
            }, function(err){
                console.log('Error: ' + err);

            });

        vm.makeReview = function(){
            vm.author = AuthService.getTokenName();
            data = {product_ref: vm.item_ref, stars: vm.stars, body: vm.body, author: vm.author };
            ReviewService.createReview(data, function(res){
                vm.body = "";
                window.alert('Review Added!');
            },function(err){

            })
        }

    }
}());