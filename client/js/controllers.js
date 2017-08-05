angular.module("assApp.controllers", [])
    .controller("navCtrl", function($rootScope, $scope, $http, $location,$localStorage,
    $sessionStorage, $rootScope, $state) {
        $rootScope.currentUser = $localStorage.currentUser
        $scope.logout = function() {
            $http.post("/logout")
            .then(function() {
                $rootScope.currentUser = null;
                $localStorage.currentUser = null;
                $state.go("index");
            });
        }
    })

    .controller("leaderboardCtrl", function($scope, $http){
    	$http.get("/leader/score")
    	.then(function(response){
            $scope.score = response.data
    	})
    })
    .controller("forumCreateCtrl", function($scope, $http, $window, $state){
    	$scope.createPost = function(){
    	$http.post('/forum/createPost', $scope.post, { headers: { 'Content-Type': 'application/json' } })
    	.then(function(response){
            console.log("dope")
            $state.go("forumDirectoryPage");
    		$scope.msg = "dope!";
		}, function(response){ 
			$scope.msg ="Not dope!"
			console.log("not dope")
		})
    }
    	})

    .controller("forumDirectoryCtrl", function($scope, $http){
        $http.get("/forum/directory")
        .then(function(response){
            $scope.post = response.data
        })
    })

    .controller("forumPostCtrl", function($scope, $http, $location, $state){
        var p = $location.search().p

        $http.get("/forum/post/:id", {params :{id: p}})
        .then(function(response){
            $scope.post = response.data
        })

        $scope.comment = function(){
            $http.put('/forum/comment/:id', $scope.comments, {params :{id: p}})
            .then(function(response){
                $state.go("forumDirectoryPage");

                console.log("coolio")
            }), function(response){
                console.log("fail")
            }

        }
    })
    	

    .controller("forumUpdateCtrl", function($scope, $http, $window, $location , $state){
        var p = $location.search().p

        $http.get("/forum/post/:id", {params :{id: p}})
        .then(function(response){
            $scope.post = response.data
        })

        $scope.deletePost = function(){
            $http.delete('forum/delete/:id', {params :{id: p}})
            .then(function(response){
                console.log("delete success")
                $state.go("index");
            })
        }

        $scope.editPost = function(){
            $http.put('/forum/update/:id', $scope.post, {params :{id: p}})
            .then(function(response){
                $state.go("forumDirectoryPage");
                console.log("coolio")
            }), function(response){
                console.log("fail")
            }
        }

    })

    .controller("signupCtrl", function($scope, $http, $window, $state){
        $scope.signup = function(){
        $http.post('/user-signup', $scope.post, { headers: { 'Content-Type': 'application/json' } })
        .then(function(response){
            $state.go("login");
                $scope.msg = "signup success!";
            console.log("dope")
        }, function(response){ 
            $scope.msg ="Not dope!"
            console.log("not dope")
        })
    }
        })

    .controller("loginCtrl", function($scope, $http, $window, $localStorage, $rootScope, $state){
        $scope.login = function(){
        $http.post('/user-login', $scope.post, { headers: { 'Content-Type': 'application/json' } })
        .then(function(response){
            console.log(response)
            $localStorage.currentUser= response.data;
            $rootScope.currentUser = $localStorage.currentUser;
            console.log("user logged in");
            $state.go("index");
        }, function(response){ 
            console.log(response)
            console.log("user not logged in")
            $scope.msg = "Invalid Log In"
        })
    }
        })
