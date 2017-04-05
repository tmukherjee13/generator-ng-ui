(function () {
  'use strict';
  angular.module('app')
    .controller('creditCtrl', ['$scope', '$http', '$state', '$sessionStorage', '$timeout', '$modal', '$log', '$filter', 'credits', 'Credit', 'settings', 'Voice', function ($scope, $http, $state, $sessionStorage, $timeout, $modal, $log, $filter, credits, Credit, settings, Voice) {
      $scope.credits = credits;
      $scope.settings = settings;
      $scope.credit = {
        source: null,
        amount: null,
        date: null
      };
      $scope.datepicker = {};
      $scope.today = function () {
        $scope.credit.date = moment()
          .format('Do MMM YYYY'); //new Date();
      };
      $scope.today();
      $scope.clear = function () {
        $scope.credit.date = null;
      };
      // Disable weekend selection
      $scope.disabled = function (date, mode) {
        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
      };
      $scope.toggleMin = function () {
        $scope.datepickerminDate = $scope.datepicker.minDate ? null : new Date()
          .getMonth() - 3;
      };
      $scope.toggleMax = function () {
        $scope.datepicker.maxDate = $scope.datepicker.maxDate ? null : new Date();
      };
      $scope.toggleMin();
      $scope.toggleMax();
      $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.datepicker.opened = true;
      };
      $scope.datepicker.dateOptions = {
        formatYear: 'yy',
        startingDay: 1,
        class: 'datepicker',
        dateDisabled: false,
      };
      $scope.datepicker.initDate = new Date();
      $scope.datepicker.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.datepicker.format = $scope.datepicker.formats[0];
      $scope.saveCredit = function (e) {
        console.log($scope.credit);
        Credit.saveCredit($scope.credit)
          .then(c => {
            $scope.credits.push(c.data);
            console.log($scope.credits);
          });
      };
      $scope.updateCredit = function (e, i) {
        Credit.update(credits[i]._id.$oid, {
            "amount": credits[i].amount
          })
          .then(c => {
            $timeout(function () {
              angular.element(e.currentTarget)
                .removeClass('active');
              angular.element(e.currentTarget.attributes.target.value)
                .removeClass('show inline');
            }, 500);
          });
      };
      $scope.deleteCredit = function (i) {
        Credit.delete(credits[i]._id.$oid)
          .then(c => {
            $scope.credits.splice(i, 1);
          });
      };
      $scope.newCreditEntry = function (size) {
        var modalInstance = $modal.open({
          templateUrl: 'tpl/credit/newCredit.html',
          controller: 'ModalInstanceCtrl',
          controllerAs: 'modal',
          bindToController: true,
          size: size,
          backdrop: true,
          scope: $scope,
          resolve: {
            items: function () {
              return $scope.credits;
            },
            settings: function () {
              return $scope.settings;
            }
          }
        });
        modalInstance.result.then(function (selectedItem) {
          $scope.saveCredit();
          $scope.selected = selectedItem;
          // $scope.credit.date = $filter('date')($scope.credit.date, 'dd/mm/yyyy');
          console.log($filter('date')($scope.credit.date, 'dd/MM/yyyy'));
        }, function () {
          console.log('sdfds');
          $log.info('Modal dismissed at: ' + new Date());
        });
      };
      $scope.newRecord = function (args) {
        document.getElementById('newRecord')
          .click();
        $scope.credit.source = args[0];
        $scope.credit.amount = args[1];
      };
      Voice.addCommand('new item *source *amount', $scope.newRecord);
  }])
    .controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'items', function ($scope, $modalInstance, items) {
      $scope.items = items;
      $scope.amount = 500;
      $scope.selected = {
        item: $scope.items[0]
      };
      $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
      };
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
  }]);
})();
