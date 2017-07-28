// Base object to provide event pub/sub functionality to other objects

(function () {
  'use strict';

  angular.module('rdelhommer.ng.base')
    .factory('eventEmitterFactory', () => {
      return new EventEmitterFactory();
    });

  function EventEmitterFactory() {
    this.create = create;

    function create() {
      return new EventEmitter();
    }
  }

  function EventEmitter() {
    var callbacks = {};

    this.on = on;
    this.emit = emit;

    function on(eventId, callbackToRegister, registrationScope, disableScopeWarning) {
      if (!registrationScope && !disableScopeWarning) {
        console.log('WARNING: No scope for event registration - ' + eventId);
      }

      var uuid = _generateUUID();
      if (!callbacks[eventId]) {
        callbacks[eventId] = {};
      }

      callbacks[eventId][uuid] = callbackToRegister;

      if (!registrationScope) return;

      // Remove the callback when the registration scope is destroyed 
      registrationScope.$on('$destroy', () => {
        delete callbacks[eventId][uuid];
      });
    }

    function emit(eventId, payload) {
      if (!callbacks[eventId]) return;

      for (var uuid in callbacks[eventId]) {
        if (!callbacks[eventId].hasOwnProperty(uuid)) continue;

        // Invoke the callback
        callbacks[eventId][uuid](payload);
      }
    }

    function _generateUUID () {
      var d = new Date().getTime();
      if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
      }
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
    }
  }
}());
