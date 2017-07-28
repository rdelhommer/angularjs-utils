// Service that keeps track of notification counts in localStorage
// Handles increment and clearing of notification counts on state change
// TODO: Store notification context
(function () {
  'use strict';

  angular.module('rdelhommer.ng.services')
    .service('localNotifications', LocalNotifications);

  function LocalNotifications($window, $rootScope, eventEmitterFactory) {
    var storedNotificationIds = [];
    var clearStateToIdMap = {};
    var _eventEmitter = eventEmitterFactory.create();

    this.getNotificationCount = getNotificationCount;
    this.incrementNotificationCount = incrementNotificationCount;
    this.clearNotificationCount = clearNotificationCount;
    this.onNotificationsUpdated = onNotificationsUpdated;
    this.registerClearState = registerClearState;

    _registerEventHandlers();

    function _registerEventHandlers() {
      $rootScope.$on('$stateChangeSuccess', (e, toState, toParams, fromState, fromParams) => {
        tryClearNotifications(toState.name);
      });
    }

    function getNotificationCount(notificationId) {
      if (!$window.localStorage[getLocalStorageKey(notificationId)]) return 0;

      return JSON.parse($window.localStorage[getLocalStorageKey(notificationId)])
    }

    function incrementNotificationCount(notificationId, currentStateName) {
      if (clearStateToIdMap[currentStateName] && clearStateToIdMap[currentStateName].indexOf(notificationId) !== -1) {
        // Return if the current state is a state that would clear the notification being added
        return;
      }

      var count = 0;
      if ($window.localStorage[getLocalStorageKey(notificationId)]) {
        count = JSON.parse($window.localStorage[getLocalStorageKey(notificationId)]);
      }

      count++;
      $window.localStorage[getLocalStorageKey(notificationId)] = count;

      if (storedNotificationIds.indexOf(notificationId) === -1) {
        storedNotificationIds.push(notificationId);
      }

      notificationsUpdated(notificationId, count);
    }

    function clearNotificationCount(notificationId) {
      if (!notificationId) {
        // Clear all notifications if no id provided
        storedNotificationIds.forEach((storedId) => {
          $window.localStorage[getLocalStorageKey(storedId)] = 0;
          notificationsUpdated(storedId, 0);
        });
      } else {
        $window.localStorage[getLocalStorageKey(notificationId)] = 0;
        notificationsUpdated(notificationId, 0);
      }
    }

    function onNotificationsUpdated(notificationId, callback, registrationScope) {
      _eventEmitter.on('local+' + notificationId, callback, registrationScope);
    }

    function registerClearState(stateName, notificationId) {
      // Create empty array if state isn't registered yet.
      if (!clearStateToIdMap[stateName]) {
        clearStateToIdMap[stateName] = [];
      }

      // Return if notificationId is already registered for state
      if (clearStateToIdMap[stateName].indexOf(notificationId) !== -1) return;

      // Register the notificationId to the state
      clearStateToIdMap[stateName].push(notificationId);
    }

    function tryClearNotifications(stateName) {
      // Return if state isn't registered
      if (!clearStateToIdMap[stateName]) return;

      // Clear all notifications for notificationIds registered to the state
      clearStateToIdMap[stateName].forEach(function(notificationId) {
        clearNotificationCount(notificationId);
      });
    }

    function notificationsUpdated(notificationId, notificationCount) {
      _eventEmitter.emit('local+' + notificationId, notificationCount);
    }

    function getLocalStorageKey(notificationId) {
      return 'notification_' + notificationId;
    }
  }
}());
