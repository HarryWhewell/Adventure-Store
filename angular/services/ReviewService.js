/**
 * angular/services/ReviewService.js
 * Created by HWhewell on 15/12/2015.
 */
(function(){

    angular
        .module('app.services')
        .service('ReviewService', ReviewService);

    ReviewService.$inject = ['CrudService'];

    function ReviewService(CrudService){
        var reviewService = {};

        // get all reviews
        reviewService.getAllReviews = function(success, error){
            return CrudService.getRequest('/localhost:8080/api/reviews/', success, error);
        };

        return reviewService;
    }
}());