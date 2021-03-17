(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getApi = getApi;

var _main = require("./main.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getApi(_x, _x2) {
  return _getApi.apply(this, arguments);
}

function _getApi() {
  _getApi = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(city, country) {
    var response, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return fetch("//api.weatherstack.com/current?access_key=4f1356484237009b61987ec98869b062&query=".concat(city, ",").concat(country));

          case 3:
            response = _context.sent;
            _context.next = 6;
            return response.json();

          case 6:
            data = _context.sent;
            console.log(data);
            (0, _main.createContent)(data);
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            console.log("".concat(_context.t0, " \u043E\u0448\u0438\u0431\u043A\u0430"));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));
  return _getApi.apply(this, arguments);
}

;

},{"./main.js":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createContent = createContent;

var _getApi = require("./getApi.js");

function createContent(data) {
  document.querySelector('.content_country').textContent = data.location.country;
  document.querySelector('.content_city').textContent = "Weather in ".concat(data.location.name);
  document.querySelector('.content_temperature').textContent = "".concat(data.current.temperature, " \xB0C");
  document.querySelector('.content_humidity').textContent = "Humidity: ".concat(data.current.humidity, " %");
  document.querySelector('.content_speed').textContent = "Wind Speed: ".concat(data.current.wind_speed, " km/h");
  saveContent(data);
}

function saveContent(data) {
  var storage = JSON.parse(localStorage.getItem('storageId') || "[]");
  var obj = {
    country: data.location.country,
    city: data.location.name,
    temperature: data.current.temperature,
    humidity: data.current.humidity,
    windSpeed: data.current.wind_speed
  };
  var tr = true;
  storage.forEach(function (el) {
    if (el.city == obj.city) {
      tr = false;
    }
  });

  if (tr && storage.length < 5) {
    storage.push(obj);
  }

  localStorage.setItem('storageId', JSON.stringify(storage));
}

function showSaveContent() {
  var storage = JSON.parse(localStorage.getItem('storageId'));
  var weatherItems = document.querySelectorAll('.block_weather_item');
  var containerWeatherItem = document.querySelector('.container_weather_item');

  if (storage == null) {
    console.log('You are empty storage');
    return;
  } else if (weatherItems.length < storage.length) {
    containerWeatherItem.innerHTML = '';
    storage.forEach(function (el) {
      var content = document.createElement('div');
      content.className = "block_weather_item";
      content.innerHTML = "\n        <div class=\"weather_item\">".concat(el.country, "  </div>\n        <div class=\"weather_item\">").concat(el.city, ":</div>\n        <div class=\"weather_item\">").concat(el.temperature, "\xB0C</div>\n        <div class=\"weather_item\">Humidity: ").concat(el.humidity, "%</div>\n        <div class=\"weather_item\">Wind Speed: ").concat(el.windSpeed, " km/h</div>\n    ");
      containerWeatherItem.append(content);
    });
  }

  document.querySelector('.my-weather').style.display = 'block';
}

function callButton() {
  var formButton = document.querySelector('.form_button');
  var userPosition = document.querySelector('.user_position');
  var selectedWeather = document.querySelector('.selected-weather');
  var content = document.querySelector('.content');
  var blockSaveWeather = document.querySelector('.my-weather');
  formButton.addEventListener('click', function (event) {
    var formSearchCity = document.querySelector('#search-city');
    var formSearchCountry = document.querySelector('#search-country');
    event.preventDefault();
    (0, _getApi.getApi)(formSearchCity.value, formSearchCountry.value);
    formSearchCity.value = "";
    formSearchCountry.value = "";
    content.style.display = 'block';
    blockSaveWeather.style.display = 'none';
  });
  userPosition.addEventListener('click', function () {
    navigator.geolocation.getCurrentPosition(function (position) {
      (0, _getApi.getApi)(position.coords.latitude, position.coords.longitude);
    });
  });
  document.querySelector('.button-clear').addEventListener('click', function () {
    document.querySelector('.container_weather_item').innerHTML = '';
    localStorage.clear();
    blockSaveWeather.style.display = 'none';
    content.style.display = 'block';
  });
  selectedWeather.addEventListener('click', function () {
    showSaveContent();

    if (localStorage.getItem('storageId') !== null) {
      content.style.display = 'none';
    }
  });
}

callButton();

},{"./getApi.js":1}]},{},[2]);
