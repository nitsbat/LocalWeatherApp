'use strict';

myApp.service('weatherData', ['$resource', '$q', function ($resource, $q) {
  var deferredObject = $q.defer();
  this.getWeatherData = function (apiUrl) {
    var dataPromise = $resource(apiUrl).get();
    dataPromise.$promise.then(function (result) {
      deferredObject.resolve(result)
    })
    return deferredObject.promise;
  }
}])