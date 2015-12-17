/**
 * angular/app/services/OrderService.js
 * Created by HWhewell on 17/12/2015.
 */
(function(){

    angular
        .module('app.services')
        .service('OrderService', OrderService);

    OrderService.$inject = ['CrudService'];

    function OrderService(CrudService){
        var orderService = {};

        // get all orders
        orderService.getAllOrders = function(success, error){
            return CrudService.getRequest('http://localhost:8080/api/orders/', success, error);
        };

        // create orders
        orderService.createOrder = function(data, success, error){
            return CrudService.postRequest('http://localhost:8080/api/orders/', data, success, error);
        };

        // get orders
        orderService.getOrderById = function(id, success, error){
            return CrudService.getRequest('http://localhost:8080/api/orders/' + id, success, error);
        };

        // update orders
        orderService.updateOrderById = function(id, data, success, error){
            return CrudService.putRequest('http://localhost:8080/api/orders/' + id, data, success, error);
        };

        // delete orders
        orderService.deleteOrderById = function(id, success, error){
            return CrudService.deleteRequest('http://localhost:8080/api/orders/' + id, success, error);
        };

        return orderService;
    }
}());