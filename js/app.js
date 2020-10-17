var app = angular.module("MainCtrl",["ngRoute"]);

app.config(function($routeProvider){
  $routeProvider
  .when("/",{
    templateUrl : "views/groceryList.html",
    controller : "GroceryListCtrl"
  })
  .when("/addItem",{
    templateUrl : "views/inputItem.html",
    controller : "GroceryListCtrl"
  })
  .when("/editItem/:id",{
    templateUrl : "views/inputItem.html",
    controller : "GroceryListCtrl"
  })

});

app.service("GroceryService",function(){
   var groceryService = {};
   groceryService.groceryItems = [];

   groceryService.save = function(entry){
     groceryService.groceryItems.push(entry);
     console.log(groceryService.groceryItems);
   };

   groceryService.delete = function(item){
    console.log(groceryService.groceryItems);
    console.log(item);
    for(i in groceryService.groceryItems){
      if(item.id == groceryService.groceryItems[i].id){
        index = i;
        break;
      }
    }
    console.log("index to remove :");
    groceryService.groceryItems.splice(index,1);
    console.log(groceryService.groceryItems);
   };

   groceryService.getNamneById = function(itemId){
    for(i in groceryService.groceryItems){
      if(itemId == groceryService.groceryItems[i].id){
        return groceryService.groceryItems[i].itemName;
        break;
      }
    }
   };

   groceryService.edit = function(itemId,name){
    console.log("In edit Service");
    console.log(groceryService.groceryItems);
    for(i in groceryService.groceryItems){
      if(itemId == groceryService.groceryItems[i].id){
        groceryService.groceryItems[i].itemName = name;
        break;
      }
    }

   };

   groceryService.createNewId = function(){
     console.log(groceryService.groceryItems.length)
     if(groceryService.groceryItems.length == 0){
       var id= 1;
       return id;
     }
     else{
       l = groceryService.groceryItems.length;
       prevId = groceryService.groceryItems[l-1].id;
       id = prevId+1;
       return id;
     }
   };

   return groceryService;
})

app.controller("GroceryListCtrl",["$scope","GroceryService","$location","$routeParams",function($scope,GroceryService,$location,$routeParams){
  console.log("In GroceryListCtrl");

  $scope.appTitle = "Grocery List";
  $scope.groceryItems = GroceryService.groceryItems;

  $scope.save = function(){
    if($routeParams.id != undefined){
      alert($routeParams.id);
      alert($scope.itemName)
      GroceryService.edit($routeParams.id,$scope.itemName);
      $scope.groceryItems = GroceryService.groceryItems;
    }
    else{
      groceryItem = {id:GroceryService.createNewId(),itemName:$scope.itemName,date:new Date()};
      console.log(groceryItem);
      GroceryService.save(groceryItem);
    }
  }
  if($routeParams.id != undefined){
    var name = GroceryService.getNamneById($routeParams.id);
    $scope.itemName = name;
  }

  $scope.delete = function(item){
      console.log(" in delete");
      GroceryService.delete(item);
  }

}]);
