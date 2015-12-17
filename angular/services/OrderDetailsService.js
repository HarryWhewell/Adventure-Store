/**
 * angular/app/services/OrderDetailsService.js
 * Created by HWhewell on 17/12/2015.
 */
(function(){

    angular
        .module('app.services')
        .service('OrderDetailsService', OrderDetailsService);

    OrderDetailsService.$inject = ['CrudService'];

    function OrderDetailsService(CrudService){
        var orderDetailsService = {};

        // get all order details
        orderDetailsService.getAllOrderDetails = function(success, error){
            return CrudService.getRequest('http://localhost:8080/api/order-details/', success, error);
        };

        // create order details
        orderDetailsService.createOrderDetails = function(data, success, error){
            return CrudService.postRequest('http://localhost:8080/api/order-details/', data, success, error);
        };

        // get order details by id
        orderDetailsService.getOrderDetailsById = function(id, success, error){
            return CrudService.getRequest('http://localhost:8080/api/order-details/' + id, success, error);
        };

        // update order details by id
        orderDetailsService.updateOrderDetailsById = function(id, data, success, error){
            return CrudService.putRequest('http://localhost:8080/api/order-details/' + id, data, success, error);
        };

        // delete order details by id
        orderDetailsService.deleteOrderDetailsById = function(id, success, error){
            return CrudService.deleteRequest('http://localhost:8080/api/order-details/' + id, success, error);
        };

        return orderDetailsService;
    }
}());