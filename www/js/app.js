// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('addUp', ['ionic', 'AddUp.Controllers','ngCordova','ionic-native-transitions'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
   // $cordovaSplashscreen.hide();
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider, RestangularProvider,
   $translateProvider, $ionicConfigProvider, $ionicHistoryProvider) {
  
$ionicConfigProvider.scrolling.jsScrolling(false);

  $stateProvider

    .state('login', {
      url: '/login',
      nativeTransitions: {
        "type": "flip",
        "direction": "left"},
      templateUrl: 'templates/login.html',
      controller: 'login',  
    })

    .state('signup', {
      url: '/signup',
       nativeTransitions: {
        "type": "flip",
        "direction": "right"},
      templateUrl: 'templates/signup.html',
      controller: 'signup',
     
    })
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl',  
})

  .state('instock', {
      url: '/instock',
      templateUrl: 'templates/instock.html',
      controller:'AppCtrl',
    })

   .state('shelf', {
      url: '/shelf',
      templateUrl: 'templates/shelf.html',
      controller:'AppCtrl',
    })

  .state('sold', {
      url: '/sold',
      templateUrl: 'templates/sold.html',
      controller:'AppCtrl',
    })

   .state('soldservice', {
      url: '/soldservice',
      templateUrl: 'templates/sold-service.html',
      controller:'AppCtrl',
    })

    .state('report', {
      url: '/report',
      templateUrl: 'templates/report.html',
      controller: 'Report'
      
    })
 .state('single/:index', {
      url: '/single/:index',
      templateUrl: 'templates/singleproduct.html',
      controller: 'Single'
       
    })
 .state('singleinvent/:index', {
      url: '/singleinvent/:index',
      templateUrl: 'templates/singleinventory.html',
      controller: 'Single'
       
    })

  .state('singlesold/:index', {
      url: '/singlesold/:index',
      templateUrl: 'templates/singlesold.html',
      controller: 'singleSold'
      
    })
 .state('edit/:index/:item/:buy_price/:sell_price/:number', {
      url: '/edit/:index/:item/:buy_price/:sell_price/:number',
      templateUrl: 'templates/edit.html',
      controller: 'Edit'
       
    })
  .state('profile', {
    url: '/profile',
    templateUrl: 'templates/profile.html',
    controller: 'Profile'
     
  })
   .state('profileEdit/:phone/:business', {
      url: '/editprofile/:phone/:business',
      templateUrl: 'templates/editprofile.html',
          controller: 'editProfile'
        
    })
     .state('password', {
      url: '/password',
      templateUrl: 'templates/password.html',
      controller: 'password'
       
    })
    .state('performance', {
      url: '/performance',
      templateUrl: 'templates/performance.html',
      controller: 'Report'
        
    })
     .state('spent', {
      url: '/spent',
      templateUrl: 'templates/spent.html',
      controller: 'spent'
       
    })
     .state('howto', {
      url: '/howto',
      templateUrl: 'templates/howto.html',
      controller: 'howto'
        
    })
    .state('tips', {
        url: '/tips',
        templateUrl: 'templates/tips.html',
        controller: 'tips'       
    }) 
    .state('reset', {
        url: '/reset',
        templateUrl: 'templates/reset.html',
        controller: 'reset'      
    })
      .state('home', {
        url: '/home',
        templateUrl: 'templates/homemenu.html',
        controller: 'AppCtrl'
       
    })
     .state('service', {
        url: '/service',
        templateUrl: 'templates/homemenu-service.html',
        controller: 'AppCtrl'       
    })
     .state('loans', {
        url: '/loans',
        templateUrl: 'templates/loans.html',
        controller: 'Loans'      
    })
    .state('bank', {
        url: '/bank',
        templateUrl: 'templates/bank.html',
        controller: 'bank'      
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');
   RestangularProvider.setBaseUrl('https://api.parse.com');
   RestangularProvider.setDefaultHeaders({'X-Parse-Application-Id': 'sS32ldJqA5k8HxTTbgK6yRFEhnG1FVm2HXcgmd2W','X-Parse-REST-API-Key':'HqNZ4yd0VMGqTsZZiA7snuQQC3TkwfdXcA8UMgmf'});
   $httpProvider.defaults.headers.get = { 'X-Parse-Application-Id' : 'sS32ldJqA5k8HxTTbgK6yRFEhnG1FVm2HXcgmd2W','X-Parse-REST-API-Key':'HqNZ4yd0VMGqTsZZiA7snuQQC3TkwfdXcA8UMgmf','X-Parse-Session-Token': localStorage.getItem('session')}
   $httpProvider.defaults.headers.post = { 'X-Parse-Application-Id' : 'sS32ldJqA5k8HxTTbgK6yRFEhnG1FVm2HXcgmd2W','X-Parse-REST-API-Key':'HqNZ4yd0VMGqTsZZiA7snuQQC3TkwfdXcA8UMgmf','X-Parse-Session-Token': localStorage.getItem('session')}
   $translateProvider.translations('en', {
            instock: "What I have",
            instockheader:"What I still have",
            product:"Product",
            buy_price:"Buying Price",
            sell_price:"Selling Price",
            number:"Number",
            total_cost:"Total Cost",
            sold: "What I sold",
            profit:"Profit",
            edit_profile:"Edit Profile",
            profile:"My Profile",
            name:"Name",
            phone_number:"Phone Number",
            business_name:"Business Name",
            just_spent:"I Just used Money",
            report:"Report",
            amount_sold:"Amount sold",
            amount_in_stock:"Amount in Stock",
            spent:"Spent",
            how_i_spent:"How I Spent",
            download:"Download Monthly Reports",
            reset:"Reset",
            empty_stock:"Clear All Stock",
            empty_sold:"Clear All Sold",
            reset_spent:"Clear Spent",
            clear:"Clear Everything",
            how_to:"Help",
            tips:"Tips",
            logout:"Logout",
            undosale:"Undo a sale",
            resetitems:"Reset store items",
            howto:"How To",
            ispent:"I Spent",
            edit:"Edit",
            sell:"Sell",
            undo:"Undo",
            delete:"Delete",
            password:"Password",
            login:"Log In",
            signup:"Sign Up",
            speak:"Let's speak",
            what_I_sold:"What I have sold "


        });
        $translateProvider.translations('fr', {
            instock: "En Magasin",
            instockheader:"En Magasin",
            product:"Produit",
            buy_price:"prix d'achat",
            sell_price:"prix de vente",
            number:"nombre",
            total_cost:"coût total",
            sold: "Est Vendu",
            profit:"le profit",
            edit_profile:"Edit Profile",
            profile:"modifier lucratif",
            name:"prénom",
            phone_number:"numéro de téléphone",
            business_name:"Nom de l'entreprise",
            just_spent:"Je viens de passer",
            report:"rapport",
            amount_sold:"montant vendu",
            amount_in_stock:"montant instock",
            spent:"dépensé",
            how_i_spent:"comment je passai",
            download:"Télécharger rapport mensuel",
            reset:"réinitialiser",
            empty_stock:"effacer tout le stock",
            empty_sold:"effacer tous vendus",
            reset_spent:"clairement usé",
            clear:"tout est clair",
            how_to:"comment",
            tips:"astuces",
            logout:"se déconnecter",
            undosale:"Annuler une vente",
            resetitems:"Reinitiator",
            howto:"comment",
            ispent:"J'ai dépensé",
            edit:"modifier",
            sell:"vendre",
            undo:"annuler",
            delete:"effacer",
            password:"mot de passe",
            login:"s'identifier",
            signup:"s'inscrire",
            speak:"Let's speak",
            what_I_sold:"ce que je vendais"
        });
        $translateProvider.translations('twi', {
            instock: "Nneama wo W)",
            instockheader:"Nneama wo W) (twee ko left na ton)",
            product:"Product",
            buy_price:"Price wo to no",
            sell_price:"Price wo di ton ",
            number:"Number",
            total_cost:"Total sika ye",
            sold: "Nneama wa ton",
            profit:" Wo Profit",
            edit_profile:"Change Profile",
            profile:"Wo Profile",
            name:"Name",
            phone_number:"Wo Phone Number",
            business_name:"Name of Store",
            just_spent:"I Have Used Money ",
            report:"Report",
            amount_sold:"Amount a wa ton",
            amount_in_stock:"Amount of nneama wo w)",
            spent:"You have used",
            how_i_spent:"How you used your money",
            download:"Download Monthly Reports",
            reset:"Reset",
            empty_stock:"Clear All Stock",
            empty_sold:"Clear All Sold",
            reset_spent:"Clear Spent",
            clear:"Clear Everything",
            how_to:"Help",
            tips:"Advice",
            logout:"Logout",
            undosale:"Yen to bion",
            resetitems:"Clear Store nneama",
            howto:"Help",
            ispent:"I Spent",
            edit:"Change",
            sell:"Sell",
            undo:"Undo",
            delete:"Delete",
            password:"Wo Password",
            login:"Log In",
            signup:"Sign Up",
            speak:"Let's speak",
            what_I_sold:"Nneama ma ton (twee ko left to return item)"
        });
        $translateProvider.preferredLanguage(localStorage.getItem('lang'));
        
        $translateProvider.fallbackLanguage("en");
   
        
});
