/**
 * angular/app/login/login.js
 * Created by HWhewell on 07/12/2015.
 */
(function(){

    angular
        .module('app.controllers')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['UserService','$location'];

    function LoginController(UserService, $location){
        var vm = this;
        vm.login = function(){
            var data = {email: vm.email, password: vm.password};
            UserService.login(data, function(res){
                if(res.data.success == true){
                    $location.path('/');
                }
                else{
                    window.alert('Wrong Login Credentials!')
                }
            },function(error){
                console.log(error);
                window.alert('Something Went Wrong!')
            })
        }
    }

}());