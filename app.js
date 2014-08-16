var app = angular.module('beertasting', ['ngRoute','firebase' ]);

var FIREBASE_URL = 'beer-tasting-contest.firebaseio.com';

app.config(function($routeProvider) {
    $routeProvider
        .when('/main', {
            templateUrl: 'main.html',
            controller: 'MainCtrl'
        })
        .when('/signup', {
            templateUrl: 'signup.html',
            controller: 'SignupCtrl'
        })
        .otherwise({
            redirectTo: '/main'
        })
});

app.run(function($rootScope) {

    var firebase = new Firebase(FIREBASE_URL);

    $rootScope.user = false;

    var auth = new FirebaseSimpleLogin(firebase, function(error, user) {
        if (error) {
            alert("Woops! We had a problem");
        } else if (user) {
            $rootScope.$apply(function() {
                $rootScope.user = user;
            });
        }
    });

    $rootScope.registerWithFacebook = function() {
        auth.login('facebook', {
            rememberMe: true,
            preferRedirect: true
        });
    }
})


app.controller('MainCtrl', [ '$scope', function($scope) {
}]);

app.controller('SignupCtrl', [ '$scope','$location','$firebase', function ($scope,$location,$firebase) {
    if (!$scope.user) {
        $location.url('main');
    }

    var firebase = new Firebase(FIREBASE_URL + '/teams/' + $scope.user.id);
    var team = $firebase(firebase);

    team.teamMembers = [];
    team.teamName = '';

    $scope.team = team;

//    $scope.teamMembers = [ $scope.user.displayName ];
    $scope.newMember = '';


    $scope.addMember = function($event) {
        if ($event) {
            if ($event.keyCode != 13) {
                return;
            }
        }
        if ($scope.newMember.length) {

            $scope.teamMembers.push(team.newMember);
            $scope.newMember = '';
        }
    }

    $scope.signup = function() {
        var saveDate = new Date();
    }


}]);