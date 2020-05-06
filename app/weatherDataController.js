myApp.controller('WeatherAppController', ['$scope', '$http', 'weatherData', function WeatherAppController($scope, $http, weatherData) {
  this.name = "Nitin";
  this.symbol = 'C';
  var latitude;
  var longitude;
  var url;

  navigator.geolocation.getCurrentPosition(function (position) {
    latitude = Math.round(position.coords.latitude);
    longitude = Math.round(position.coords.longitude);
    url = 'https://fcc-weather-api.glitch.me/api/current?lat=' + latitude + '&lon=' + longitude;

    var resultPromise = weatherData.getWeatherData(url);

    resultPromise.then(function (response) {
      let location = response.name + ', ' + response.sys.country;
      var weatherObj = new WeatherConstruct(location, Math.round(response.main.temp) + ' °', response.weather[0].main, response.weather[0].icon);
      mapServerDataToField(weatherObj);
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
}])

