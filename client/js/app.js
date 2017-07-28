angular.module("assApp", ["ui.router", "assApp.controllers","ngStorage"])
    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state("index", {
                url: "/",
                templateUrl: "/templates/home.html",
            })
            .state("scorePage", {
                url: "/leaderboard",
                templateUrl: "/templates/leaderboard.html",
                controller: "leaderboardCtrl"
            })
            .state("forumDirectoryPage", {
                url: "/forumDirectory",
                templateUrl: "/templates/forumDirectory.html",
                controller: "forumDirectoryCtrl"
            })
            .state("forumPostPage", {
                url: "/forumPost",
                templateUrl: "/templates/forumPost.html",
                controller: "forumPostCtrl"
            })
            .state("forumCreate", {
                url: "/forumCreate",
                templateUrl: "/templates/forumCreate.html",
                controller: "forumCreateCtrl",
            })
            .state("forumUpdate", {
                url: "/forumUpdate",
                templateUrl: "/templates/forumUpdate.html",
                controller: "forumUpdateCtrl"
            })
            .state("signup", {
                url: "/signup",
                templateUrl: "/templates/signup.html",
                controller: "signupCtrl"
            })
            .state("login", {
                url: "/login",
                templateUrl: "/templates/login.html",
                controller: "loginCtrl"
            })
            .state("about", {
                url: "/about",
                templateUrl: "/templates/about.html"
            })
            .state("contact", {
                url: "/contact",
                templateUrl: "/templates/contact.html"
            });
             $urlRouterProvider.otherwise("/")
    });

            var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
                var deferred = $q.defer();

                $http.get('/loggedin').then(function(response) {
                    $rootScope.errorMessage = null;
                    //User is Authenticated
                    if (response !== '0') {
                        $rootScope.currentUser = response;
                        deferred.resolve();
                        } else { //User is not Authenticated
                            $rootScope.errorMessage = 'You need to log in.';
                            deferred.reject();
                            $location.url('#!/login');
                        }
                    });
                return deferred.promise;
            };

       