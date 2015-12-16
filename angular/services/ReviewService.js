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

        // create review
        reviewService.createReview = function(data, success, error){
            return CrudService.postRequest('/localhost:8080/api/reviews/', data, success, error);
        };

        // get review by id
        reviewService.getReviewById = function(id, success, error){
            return CrudService.getRequest('/localhost:8080/api/reviews/' + id, success, error);
        };

        // update review by id
        reviewService.updateReviewById = function(id, data, success, error){
            return CrudService.putRequest('/localhost:8080/api/reviews/' + id, data, success, error);
        };

        // delete review by id
        reviewService.deleteReviewById = function(id, success, error){
            return CrudService.deleteRequest('/localhost:8080/api/reviews/' + id, success, error);
        };

        return reviewService;
    }
}());