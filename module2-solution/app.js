(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService']
function ToBuyController(ShoppingListCheckOffService) {
  var buyList = this;

  buyList.buyItem = function (itemIndex) {
    ShoppingListCheckOffService.buyItem (itemIndex);
  }

  buyList.items = ShoppingListCheckOffService.getBuyItems();
  buyList.allBought = function () {
    return ShoppingListCheckOffService.getAllBought();
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService']
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;

  boughtList.items = ShoppingListCheckOffService.getBoughtItems();
  boughtList.nothingBought = function () {
    return ShoppingListCheckOffService.getNothingBought();
  }
}

ShoppingListShowController.$inject = ['ShoppingListService'];
function ShoppingListShowController(ShoppingListService) {
  var showList = this;

  showList.items = ShoppingListService.getItems();

  showList.removeItem = function (itemIndex) {
    ShoppingListService.removeItem(itemIndex);
  };
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var buy = ['Oreo cookies','Milk','Ice cream','Eggs','Chips'];
  var bought = [];
  var allBought = false;
  var nothingBought = true;

  service.buyItem = function (itemIndex) {
    var item = buy[itemIndex];
    bought.push(item);
    nothingBought = false;
    buy.splice(itemIndex, 1);
    if (buy.length == 0) {
      allBought = true;
    };
  };

  service.getBuyItems = function () {
    return buy;
  };

  service.getBoughtItems = function() {
    return bought;
  }

  service.getAllBought = function () {
    return allBought;
  }

  service.getNothingBought = function () {
    return nothingBought;
  }
}

})();
