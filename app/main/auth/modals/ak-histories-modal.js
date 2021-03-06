angular.module('web')
  .controller('akHistoriesModalCtrl', ['$scope', '$translate', '$uibModalInstance', 'choose', 'Dialog', 'Config', 'AkHistory',
    function ($scope, $translate, $modalInstance, choose, Dialog, Config, AkHistory) {
      const T = $translate.instant;
      angular.extend($scope, {
        histories: AkHistory.list(),
        chooseIt: chooseIt,
        removeIt: removeIt,
        cleanAll: cleanAll,
        cancel: cancel,
      });

      function chooseIt(history) {
        choose(history);
        cancel();
      }

      function removeIt(history) {
          const title = T("auth.removeAK.title");
          const message = T("auth.removeAK.message", { id: history.accessKeyId, description: history.description });
          Dialog.confirm(title, message, function (confirm) {
              if (confirm) {
                AkHistory.remove(history.accessKeyId)
                $scope.histories = AkHistory.list();
              }
            },
            1
          );
      }

      function cleanAll() {
          const title = T("auth.clearAKHistories.title");
          const message = T("auth.clearAKHistories.message");
          const successMessage = T("auth.clearAKHistories.successMessage");
          Dialog.confirm(title, message, function (confirm) {
              if (confirm) {
                AkHistory.clearAll();
                $scope.histories = AkHistory.list();
                Toast.success(successMessage);
              }
            },
            1
          );
      }

      function cancel() {
        $modalInstance.dismiss('close');
      }
    }
]);
