angular.module('AddUp.Controllers')

  .controller('login',function($scope, $http, $state,$ionicLoading,$ionicPopup,$translate,ionicMaterialInk){



   $translate.use('en');
   localStorage.setItem('lang','en');
   $scope.checklang=function(lang){
    if(lang=='twi'){
   $translate.use('fr');
   localStorage.setItem('lang','twi');
 }
 if(lang=='en'){
  $translate.use('en');
  localStorage.setItem('lang','en');
 }
   }
  
//signin controller
    $scope.signin=function(username,password){
       
       if(username==null || isNaN(username)){
        showusername();
        return null;
       }
       if(password==null){
        showpassword();
        return null;
       }
       show();
      var path='https://api.parse.com/1/login?username='+ username+';password='+ password;
      
      
      $http.get(path)
        .success(function(response) {
          var session = response.sessionToken;
           $http.defaults.headers.get = { 'X-Parse-Application-Id' : 'sS32ldJqA5k8HxTTbgK6yRFEhnG1FVm2HXcgmd2W','X-Parse-REST-API-Key':'HqNZ4yd0VMGqTsZZiA7snuQQC3TkwfdXcA8UMgmf','X-Parse-Session-Token': session};
           $http.defaults.headers.post = { 'X-Parse-Application-Id' : 'sS32ldJqA5k8HxTTbgK6yRFEhnG1FVm2HXcgmd2W','X-Parse-REST-API-Key':'HqNZ4yd0VMGqTsZZiA7snuQQC3TkwfdXcA8UMgmf','X-Parse-Session-Token': session}
          localStorage.setItem('session',session);
          localStorage.setItem('username',username);
          getprofile();
        
        }
        )
        .error(function(){
         hide();
         showAlert();
        });
         
        

    }


       var getuserdata=function(){
    var datalink='http://api.AddUpafrica.com/In_Stock?where={"username":"'+ localStorage.getItem('username') +'"}';
    var data='https://api.parse.com/1/classes/In_Stock?where={"username":"'+ localStorage.getItem('username') +'"}';
     $http.get(data)
        .success(function(response) {
          var data=response.results[0].details;
          localStorage.setItem('response',data);
          hide();
          $state.go('home');
        }
        )
        .error(function(){
          hide();
          showAlert();
        });
      }

    $scope.gosign=function(){
      $state.go('signup');
    }

    var getprofile=function(){
        var profilelink='http://api.AddUpafrica.com/users?where={"username":"'+ localStorage.getItem('username') +'"}';
        var profilePath='https://api.parse.com/1/users?where={"username":"'+ localStorage.getItem('username') +'"}';
        $http.get(profilePath)
        .success(function(response) {
          localStorage.setItem('fullname',response.results[0].fullname);
          localStorage.setItem('business',response.results[0].Business);
          localStorage.setItem('location',response.results[0].location);
          getuserdata();
        })
      }
     var show = function() {
    $ionicLoading.show({
      template: '<span><ion-spinner icon="android" style="vertical-align:middle"></ion-spinner>Almost there...</span>'
    });
  };
  var hide = function(){
    $ionicLoading.hide();
  };


 var showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: "Couldn't Login !",
     template: 'Please check phone number and password '
   });

   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
 };
 var showusername = function() {
   var alertPopup = $ionicPopup.alert({
     title: "Couldn't Login !",
     template: 'Phone number required'
   });

   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
 };
  var showpassword = function() {
   var alertPopup = $ionicPopup.alert({
     title: "Couldn't Login !",
     template: 'Password required'
   });

   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
 };


  })

  //signup controller
    .controller('signup',function($scope, $http, $state, Restangular,$ionicPopup,$ionicLoading){

    $scope.signup=function(usernam,Fullname,business,Location,passwor,confirm){
      if(Fullname==null){
        signup('Enter Full name');
        return null;
        
      }else if(usernam==null || isNaN(usernam)){
        
        signup('Enter Phone number');
        return null;
      }
      else if(Location==null){
        signup('Enter Your Area or Town');
        return null;
      }
      else if(passwor==null){
        signup('Enter a password');
        return null;
      }
       else if(passwor!=confirm){
        signup('Confirm password');
        return null;
      }

     show();
    var baseAccounts = Restangular.all('1/users');
    var newAccount = {username: usernam,fullname:Fullname,Business:business,location:Location,password:passwor};
    baseAccounts.post(newAccount);

    var baseObjects = Restangular.all('1/classes/In_Stock');
    //creates new object in parse with empty store details json
    var startobject={"sold":[],"stock":[],"spent":[]};
    var toparse=JSON.stringify(startobject);
    var newObject = {username: usernam, details: toparse};
    baseObjects.post(newObject).then(function(){

      hide();
      $state.go('login');
    },function errorCallback(){
      hide();
      signup("Check Network Connectivity");
    });


    }

    var signup = function(error) {
   var alertPopup = $ionicPopup.alert({
     title: "Couldn't Create Account !",
     template: error 
   });

   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
 };

     $scope.golog=function(){
      $state.go('login');
    }

      var show = function() {
    $ionicLoading.show({
      template: '<span><ion-spinner icon="android" style="vertical-align:middle"></ion-spinner>Almost there...</span>'
    });
  };
  var hide = function(){
    $ionicLoading.hide();
  };

  })

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $ionicSideMenuDelegate , $state, $rootScope, $ionicPopup, $translate, $cordovaDialogs, $cordovaBarcodeScanner, $ionicHistory, $ionicLoading) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
    $scope.setId = function(index)
    {
      $scope.wid = index
    }
    $http.defaults.headers.get = { 'X-Parse-Application-Id' : 'sS32ldJqA5k8HxTTbgK6yRFEhnG1FVm2HXcgmd2W','X-Parse-REST-API-Key':'HqNZ4yd0VMGqTsZZiA7snuQQC3TkwfdXcA8UMgmf','X-Parse-Session-Token': localStorage.getItem('session')}
    $http.defaults.headers.post = { 'X-Parse-Application-Id' : 'sS32ldJqA5k8HxTTbgK6yRFEhnG1FVm2HXcgmd2W','X-Parse-REST-API-Key':'HqNZ4yd0VMGqTsZZiA7snuQQC3TkwfdXcA8UMgmf','X-Parse-Session-Token': localStorage.getItem('session')}
    if (localStorage.getItem("response") === null) {
     
     localStorage.setItem('response','{"sold":[],"stock":[],"spent":[],"loan": 0 ,"payments":[],"institute":""}');
     
      var d=new Date();
      localStorage.setItem('lastsync',d.getTime());
    }

  //check if you are login
    var checkloginstatus= function(){
     if(localStorage.getItem("session") === null)
     {
      $state.go('login');
     }
   }
    checkloginstatus();
//loginstatus
    $scope.logout=function(){
      show();
      logbackup();
          }
    var refresh=function(){
    var response=localStorage.getItem('response');
    
    $rootScope.sold=(angular.fromJson(response)).sold;
    $rootScope.stock=(angular.fromJson(response)).stock;
    $rootScope.spent=(angular.fromJson(response)).spent;
    checkloginstatus();
     }
  $scope.$on('$ionicView.enter',function(){
       
        refresh();
        drefresh();
        lastsync();

    });
   var lastsync=function(){
    var d=new Date();
    var previous=parseInt(localStorage.getItem("lastsync"));
     if(d.getTime() - previous > 7200000){
       backup();
       localStorage.setItem('lastsync',d.getTime());
     }
   }
  
   var backup=function(){
   
    var stock_link='http://api.addupafrica.com/In_Stock?where={"username":"'+localStorage.getItem('username')+'"}';
    var stock_path='https://api.parse.com/1/classes/In_Stock?where={"username":"'+localStorage.getItem('username')+'"}';
    $http.get(stock_path)
      .success(function(response) {
        var cloud=response.results[0].objectId;
        synccloud(cloud);
      })
      .error(function(){
       
      })
    }
    
    var synccloud=function(id){
      var synclink='http://api.addupafrica.com/In_Stock/'+id;
      var req = {
        method: 'PUT',
        url: 'https://api.parse.com/1/classes/In_Stock/'+id,
        headers: {
        'X-Parse-Application-Id' : 'sS32ldJqA5k8HxTTbgK6yRFEhnG1FVm2HXcgmd2W',
        'X-Parse-REST-API-Key':'HqNZ4yd0VMGqTsZZiA7snuQQC3TkwfdXcA8UMgmf',
        'X-Parse-Session-Token':   localStorage.getItem('session') 
          },
        data:{ 
         username : localStorage.getItem('username'),
         details : localStorage.getItem('response')}
       }
      $http(req).then(function(){}, function(){});
    }
    //sync for logout
    var logbackup=function(){
   
    var stock_link='http://api.addupafrica.com/In_Stock?where={"username":"'+localStorage.getItem('username')+'"}';
    var stock_path='https://api.parse.com/1/classes/In_Stock?where={"username":"'+localStorage.getItem('username')+'"}';
    $http.get(stock_path)
      .success(function(response) {
        var cloud=response.results[0].objectId;
        logsynccloud(cloud);
      })
      .error(function(){
        hide();
        showlogout();
      })
    }
    //sync for logout
    var logsynccloud=function(id){
      var synclink='http://api.addupafrica.com/In_Stock/'+id;
      var req = {
        method: 'PUT',
        url: 'https://api.parse.com/1/classes/In_Stock/'+id,
        headers: {
        'X-Parse-Application-Id' : 'sS32ldJqA5k8HxTTbgK6yRFEhnG1FVm2HXcgmd2W',
        'X-Parse-REST-API-Key':'HqNZ4yd0VMGqTsZZiA7snuQQC3TkwfdXcA8UMgmf',
        'X-Parse-Session-Token': localStorage.getItem('session')
          },
        data:{ 
         username : localStorage.getItem('username'),
         details : localStorage.getItem('response') }
       }
      $http(req).then(function(){ 
         revoke()

      }, function(){ 
        hide();
        showlogout();
      });
    }
    //delete session
    var revoke = function()
    {
        $http.post("https://api.parse.com/1/logout")
      .success(function(response) {
         $http.defaults.headers.get = { 'X-Parse-Application-Id' : 'sS32ldJqA5k8HxTTbgK6yRFEhnG1FVm2HXcgmd2W','X-Parse-REST-API-Key':'HqNZ4yd0VMGqTsZZiA7snuQQC3TkwfdXcA8UMgmf'};
         $http.defaults.headers.post = { 'X-Parse-Application-Id' : 'sS32ldJqA5k8HxTTbgK6yRFEhnG1FVm2HXcgmd2W','X-Parse-REST-API-Key':'HqNZ4yd0VMGqTsZZiA7snuQQC3TkwfdXcA8UMgmf'};
         localStorage.removeItem("session");
         localStorage.removeItem("username");
         checkloginstatus();
         hide()
        
      })
      .error(function(){
        hide();
        showlogout();
       
      })

    }
 
   var checkandadd=function(index,sellingprice,number){
     var count =0;
     var reach =0;//using as index of $rootScope.sold
     var stock_original_number=$rootScope.stock[index].number;


      var d=new Date();
      $rootScope.sold.push({"item":$rootScope.stock[index].item,"buy_price":$rootScope.stock[index].buy_price,"sell_price":sellingprice,"number":number,"year":d.getFullYear(),"month":d.getMonth(),"day":d.getDay(),"time":d.getTime()});
      
     // $rootScope.stock[index].number=stock_original_number;
     // $rootScope.sold[reach].number=1;
  
    saveMove();
   }
   

   var checkandundo=function(index){
      var count =0;
     var reach =0;//using as index of $rootScope.sold
     angular.forEach($rootScope.stock,function(value,key){
         
     if($rootScope.stock[reach].item==$rootScope.sold[index].item)
      {
        count=1;
        $rootScope.stock[reach].number=$rootScope.stock[reach].number + $rootScope.sold[index].number;
       }
       reach=reach+1;
     });
    
    if(count==0){
      var d=new Date();
      $rootScope.stock.push({"item":$rootScope.sold[index].item,"buy_price":$rootScope.sold[index].buy_price,"sell_price":$rootScope.sold[index].sell_price,"number":$rootScope.sold[index].number,"year":d.getFullYear(),"month":d.getMonth(),"day":d.getDay(),"time":d.getTime()});
     
    }
    saveMove();
   }
     $scope.move_to_sold=function(index,sellingprice,number){

   if (typeof $rootScope.stock[index] == 'undefined'){

       return null;
   }
    if($rootScope.stock[index].number==1){
      
        checkandadd(index,sellingprice,number);
        $rootScope.stock.splice(index,1);
        saveMove();
        
      }
      else{
        $rootScope.stock[index].number=($rootScope.stock[index].number)-number;
        checkandadd(index,sellingprice,number);
      }
      if($rootScope.stock[index].number==0){
  
        $rootScope.stock.splice(index,1);
        saveMove();
        
      }
     
   
  };
  $scope.move_to_instock=function(index)
  {
    checkandundo(index);
   $rootScope.sold.splice(index,1);
   saveMove()
    };
  //display add modal
    $scope.Add = function(index,item,price) {
    $scope.modal.show();
    $scope.edit_price=price;
    $scope.editItemNo=index;
    $scope.edit_username=item;
  };
   //display sell modal
  $scope.Sell = function() {
    $scope.sellmodal.show();
  
  };
  $scope.wid=1;
  $scope.toShelf = function(){
    $state.go('instock')
  } 
//important function.Updates localstorage with changes.
    var saveMove= function(){
        var sresponse=localStorage.getItem('response');
        var replace=angular.fromJson(sresponse);
        replace.sold=$rootScope.sold;
        replace.stock=$rootScope.stock;
        replace.spent=$rootScope.spent;
        localStorage.setItem('response',(angular.toJson(replace)));
    }

    $scope.shouldShowDelete = false;
    $scope.listCanSwipe = true;
    $ionicSideMenuDelegate.canDragContent(false);

  // add to inventory modal
  $ionicModal.fromTemplateUrl('templates/add.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

 //sell modal
  $ionicModal.fromTemplateUrl('templates/sell.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.sellmodal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeEdit = function() {
    $scope.edit_username="";
    $scope.edit_price="";
    $scope.modal.hide();
    refresh();
  };

    $scope.closeSell = function() {

    $scope.sellmodal.hide();
    refresh();
  };

    $scope.edit_username="item";
    $scope.edit_price="price";

  $scope._edit = function(indexf,itemf,Buy_pricef,Sell_pricef,numberf) {
    $state.go('edit/:index/:item/:buy_price/:sell_price/:number',{index:indexf,item:itemf,buy_price:Buy_pricef,sell_price:Sell_pricef,number:numberf});
  };


  $scope.saveEdit=function(index,item,price,number){
     $rootScope.stock[index].item=item;
     $rootScope.stock[index].price=price;
     $rootScope.stock[index].number=number;
      saveMove();
      $scope.closeEdit();
  }

 $scope.delete=function(index){
      var sresponse=localStorage.getItem('response');
      var replace=angular.fromJson(sresponse);
      replace.stock.splice(index,1);
      localStorage.setItem('response',(angular.toJson(replace)));
      $scope.closeEdit();

  }
   $scope.new=function(product,buy_price,sell_price,number){
      
      if(product==null || product==''){
        newerror("Enter item name");
        return null;
      }
    
      if(isNaN(buy_price)||buy_price<0){
        newerror("Enter the price you bought an item for");
         return null;
      }
      if(number<0||number==null || number==''||isNaN(number)||number % 1 != 0){
        newerror("Enter the number you have");
        return null;
      }
      var sresponse=localStorage.getItem('response');
      var replace=angular.fromJson(sresponse);
      var d=new Date();
      var itemCost=(buy_price/number).toFixed(4);;
      replace.stock.push({item: product , buy_price: itemCost , sell_price: 0 ,number: number,year: d.getFullYear(), month: d.getMonth(),day: d.getDay(), time: d.getTime()});
      localStorage.setItem('response',(angular.toJson(replace)));
      $rootScope.stock=replace.stock;
      $rootScope.sold=replace.sold;
      drefresh();
      $scope.closeEdit();
      return true;
    }
  $scope.go_to_report=function(indexf){
    $state.go('single/:index',{index:indexf})
  }
  $scope.go_to_invent=function(indexf){
    $state.go('singleinvent/:index',{index:indexf})
  }
   $scope.go_to_sold_detail=function(indexf){
    $state.go('singlesold/:index',{index:indexf})
  }

  // Triggered on a button click, or some other target
$scope.showPopup = function(index) {
  $scope.data = {};

  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: '<input placeholder="How many did you sell" type="number" ng-model="data.numberOfItems"><input placeholder="Selling Price" type="number" ng-model="data.sellingprice">',
    title: 'Make A Sale',
    subTitle: '',
    scope: $scope,
    buttons: [
      { text: 'Stop' },
      {
        text: '<b>Sell</b>',
        type: 'button-calm',
        onTap: function(e) {
          if (!$scope.data.numberOfItems) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            var limit=$rootScope.stock[index].number;
            for(i=0;i<$scope.data.numberOfItems;i++){
              if(i<limit){
                $scope.move_to_sold(index,$scope.data.sellingprice);
               }
            
           
          }
          $state.go('app.instock');
          }
        }
      }
    ]
  });

}


$scope.showPopdown = function(index) {
  $scope.data = {};

  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: '<input type="number" ng-model="data.numberOfItems">',
    title: 'Amount',
    subTitle: 'Please enter the number you took back',
    scope: $scope,
    buttons: [
      { text: 'Stop' },
      {
        text: '<b>Undo</b>',
        type: 'button-assertive',
        onTap: function(e) {
          if (!$scope.data.numberOfItems) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            var limit=$rootScope.sold[index].number;
            for(i=0;i<$scope.data.numberOfItems;i++){
              if(i<limit){
            $scope.move_to_instock(index);
            }
          }
          $state.go('sold');
          }
        }
      }
    ]
  });

}

$scope.spent = function(index) {
  $scope.data = {};

  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: '<input type="number" min="0" ng-model="data.amount" placeholder="Amount"><br><input type="text" ng-model="data.onWhat" placeholder="On What" >',
    title: 'I Just spent',
    subTitle: 'How much did you spend',
    scope: $scope,
    buttons: [
      { text: 'Stop' },
      {
        text: '<b>Add</b>',
        type: 'button-assertive',
        onTap: function(e) {
          if (!$scope.data.amount) {
            //don't allow the user to close unless he enters wifi password
            

            e.preventDefault();
          } else {

           var d= new Date();
           $rootScope.spent.push({"onWhat":$scope.data.onWhat,"amount":$scope.data.amount});
           saveMove()
          }
        }
      }
    ]
  });

}
  $scope.go_to_editProfile = function(phonef,businessf) {
    $state.go('profileEdit/:phone/:business',{phone:phonef,business:businessf});
  };

   $scope.deletesold=function(index){
      var sresponse=localStorage.getItem('response');
      var replace=angular.fromJson(sresponse);
      replace.sold.splice(index,1);
      localStorage.setItem('response',(angular.toJson(replace)));
      var response=localStorage.getItem('response');
      $rootScope.sold=(angular.fromJson(response)).sold;
      $rootScope.stock=(angular.fromJson(response)).stock;
      $state.go('sold')
  }

 var newerror = function(error) {
   var alertPopup = $ionicPopup.alert({
     title: "Couldn't Add Item !",
     template: error 
   });

   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
 };

 $scope.sales=function(){
   $state.go('sold');
  }

   $scope.inventory=function(){
   $state.go('shelf');
  }

   $scope.expense=function(){
   $state.go('spent');
  }

   $scope.report=function(){
   $state.go('report');
  }

  $scope.nsell1 = function(index){
  
  $cordovaDialogs.prompt('Quantity you sold', 'Make A Sale', ['Cancel','Sell'], ' ')
    .then(function(result) {
   
      // no button = 0, 'OK' = 1, 'Cancel' = 2
    if(result.buttonIndex==2 && !isNaN(result.input1)){
      $scope.nsell2(index,result.input1)
     }

    if(result.buttonIndex==2 && isNaN(result.input1)){
      nalert()
     }
     
    });

  }

   $scope.nsell2 = function(index,number){
  
  $cordovaDialogs.prompt('Selling Price', 'Make A Sale', ['Cancel','Done'], ' ')
    .then(function(result) {
     
      if(result.buttonIndex==2 && !isNaN(result.input1)){
        var limit=$rootScope.stock[index].number;
            for(i=0;i<number;i++){
              if(i<limit){
                $scope.move_to_sold(index,result.input1);
               }
             }
           }

    if(result.buttonIndex==2 && isNaN(result.input1)){
      nalert()
     }
    });

  
}

  $scope.msell = function(index,quantity,price){
  
  if(!isNaN(quantity) && !isNaN(price)){
        var limit=$rootScope.stock[index].number;
            if(quantity<limit+1){
                $scope.move_to_sold(index,price,quantity);
           }
           else{
            msellalert();
           }
           }

    if(isNaN(quantity) || isNaN(price)){
      nalert()
     }
   
    $scope.closeSell();
  }

$scope.nundo = function(index){
   $cordovaDialogs.confirm('You are about to undo this sale', 'Undo A Sale', ['Cancel','Undo'])
    .then(function(buttonIndex) {
   // no button = 0, 'OK' = 1, 'Cancel' = 2
    if(buttonIndex==2){
     $scope.move_to_instock(index);
     // $state.go('performance');
    } 
  });
  }



  var nalert = function(){
    $cordovaDialogs.alert('Please enter a number', 'Check Entry', 'OK')
    .then(function() {
      // callback success
    });
  }

    var msellalert = function(){
    $cordovaDialogs.alert('You do not have that quantity', 'Check Entry', 'OK')
    .then(function() {
      // callback success
    });
  }
  // beep 3 times
  $scope.barscan = function(){
     $cordovaBarcodeScanner
      .scan()
      .then(function(barcodeData) {
        // Success! Barcode data is here
      }, function(error) {
        // An error occurred
      });
  }
  var showlogout = function() {
      var alertPopup = $ionicPopup.alert({
        title: "Couldn't Logout !",
        template: 'Check Internet Connectivity'
      });
      alertPopup.then(function(res) {
        console.log('Alert Closed');
      });
    };
   var show = function() {
      $ionicLoading.show({
        template: '<span><ion-spinner icon="android" style="vertical-align:middle"></ion-spinner>See You Later</span>'
      });

    };
    //hide loading modal
    var hide = function(){
      $ionicLoading.hide();
    };

 var dsales=function(){
     var index=0;
     var amount=0;
    angular.forEach($rootScope.sold,function(value,key){
         
     amount=amount + ($rootScope.sold[index].sell_price - 0) - 0;
      
       index=index+1;
     });
     return (amount).toFixed(4);

  }

  var dstock=function(){
     var index=0;
     var amount=0;
    angular.forEach($rootScope.stock,function(value,key){
         
     amount=amount + ($rootScope.stock[index].buy_price * $rootScope.stock[index].number) - 0;
      
       index=index+1;
     });
     return (amount).toFixed(4);


  }
  var dspent=function(){
     var index=0;
     var amount=0;
    angular.forEach($rootScope.spent,function(value,key){
         
     amount= ((amount - 0 ) + ( $rootScope.spent[index].amount - 0 ) - 0);
      
       index=index+1;
     });
     return (amount).toFixed(4);


  }



  $scope.dsales="Wait a sec";
  $scope.dstock="Wait a sec";
  $scope.dspent="Wait a sec";


  var drefresh=function(){
     
      $scope.dsales=dsales();
      $scope.dstock=dstock();
      $scope.dspent=dspent();
  }

  $scope.balance=function(){
    var value= ($scope.dsales - $scope.dspent) - 0;
    if(value<0)
    {
      return 0;
    }
    else
    {
      return value;
    }
  }

  $scope.goHome = function(){
    
     $ionicHistory.goBack(-4);
  }

  $scope.profit = function()
  {
  var index=0;
  var amount=0;
 angular.forEach($rootScope.sold,function(value,key){
         
     amount=amount+ ($rootScope.sold[index].sell_price-($rootScope.sold[index].buy_price*$rootScope.sold[index].number));
      
       index=index+1;
     });
     var total= amount - spent();
     return (total).toFixed(4);
  }

   var spent=function(){
     var index=0;
     var amount=0;
    angular.forEach($rootScope.spent,function(value,key){
         
     amount= ((amount - 0 ) + ( $rootScope.spent[index].amount - 0 ) - 0);
      
       index=index+1;
     });
     return (amount).toFixed(4);



  }

})




.controller('Edit', function($scope,$stateParams,$rootScope,$state,$ionicPopup,$ionicHistory) {
 

 $scope.item=$stateParams.item ;
 $scope.buy_price=$stateParams.buy_price - 0;
 $scope.sell_price=$stateParams.sell_price - 0;
 $scope.number=$stateParams.number - 0;
   $scope.saveEdit=function(item,buy_price,sell_price,number){
     if(item==null || item==''){
        newerror("Enter item name");
        return null;
      }
    
      if(isNaN(buy_price||buy_price<0)){
        newerror("Enter the price you bought an item for");
         return null;
      }
      if(number<0||number==null || number==''||isNaN(number)||number % 1 != 0){
        newerror("Enter the number you have");
        return null;
      }
     $rootScope.stock[$stateParams.index].item=item;
     $rootScope.stock[$stateParams.index].buy_price=(buy_price/number).toFixed(4);
     $rootScope.stock[$stateParams.index].sell_price=sell_price;
     $rootScope.stock[$stateParams.index].number=number;
      saveMove();
  }

  var saveMove= function(){
        var sresponse=localStorage.getItem('response');
        var replace=angular.fromJson(sresponse);
        replace.sold=$rootScope.sold;
        replace.stock=$rootScope.stock;
        localStorage.setItem('response',(angular.toJson(replace)));
        $ionicHistory.goBack(-1)
    }

 $scope.delete=function(){
      var sresponse=localStorage.getItem('response');
      var replace=angular.fromJson(sresponse);
      replace.stock.splice($stateParams.index,1);
      localStorage.setItem('response',(angular.toJson(replace)));
      var response=localStorage.getItem('response');
      $rootScope.sold=(angular.fromJson(response)).sold;
      $rootScope.stock=(angular.fromJson(response)).stock;
      $ionicHistory.goBack(-1)
  }

var newerror = function(error) {
   var alertPopup = $ionicPopup.alert({
     title: "Couldn't Edit Item !",
     template: error 
   });

   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
 };
  
  $scope.goHome = function(){
     
     $ionicHistory.goBack(-4);
  }

})  

.controller('Report', function($scope,$rootScope,$state,$ionicHistory) {

 var profit = function()
  {
  var index=0;
  var amount=0;
 angular.forEach($rootScope.sold,function(value,key){
         
     amount=amount+ ($rootScope.sold[index].sell_price-($rootScope.sold[index].buy_price*$rootScope.sold[index].number));
      
       index=index+1;
     });
     var total= amount - spent();
     return (total).toFixed(4);
  }

   var soldcost = function()
  {
  var index=0;
  var amount=0;
 angular.forEach($rootScope.sold,function(value,key){
         
     amount=amount+ ($rootScope.sold[index].buy_price*$rootScope.sold[index].number);
      
       index=index+1;
     });
     
     return (amount).toFixed(4);
  }

  var sales=function()
  {
     var index=0;
     var amount=0;
    angular.forEach($rootScope.sold,function(value,key){
         
     amount=amount + ($rootScope.sold[index].sell_price - 0) - 0;
      
       index=index+1;
     });
     return (amount).toFixed(4);

  }

  var stock=function()
  {
     var index=0;
     var amount=0;
    angular.forEach($rootScope.stock,function(value,key){
         
     amount=amount + ($rootScope.stock[index].buy_price * $rootScope.stock[index].number) - 0;
      
       index=index+1;
     });
     return (amount).toFixed(4);


  }
  var spent=function(){
     var index=0;
     var amount=0;
    angular.forEach($rootScope.spent,function(value,key){
         
     amount= ((amount - 0 ) + ( $rootScope.spent[index].amount - 0 ) - 0);
      
       index=index+1;
     });
     return (amount).toFixed(4);



  }
  
  $scope.profit="Wait a sec";
  $scope.sales="Wait a sec";
  $scope.stock="Wait a sec";
  $scope.spent="Wait a sec";
  $scope.soldcost = "Wait a sec"

  var refresh=function()
  {
      $scope.profit=profit();
      $scope.sales=sales();
      $scope.stock=stock();
      $scope.spent=spent();
      $scope.soldcost=soldcost();
  }
 $scope.$on('$ionicView.enter',function( scopes, states){


    refresh();
  

})

  $scope.go_to_spent = function() {
    $state.go('spent');
  }

   $scope.go_to_performance = function() {
    $state.go('performance');
  }

  $scope.go_to_reset = function() {
    $state.go('reset');
  };

  $scope.goHome = function(){
     $state.go('home');
     $ionicHistory.goBack(-4);
  }

  $scope.balance=function(){
    var value= ($scope.sales - $scope.spent) - 0;
    if(value<0)
    {
      return 0;
    }
    else
    {
      return value;
    }
  }

   $scope.loans=function(){
   $state.go('loans');
  }

})

.controller('Single', function($scope,$rootScope,$stateParams,$state,$ionicHistory) {

 $scope.position = $stateParams.index;
 $scope.product = $rootScope.stock[$stateParams.index];
 var cost = $rootScope.stock[$stateParams.index].buy_price*$rootScope.stock[$stateParams.index].number;
 $scope.cost = (cost).toFixed(4);

 $scope.goHome = function(){
     $state.go('home');
     $ionicHistory.goBack(-4);
  }


})

.controller('singleSold', function($scope,$rootScope,$stateParams,$state,$ionicHistory) {

  $scope.position=$stateParams.index;
 $scope.product=$rootScope.sold[$stateParams.index];
 var profit=$rootScope.sold[$stateParams.index].sell_price-($rootScope.sold[$stateParams.index].buy_price*$rootScope.sold[$stateParams.index].number);
 $scope.profit=(profit).toFixed(4)
  $scope.goHome = function(){
     $state.go('home');
     $ionicHistory.goBack(-4);
  }
})

.controller('Profile', function($scope, $stateParams, $http,$timeout, ionicMaterialMotion, ionicMaterialInk,$state,$ionicHistory) {
     $scope.username=localStorage.getItem('fullname');
     $scope.phone=localStorage.getItem('username');
     $scope.business=localStorage.getItem('business');

     $scope.goHome = function(){
     $state.go('home');
     $ionicHistory.goBack(-4);
  }

})

.controller('performance', function($scope,$state,$rootScope,$ionicHistory) {
 
 var drawpie=function(){
  var index=0;
  $scope.labels=[];
  $scope.data=[];
  $scope.profit=[];
  $scope.topsales=$rootScope.sold;

  angular.forEach($rootScope.sold,function(value,key){

    $scope.labels.push($rootScope.sold[index].item);
    $scope.data.push(($rootScope.sold[index].sell_price * $rootScope.sold[index].number).toFixed(4));
    $scope.profit.push(($rootScope.sold[index].sell_price-($rootScope.sold[index].buy_price*$rootScope.sold[index].number)).toFixed(4));
       index=index+1;

     });
 $scope.uselabels=$scope.labels;
 $scope.usedata=$scope.data;
 $scope.useprofit=$scope.profit;
  }
   $scope.$on('$ionicView.enter',function( scopes, states){drawpie();});


   $scope.goHome = function(){
     $state.go('home');
     $ionicHistory.goBack(-4);
  }


}) 

.controller('spent', function($scope, $state, $rootScope, $ionicPopup, $cordovaDialogs ,$ionicHistory, $ionicModal) {
 $scope.spending=$rootScope.spent;

 $scope.$on('$ionicView.enter',function( )
  {
   drefresh()
  })

  var saveMove= function(){
        var sresponse=localStorage.getItem('response');
        var replace=angular.fromJson(sresponse);
        replace.sold=$rootScope.sold;
        replace.stock=$rootScope.stock;
        replace.spent=$rootScope.spent;
        localStorage.setItem('response',(angular.toJson(replace)));
         drefresh()
    }

  $scope.delex=function(index){
     $rootScope.spent.splice(index,1);
      drefresh();
      saveMove();
      }

  $ionicModal.fromTemplateUrl('templates/expense.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.expensemodal = modal;
  });

  $scope.show =function()
  {
    $scope.expensemodal.show();
  }

  $scope.hide = function()
  {
    $scope.expensemodal.hide();
  }

$scope.expense = function(index) {
  $scope.data = {};

  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: '<input type="number" min="0" ng-model="data.amount" placeholder="Amount"><br><input type="text" ng-model="data.onWhat" placeholder="On What" >',
    title: 'I Just spent',
    subTitle: 'How much did you spend',
    scope: $scope,
    buttons: [
      { text: 'Stop' },
      {
        text: '<b>Add</b>',
        type: 'button-assertive',
        onTap: function(e) {
          if (!$scope.data.amount) {
            //don't allow the user to close unless he enters wifi password
            

            e.preventDefault();
          } else {

           var d= new Date();
           $rootScope.spent.push({"onWhat":$scope.data.onWhat,"amount":$scope.data.amount});
           saveMove();
          }
        }
      }
    ]
  });

}

$scope.nexpense1 = function(){
   $cordovaDialogs.prompt('How much did you spent ?', 'Expense', ['Cancel','OK'], ' ')
    .then(function(result) {
   
      // no button = 0, 'OK' = 1, 'Cancel' = 2
    if(result.buttonIndex==2 && !isNaN(result.input1)){
       nexpense2(result.input1)
     }

    if(result.buttonIndex==2 && isNaN(result.input1)){
      nalert()
     }
     
    });
}

  var nalert = function()
  {
    $cordovaDialogs.alert('Please enter a number', 'Check Entry', 'OK')
    .then(function() {
      // callback success
    });
  }

var nexpense2 = function(amount)
{
   $cordovaDialogs.prompt('What did you spend it on ?', 'Expense', ['Cancel','Done'], ' ')
    .then(function(result) {
   
      // no button = 0, 'OK' = 1, 'Cancel' = 2
    if(result.buttonIndex==2 ){
      var d= new Date();
      $rootScope.spent.push({"onWhat":result.input1,"amount":amount});
      saveMove()
     }
   });
  }
$scope.mexpense = function(amount,expense)
{

     if(!isNaN(amount))
     {
       var d= new Date();
      $rootScope.spent.push({"onWhat":expense,"amount":amount});
      saveMove();
      $scope.hide()
     }

    if(isNaN(amount))
    {
      nalert();
      $scope.hide
    }
}
var dsales=function(){
     var index=0;
     var amount=0;
    angular.forEach($rootScope.sold,function(value,key){
         
     amount=amount + ($rootScope.sold[index].sell_price - 0) - 0;
      
       index=index+1;
     });
     return (amount).toFixed(4);

  }

  var dstock=function(){
     var index=0;
     var amount=0;
    angular.forEach($rootScope.stock,function(value,key){
         
     amount=amount + ($rootScope.stock[index].buy_price * $rootScope.stock[index].number) - 0;
      
       index=index+1;
     });
     return (amount).toFixed(4);


  }
  var dspent=function(){
     var index=0;
     var amount=0;
    angular.forEach($rootScope.spent,function(value,key){
         
     amount= ((amount - 0 ) + ( $rootScope.spent[index].amount - 0 ) - 0);
      
       index=index+1;
     });
     return (amount).toFixed(4);


  }



  $scope.dsales="Wait a sec";
  $scope.dstock="Wait a sec";
  $scope.dspent="Wait a sec";


  var drefresh=function(){
     
      $scope.dsales=dsales();
      $scope.dstock=dstock();
      $scope.dspent=dspent();
  }

  $scope.goHome = function(){
     $state.go('home');
     $ionicHistory.goBack(-4);
  }
}) 



.controller('reset', function($scope,$state,$rootScope,$ionicActionSheet,$ionicHistory,$cordovaDialogs) {
 

  var saveMove= function(){
        var sresponse=localStorage.getItem('response');
        var replace=angular.fromJson(sresponse);
        replace.sold=$rootScope.sold;
        replace.stock=$rootScope.stock;
        replace.spent=$rootScope.spent;
        replace.loan=$rootScope.loan;
        replace.payments=$rootScope.payments;
        replace.institute=$rootScope.institute;
        localStorage.setItem('response',(angular.toJson(replace)));
    }
var resetstock=function(){
        var sresponse=localStorage.getItem('response');
        var replace=angular.fromJson(sresponse);
        replace.sold=$rootScope.sold;
        $rootScope.stock=[];
        replace.stock=$rootScope.stock;
        localStorage.setItem('response',(angular.toJson(replace)));

}
$scope.nrstock = function(index){
   $cordovaDialogs.confirm('You are about to reset inventory', 'Reset Inventory', ['Yes','NO'])
    .then(function(buttonIndex) {
   // no button = 0, 'OK' = 1, 'Cancel' = 2
    if(buttonIndex==1){
     resetstock();
     // $state.go('performance');
    } 
  });
  }
var resetsold=function(){
        var sresponse=localStorage.getItem('response');
        var replace=angular.fromJson(sresponse);
        $rootScope.sold=[];
        replace.sold=$rootScope.sold;
        replace.stock=$rootScope.stock;
        localStorage.setItem('response',(angular.toJson(replace)));

}
$scope.nrsold = function(index){
   $cordovaDialogs.confirm('You are about to reset all sales', 'Reset All Sale', ['Yes','NO'])
    .then(function(buttonIndex) {
   // no button = 0, 'OK' = 1, 'Cancel' = 2
    if(buttonIndex==1){
    resetsold();
     // $state.go('performance');
    } 
  });
  }

var resetspent=function(){
        var sresponse=localStorage.getItem('spent');
        var replace=angular.fromJson(sresponse);
        $rootScope.spent=[];
        replace=$rootScope.spent;
        saveMove()
}
$scope.nrspent = function(index){
   $cordovaDialogs.confirm('You are about to reset expenditure', 'Reset All Expenses', ['Yes','NO'])
    .then(function(buttonIndex) {
   // no button = 0, 'OK' = 1, 'Cancel' = 2
    if(buttonIndex==1){
     resetspent();
     // $state.go('performance');
    } 
  });
  }

  $scope.nrloans = function(index){
   $cordovaDialogs.confirm('You are about to reset expenditure', 'Reset All Expenses', ['Yes','NO'])
    .then(function(buttonIndex) {
   // no button = 0, 'OK' = 1, 'Cancel' = 2
    if(buttonIndex==1){
     resetloans();
     // $state.go('performance');
    } 
  });
  }
  var resetloans=function(){
        var sresponse1=localStorage.getItem('loan');
        var sresponse2=localStorage.getItem('payments');
        var sresponse3=localStorage.getItem('institute');
        var replace1=sresponse1;
        var replace2=angular.fromJson(sresponse2);
        var replace3=sresponse3;
        $rootScope.loan= 0 ;
        $rootScope.payments=[];
        $rootScope.institute="";
        replace1=$rootScope.loan;
        replace2=$rootScope.payments;
        replace3=$rootScope.institute;
        saveMove()
}

var resetall=function(){
      resetstock();
      resetsold();
      resetspent();
      resetloans();
}
$scope.nrall = function(index){
   $cordovaDialogs.confirm('You are about to reset everything', 'Reset Everything', ['Yes','NO'])
    .then(function(buttonIndex) {
   // no button = 0, 'OK' = 1, 'Cancel' = 2
    if(buttonIndex==1){
    resetall();
     // $state.go('performance');
    } 
  });
  }

$scope.showstock = function() {

   // Show the action sheet
   var hideSheet1 = $ionicActionSheet.show({
     buttons: [
       
      
     ],
     
     titleText: 'Clear all Stock',
     cancelText: 'NO',
     destructiveText: '<b>YES</b>',

     cancel: function() {
          // add cancel code..
        },
     destructiveButtonClicked: function(index) {
       resetstock();
       return true;
     }
   });

}
$scope.showsold = function() {

   // Show the action sheet
   var hideSheet2 = $ionicActionSheet.show({
     buttons: [
      
      
     ],
     
     titleText: 'Clear everything sold',
     cancelText: 'NO',
      destructiveText: '<b>YES</b>',
     cancel: function() {
          // add cancel code..
        },
     destructiveButtonClicked: function(index) {
       resetsold();
       return true;
     }
   });

}
$scope.showspent = function() {

   // Show the action sheet
   var hideSheet3 = $ionicActionSheet.show({
     buttons: [
       
      
     ],
     
     titleText: 'Clear all expenses',
     cancelText: 'NO',
     destructiveText: '<b>YES</b>',
     cancel: function() {
          // add cancel code..
        },
     destructiveButtonClicked: function(index) {
       resetspent();
       return true;
     }
   });

}
$scope.showall = function() {

   // Show the action sheet
   var hideSheet4 = $ionicActionSheet.show({
     buttons: [
      
      
     ],
     
     titleText: 'Clear everything',
     cancelText: 'NO',
      destructiveText: '<b>YES</b>',
     cancel: function() {
          // add cancel code..
        },
     destructiveButtonClicked: function(index) {
       resetall();
       return true;
     }
   });

}
$scope.goHome = function(){
     $state.go('home');
     $ionicHistory.goBack(-4);
  }

})


.controller('home', function($scope,$state,$ionicHistory) {

  $scope.sales=function(){
   $state.go('instock');
  }

   $scope.inventory=function(){
   $state.go('shelf');
  }

   $scope.expense=function(){
   $state.go('spent');
  }
   $scope.report=function(){
   $state.go('report');
  }   

 

  })


.controller('Loans',function($scope,$ionicModal,$rootScope){

 var response=localStorage.getItem('response');
 $scope.institute=(angular.fromJson(response)).institute;
 $scope.amount =(angular.fromJson(response)).loan;
 $scope.payments =(angular.fromJson(response)).payments;
 $scope.$on('$ionicView.enter',function(){
       
 var response=localStorage.getItem('response');
 $scope.institute=(angular.fromJson(response)).institute;
 $scope.amount =(angular.fromJson(response)).loan;
 $scope.payments =(angular.fromJson(response)).payments;

    });

 $ionicModal.fromTemplateUrl('templates/addloan.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.addmodal = modal;
  });

   $ionicModal.fromTemplateUrl('templates/editinstitute.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.editinstitute = modal;
  });

   $ionicModal.fromTemplateUrl('templates/payloan.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.paymodal = modal;
  });

 $scope.saveinstitute= function(name){
  $scope.institute = name;
  saveMove();
  $scope.hidebank();
 }
  $scope.add = function (){
    $scope.addmodal.show();
  }


   $scope.bank = function (){
    $scope.editinstitute.show();
  }

   $scope.hidebank = function (){
    $scope.editinstitute.hide();
  }

  $scope.pay = function (){
    $scope.paymodal.show();
  }

    $scope.hide = function (){
    $scope.addmodal.hide();
  }

   $scope.hidepay = function (){
    $scope.paymodal.hide();
  }

  $scope.loan = function(amt){
    if(!isNaN(amt)){
   $scope.amount= ($scope.amount -0 ) + (amt - 0);
   $scope.addmodal.hide();
   saveMove();
 }
  }
   $scope.payloan = function(amt){
    if(!isNaN(amt)){
      
   $scope.amount= ($scope.amount -0 ) - (amt - 0);
   if($scope.amount<0){
    $scope.amount=0;
   }
  if($scope.amount>0){
    var d=new Date();
   $scope.payments.push({amount:amt,date:d.getTime()})
   $scope.paymodal.hide();
   
   }
   saveMove();
 
 }
  }
 var saveMove= function(){
        var sresponse=localStorage.getItem('response');
        var replace=angular.fromJson(sresponse);
        replace.loan=$scope.amount;
        replace.payments=$scope.payments
        replace.institute=$scope.institute;
        localStorage.setItem('response',(angular.toJson(replace)));
    } 
})