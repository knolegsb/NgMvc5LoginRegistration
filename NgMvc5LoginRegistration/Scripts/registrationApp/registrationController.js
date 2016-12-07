angular.module('registrationApp')
.controller('registrationController', function ($scope, registrationService) {
    $scope.submitText = "Save";
    $scope.submitted = false;
    $scope.message = '';
    $scope.isFormValid = false;
    $scope.User = {
        MemberName: '',
        Password: '',
        FullName: '',
        Email: '',
        Gender: ''
    };

    $scope.$watch('f1.$valid', function (newValue) {
        $scope.isFormValid = newValue;
    });

    $scope.SaveData = function (data) {
        if ($scope.submitText == 'Save') {
            $scope.submitted = true;
            $scope.message = '';

            if ($scope.isFormValid) {
                $scope.submitText = 'Please wait...';
                $scope.User = data;
                registrationService.SaveFormData($scope.User).then(function (d) {
                    alert(d);
                    if (d == 'Success') {
                        ClearForm();
                    }
                    $scope.submitText = 'Save';
                });
            }
            else {
                $scope.message = '';
            }
        }
    }

    function ClearForm() {
        $scope.User = {};
        $scope.f1.$setPristine();
        $scope.submitted = false;
    }
})
.factory('registrationService', function ($http, $q) {
    var fac = {};
    var deferred = $q.defer();
    fac.SaveFormData = function (data) {
        $http({
            url: '/Home/Register',
            method: 'POST',
            data: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        }).success(function (d) {
            deferred.resolve(d);
        }).error(function (e) {
            alert('Error!');
            deferred.reject(e);
        });
        return deferred.promise;
    }
    return fac;
})