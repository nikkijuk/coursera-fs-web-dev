'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {            
            
        	$scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
                                    
            $scope.showMenu = false;
            $scope.message = "Loading ...";
            $scope.dishes= {};
            
            menuFactory.getDishes()
            .then(
                function(response) {
                    $scope.dishes = response.data;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
            
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', function($scope) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                } else {
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])
        
      .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
          $scope.dish = {};
          $scope.showDish = false;
          $scope.message="Loading ...";
          
          menuFactory.getDish(parseInt($stateParams.id,10))
          .then(
              function(response){
                  $scope.dish = response.data;
                  $scope.showDish=true;
              },
              function(response) {
                  $scope.message = "Error: "+response.status + " " + response.statusText;
              }
          );
                      
        }])
        
      .controller('DishCommentController', ['$scope', function($scope) {

        	// list possible ratings for radio buttons
           $scope.ratings = [0,1,2,3,4,5];
 
        	var createEmptyComment = function  () {
        		// this variable is local and new is created each time when fuction is called 
            	var emptyComment = {
                        rating:5,
                        comment:"",
                        author:"",
                        date:""
                    }
            	
            	// return fresh variable
            	return emptyComment;
        		
        	}
        	
            //Step 1: Create a JavaScript object to hold the comment from the form
        	$scope.newComment = createEmptyComment(); 
        	
            $scope.submitComment = function () {
                
                //Step 2: This is how you record the date
            	$scope.newComment.date = new Date().toISOString();
                
                // Step 3: Push your comment into the dish's comment array
                $scope.dish.comments.push($scope.newComment);
                
                //Step 4: reset your form to pristine
                // doesn't two way binding handle this automatically when we use $scope.newComment ?
                // so: I see this is needed only when form is not bound to object which is shared between controller and view
                $scope.commentForm.$setPristine();

                // show success in log
                console.log('Saved feedback from '+$scope.newComment.author);
                
                //Step 5: reset your JavaScript object that holds your comment
            	$scope.newComment = createEmptyComment(); 
            	
            }
        }])

       // implement the IndexController and About Controller here
        
      .controller('IndexController', ['$scope', 'corporateFactory', 'menuFactory', function($scope, corporateFactory, menuFactory) {
 
    	  // lazy implementation: bind all directly to scope -- methods could be better here, but ...
    	  // it's not clear from assignement if "with data obtained through the controller" means data can be delivered thru $scope
    	  
       	  $scope.leader = corporateFactory.getLeader (3);
       	  
    	  $scope.promotion = menuFactory.getPromotion(0);
    	  
          $scope.dish = {};
          $scope.showDish = false;
          $scope.message="Loading ...";

          menuFactory.getDish(0)
          .then(
              function(response){
                  $scope.dish = response.data;
                  $scope.showDish = true;
              },
              function(response) {
                  $scope.message = "Error: "+response.status + " " + response.statusText;
              }
          );
      }])

      .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {

    	  // lazy implementation: bind all directly to scope -- methods could be better here, but ...
    	  // it's not clear from assignement if "with data obtained through the controller" means data can be delivered thru $scope
    	  
    	  $scope.leaders = corporateFactory.getLeaders ();
    	      	      	  
      }])
        
;
