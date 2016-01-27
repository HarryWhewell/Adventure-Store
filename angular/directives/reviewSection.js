/**
 * angular/directives/reviewSection.js
 * Created by HWhewell on 22/01/2016.
 */
(function(){

    angular
        .module('app.directives')
        .directive('reviewSection', ReviewSection);

    function ReviewSection(){
        return {
            restrict: 'E',
            controller: 'ReviewController as review',
            bindToController: true,
            templateUrl: 'public/views/review/review-section.html'
        };
    }
}());