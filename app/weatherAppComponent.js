'use strict';

angular.module('myApp', ['ngRoute']).component('weatherApp', {
  templateUrl: 'app/weather-app.html',
  controllerAs: "ctrl",
  controller: ['$scope', '$http', function WeatherAppController($scope, $http) {
    this.name = "Nitin";
    this.symbol = 'C';
    var responseData;
    var latitude;
    var longitude;
    var url;
    navigator.geolocation.getCurrentPosition(function (position) {
      latitude = Math.round(position.coords.latitude);
      longitude = Math.round(position.coords.longitude);
      url = 'https://fcc-weather-api.glitch.me/api/current?lat=' + latitude + '&lon=' + longitude;
      console.log(url);
      $http.get(url).then(function (response) {
        responseData = response.data;
        console.log(responseData);
        let location = responseData.name + ', ' + responseData.sys.country;
        var weatherObj = new WeatherConstruct(location, Math.round(responseData.main.temp) + ' °', responseData.weather[0].main, responseData.weather[0].icon);
        mapServerDataToField(weatherObj);
        console.log(weatherObj);
      })
    });
    function WeatherConstruct(location, temperature, status, icon) {
      this.location = location;
      this.temperature = temperature;
      this.status = status;
      this.icon = icon;
    }

    function mapServerDataToField(weatherObj) {
      $scope.location = weatherObj.location;
      $scope.temperature = weatherObj.temperature;
      $scope.status = weatherObj.status;
      $scope.icon = weatherObj.icon;
    }
    this.changeUnits = function () {
      console.log("sad");
      let temp = $scope.temperature.replace(' °', '');
      if (this.symbol == "C") {
        this.symbol = "F";
        temp = Math.round((9 / 5 * parseFloat(Math.round(temp))) + 32);
      } else if (this.symbol == "F") {
        this.symbol = "C";
        temp = Math.round((parseFloat(Math.round(temp)) - 32) * (5 / 9));
      }
      $scope.temperature = temp + ' °';
    }

  }]
})