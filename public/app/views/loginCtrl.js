'use strict';

angular.module('myAppRename', [])
    .controller('loginCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {

        $scope.title = "GlobeJob";

        $scope.username = "";
        $scope.email = "";
        $scope.password = "";

        $scope.buttonDisabled = true;


        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

        $scope.clearErrors = function clearErrors() {
            $scope.correctUsername = true;
            $scope.correctEmail = true;
            $scope.correctPassword = true;
        };

        $scope.login = function login() {
            $scope.incorrectUsername = false;

            //check input
            if ($scope.username === "") {
                $scope.correctUsername = false;
                $scope.usernameError = "Please enter a username";
            } else {
                $scope.correctUsername = true;
            }

            if ($scope.email === "") {
                $scope.correctEmail = false;
                $scope.emailError = "Please enter an email";
            } else {
                $scope.correctEmail = true;
            }

            var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            if ($scope.email.search(emailRegEx) == -1) {
                $scope.correctEmail = false
                $scope.emailError = "Please enter a valid email"
            } else {
                $scope.correctEmail = true
            }

            if ($scope.password === "") {
                $scope.correctPassword = false;
                $scope.passwordError = "Please enter a password";
            } else {
                $scope.correctPassword = true;
            }


            if ($scope.correctUsername && $scope.correctEmail && $scope.correctPassword) {
                var o = {
                    username: $scope.username,
                    email: $scope.email,
                    pass: $scope.password
                };

                $http({
                    method: 'POST',
                    url: '/user',
                    data: o
                }).
                    success(function (data, status, headers, config) {
                        //redirect to page
                        $window.location.href = '/jobs';
                    }).
                    error(function (data, status, headers, config) {
                        console.log(data);
                    });
            }

        }


    }]);
