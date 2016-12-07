angular.module('loginApp').controller('loginController', function ($scope, loginService) {
    $scope.LoginData = {
        Email: '',
        Password: ''
    }
    $scope.msg = '';
    $scope.Submitted = false;
    $scope.IsLoggedIn = false;
    $scope.IsFormValid = false;

    $scope.$watch("myForm.$valid", function (TrueOrFalse) {
        $scope.IsFormValid = TrueOrFalse;
    });


})

.factory('loginService', function ($http) {
    var fac = {};
    fac.getUserDetails = function (data) {
        debugger;
        return $http({
            url: '/Home/GetLoginData',
            method: 'POST',
            data: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        });
    };
    return fac;
});