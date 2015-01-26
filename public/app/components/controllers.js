angular.module('myAppRename.controllers', ['angularUtils.directives.dirPagination']).
    controller('AppCtrl', function ($scope, $http, $window, $location) {

        function url_base64_decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
        }

        $scope.user;
        $scope.title = "GlobeJob";
        $scope.username = "";
        $scope.isAuthenticated = false;
        $scope.isAdmin = false;
        $scope.isUser = false;
        $scope.message = '';
        $scope.error = null;

        $scope.submit = function () {
            //input control
            $http
                .post('/authenticate', $scope.user)
                .success(function (data, status, headers, config) {
                    $window.sessionStorage.token = data.token;
                    $scope.isAuthenticated = true;
                    var encodedProfile = data.token.split('.')[1];
                    var profile = JSON.parse(url_base64_decode(encodedProfile));

                    $scope.username = profile.username;
                    $scope.isAdmin = profile.role === true;
                    $scope.isUser = profile.role === false;
                    $scope.error = null;

                    //redirect to view that in relevant to user
                    if($scope.isUser){
                        $location.path('/jobsForUserView');
                    }else{
                        $location.path('/jobsForAdminView');
                    }

                })
                .error(function (data, status, headers, config) {
                    // Erase the token if the user fails to log in
                    delete $window.sessionStorage.token;
                    $scope.isAuthenticated = false;
                    $scope.error = 'You failed to login. Invalid User or Password';
                });
        };

        $scope.logout = function () {
            $scope.isAuthenticated = false;
            $scope.isAdmin = false;
            $scope.isUser = false;
            delete $window.sessionStorage.token;
            $location.path("/view1");
        }
    });



