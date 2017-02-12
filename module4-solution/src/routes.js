(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })

  // Categories page
  .state('categoryList', {
    url: '/category-list',
    templateUrl: 'src/menuapp/templates/category-list.template.html',
    controller: 'MenuAppController as menuList',
    resolve: {
      items: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  // Menu Items Page
  .state('itemDetail', {
    url: '/item-detail/{itemId}',
    templateUrl: 'src/menuapp/templates/item-detail.template.html',
    controller: "ItemDetailController as itemDetail",
    resolve: {
      items: ['$stateParams', 'MenuDataService',
        function ($stateParams, MenuDataService) {
        return MenuDataService.getAllCategories()
          .then(function (items) {
            // new code
            var menu_cat = {
              short_name: items[$stateParams.itemId].short_name,
              name: items[$stateParams.itemId].name
            }
            return MenuDataService.getItemsForCategory(
              menu_cat);
          });
      }]
    }
  })

}

})();
