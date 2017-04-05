(function () {
  'use strict';
  angular.module('app')
    .controller('expenseCtrl', ['$scope', '$http', '$state', '$sessionStorage', '$timeout', '$modal', '$log', 'settings', 'Expense', 'expenses', 'Voice', function ($scope, $http, $state, $sessionStorage, $timeout, $modal, $log, settings, Expense, expenses, Voice) {
      $scope.settings = settings;
      $scope.expenses = expenses;
      $scope.expense = {};
      $scope.datepicker = {};
      $scope.processing = false;
      $scope.today = function () {
        $scope.expense.date = moment()
          .format('Do MMM YYYY'); //new Date();
      };
      $scope.today();
      $scope.clear = function () {
        $scope.expense.date = null;
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
      $scope.saveExpense = function () {
        console.log($scope.expense);
        Expense.saveExpense($scope.expense)
          .then(e => $scope.expenses.push(e.data));
      };
      $scope.updateExpense = function (e, i) {
        Expense.update(expenses[i]._id.$oid, {
            "amount": expenses[i].amount
          })
          .then(ex => {
            console.log(ex.data);
            $scope.processing = false;
            $timeout(function () {
              angular.element(e.currentTarget)
                .removeClass('active');
              angular.element(e.currentTarget.attributes.target.value)
                .removeClass('show inline');
            }, 500);
          });
      };
      $scope.deleteExpense = function (i) {
        Expense.delete(expenses[i]._id.$oid)
          .then(c => {
            $scope.expenses.splice(i, 1);
          });
      };
      $scope.newExpenseEntry = function (size) {
        var modalInstance = $modal.open({
          templateUrl: 'tpl/expense/newExpense.html',
          controller: 'ModalInstanceCtrl',
          controllerAs: 'modal',
          bindToController: true,
          size: size,
          backdrop: true,
          scope: $scope,
          resolve: {
            settings: function () {
              return settings;
            }
          }
        });
        modalInstance.result.then(function () {
          $scope.saveExpense();
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      };
      $scope.newRecord = function (args) {
        document.getElementById('newRecord')
          .click();
        $scope.expense.source = args[0];
        $scope.expense.amount = args[1];
      };
      Voice.addCommand('new item *source *amount', $scope.newRecord);
    }])
    .controller('ModalInstanceCtrl', ['$scope', '$modalInstance', function ($scope, $modalInstance) {
      $scope.ok = function () {
        $modalInstance.close();
      };
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }]);
})();
