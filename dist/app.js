/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _main = __webpack_require__(1);

__webpack_require__(7);

__webpack_require__(8);

__webpack_require__(9);

console.log('Welcome to WeatherBuzz');
new _main.Main();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _api = __webpack_require__(2);

var _utils = __webpack_require__(4);

var _utils2 = __webpack_require__(6);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Main = function () {
    /**
     * Constructor
     */
    function Main() {
        _classCallCheck(this, Main);

        document.addEventListener('DOMContentLoaded', this.onDomContentLoaded.bind(this));
        if (!'geolocation' in navigator) {
            throw new Error('Geolocation not supported on browser!');
        }
        this.updateWeather();
    }

    /**
     * DOMContentLoaded
     */


    _createClass(Main, [{
        key: 'onDomContentLoaded',
        value: function onDomContentLoaded() {
            var _this = this;

            var refreshButton = document.querySelector('#refresh');
            refreshButton.addEventListener('click', function () {
                _this.setBusy();
                _this.updateWeather();
            });
        }

        /**
         * Update the weather.
         */

    }, {
        key: 'updateWeather',
        value: function updateWeather() {
            var _this2 = this;

            navigator.geolocation.getCurrentPosition(this.onResolveCurrentPosition.bind(this), function (e) {
                _this2.setError(e.message ? e.message : "Location unavailable!");
                console.warn('Oops!', e);
            });
        }

        // noinspection JSMethodCanBeStatic
        /**
         * Set busy state
         */

    }, {
        key: 'setBusy',
        value: function setBusy() {
            document.querySelector('.loader').innerHTML = '\n            <span class="pulsate">Loading...</span>\n        ';
            document.querySelector('main').classList.add('hidden');
            document.querySelector('.loader').classList.remove('hidden');
        }

        /**
         * Set idle state
         */

    }, {
        key: 'setIdle',
        value: function setIdle() {
            document.querySelector('main').classList.remove('hidden');
            document.querySelector('.loader').classList.add('hidden');
        }

        /**
         * Display error message
         * @param message
         */

    }, {
        key: 'setError',
        value: function setError(message) {
            document.querySelector('.loader').innerHTML = '\n            <span>\n                <h1>Error!</h1>\n                <span>' + message + '</span>\n            </span>\n        ';
        }

        /**
         * Render the current weather conditions
         * @param {{weather, name, main: {temp, temp_min, temp_max humidity, pressure}}} data
         */

    }, {
        key: 'renderCurrentWeather',
        value: function renderCurrentWeather(data) {
            document.querySelector('.wi').className = (0, _utils.resolveIcon)(data.weather[0].id);
            document.querySelector('.description').innerText = data.weather[0].description;
            document.querySelector('.location').innerText = data.name;
            document.querySelector('.temp').innerText = data.main.temp + '\xB0C';
            document.querySelector('.min_max').innerText = data.main.temp_min + '\xB0C / ' + data.main.temp_max + '\xB0C';
            document.querySelector('.humidity').innerText = data.main.humidity + '%';
            document.querySelector('.pressure').innerText = data.main.pressure + 'hPa';
        }

        /**
         * Render the 3-hourly weather forecast data
         * @param data
         */

    }, {
        key: 'renderForecastWeather',
        value: function renderForecastWeather(data) {
            var target = document.querySelector('.forecast');
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = data.list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var fc = _step.value;

                    var el = document.createElement('span');

                    el.innerHTML = '\n                <span class="hour">' + (0, _utils2.toHour12)(fc.dt_txt) + '</span>\n                <span class="' + (0, _utils.resolveIcon)(fc.weather[0].id) + '"></span>\n                <span class="temp">' + fc.main.temp + '\xB0C</span>\n            ';

                    target.appendChild(el);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }

        /**
         * Event handler fired when the current GPS location is resolved.
         * @param pos
         */

    }, {
        key: 'onResolveCurrentPosition',
        value: function onResolveCurrentPosition(pos) {
            var _this3 = this;

            Promise.all([(0, _api.getWeather)(pos.coords), (0, _api.getForecast)(pos.coords)]).then(function (values) {
                var _values = _slicedToArray(values, 2),
                    weatherData = _values[0],
                    forecastData = _values[1];

                _this3.renderCurrentWeather(weatherData);
                _this3.renderForecastWeather(forecastData);
                _this3.setIdle();
            }).catch(function (e) {
                console.log(e);
                _this3.setError('Unable to fetch weather data!');
            });
        }
    }]);

    return Main;
}();

exports.Main = Main;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _config = __webpack_require__(3);

/**
 * Fetch the 3 hourly weather forecast.
 * @param options
 * @returns {Promise}
 */
exports.getForecast = function (options) {
    return new Promise(function (resolve, reject) {
        var url = _config.api.endPoint + '/forecast?appid=' + _config.api.key;
        url += '&lat=' + options.latitude + '&lon=' + options.longitude + '&units=metric';

        var xhr = new XMLHttpRequest(),
            json = void 0;
        xhr.open('GET', url);
        xhr.addEventListener('load', function () {
            try {
                json = JSON.parse(xhr.responseText);
            } catch (error) {
                console.warn('Attempt to parse JSON data has failed!');
            }
            resolve(json);
        });
        xhr.addEventListener('timeout', function () {
            reject();
        });
        xhr.addEventListener('error', function () {
            reject();
        });
        xhr.send();
    });
};

/**
 * Fetch the current weather conditions.
 * @param options
 * @returns {Promise}
 */
exports.getWeather = function (options) {
    return new Promise(function (resolve, reject) {
        var url = _config.api.endPoint + '/weather?appid=' + _config.api.key;
        url += '&lat=' + options.latitude + '&lon=' + options.longitude + '&units=metric';

        var xhr = new XMLHttpRequest(),
            json = void 0;
        xhr.open('GET', url);
        xhr.addEventListener('load', function () {
            try {
                json = JSON.parse(xhr.responseText);
            } catch (error) {
                console.warn('Attempt to parse JSON data has failed!');
            }
            resolve(json);
        });
        xhr.addEventListener('timeout', function () {
            reject();
        });
        xhr.addEventListener('error', function () {
            reject();
        });
        xhr.send();
    });
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Very basic application configuration
 * @type {{}}
 */
exports.api = {
  key: '0debd7e718f5e44cc704406f24fffbc0',
  endPoint: 'https://api.openweathermap.org/data/2.5'
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _icons = __webpack_require__(5);

/**
 * Returns a class name string for the corresponding OpenWeatherMa[ icon ID.
 * @param {int} id OpenWeatherMap icon ID
 * @returns {string} Class name, for example "wi wi-day-rain"
 */
exports.resolveIcon = function (id) {
    var icon = _icons.icons[id].icon;

    if (!(id > 699 && id < 800) && !(id > 899 && id < 1000)) {
        icon = 'day-' + icon;
    }

    return 'wi wi-' + icon;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Simple mapping manifest for OpenWeatherMap icon IDs to Weather Icons font
 * @type {{}}
 */
exports.icons = {
    200: {
        label: "thunderstorm with light rain",
        icon: "storm-showers"
    },
    201: {
        label: "thunderstorm with rain",
        icon: "storm-showers"
    },
    202: {
        label: "thunderstorm with heavy rain",
        icon: "storm-showers"
    },
    210: {
        label: "light thunderstorm",
        icon: "storm-showers"
    },
    211: {
        label: "thunderstorm",
        icon: "thunderstorm"
    },
    212: {
        label: "heavy thunderstorm",
        icon: "thunderstorm"
    },
    221: {
        label: "ragged thunderstorm",
        icon: "thunderstorm"
    },
    230: {
        label: "thunderstorm with light drizzle",
        icon: "storm-showers"
    },
    231: {
        label: "thunderstorm with drizzle",
        icon: "storm-showers"
    },
    232: {
        label: "thunderstorm with heavy drizzle",
        icon: "storm-showers"
    },
    300: {
        label: "light intensity drizzle",
        icon: "sprinkle"
    },
    301: {
        label: "drizzle",
        icon: "sprinkle"
    },
    302: {
        label: "heavy intensity drizzle",
        icon: "sprinkle"
    },
    310: {
        label: "light intensity drizzle rain",
        icon: "sprinkle"
    },
    311: {
        label: "drizzle rain",
        icon: "sprinkle"
    },
    312: {
        label: "heavy intensity drizzle rain",
        icon: "sprinkle"
    },
    313: {
        label: "shower rain and drizzle",
        icon: "sprinkle"
    },
    314: {
        label: "heavy shower rain and drizzle",
        icon: "sprinkle"
    },
    321: {
        label: "shower drizzle",
        icon: "sprinkle"
    },
    500: {
        label: "light rain",
        icon: "rain"
    },
    501: {
        label: "moderate rain",
        icon: "rain"
    },
    502: {
        label: "heavy intensity rain",
        icon: "rain"
    },
    503: {
        label: "very heavy rain",
        icon: "rain"
    },
    504: {
        label: "extreme rain",
        icon: "rain"
    },
    511: {
        label: "freezing rain",
        icon: "rain-mix"
    },
    520: {
        label: "light intensity shower rain",
        icon: "showers"
    },
    521: {
        label: "shower rain",
        icon: "showers"
    },
    522: {
        label: "heavy intensity shower rain",
        icon: "showers"
    },
    531: {
        label: "ragged shower rain",
        icon: "showers"
    },
    600: {
        label: "light snow",
        icon: "snow"
    },
    601: {
        label: "snow",
        icon: "snow"
    },
    602: {
        label: "heavy snow",
        icon: "snow"
    },
    611: {
        label: "sleet",
        icon: "sleet"
    },
    612: {
        label: "shower sleet",
        icon: "sleet"
    },
    615: {
        label: "light rain and snow",
        icon: "rain-mix"
    },
    616: {
        label: "rain and snow",
        icon: "rain-mix"
    },
    620: {
        label: "light shower snow",
        icon: "rain-mix"
    },
    621: {
        label: "shower snow",
        icon: "rain-mix"
    },
    622: {
        label: "heavy shower snow",
        icon: "rain-mix"
    },
    701: {
        label: "mist",
        icon: "sprinkle"
    },
    711: {
        label: "smoke",
        icon: "smoke"
    },
    721: {
        label: "haze",
        icon: "day-haze"
    },
    731: {
        label: "sand, dust whirls",
        icon: "cloudy-gusts"
    },
    741: {
        label: "fog",
        icon: "fog"
    },
    751: {
        label: "sand",
        icon: "cloudy-gusts"
    },
    761: {
        label: "dust",
        icon: "dust"
    },
    762: {
        label: "volcanic ash",
        icon: "smog"
    },
    771: {
        label: "squalls",
        icon: "day-windy"
    },
    781: {
        label: "tornado",
        icon: "tornado"
    },
    800: {
        label: "clear sky",
        icon: "sunny"
    },
    801: {
        label: "few clouds",
        icon: "cloudy"
    },
    802: {
        label: "scattered clouds",
        icon: "cloudy"
    },
    803: {
        label: "broken clouds",
        icon: "cloudy"
    },
    804: {
        label: "overcast clouds",
        icon: "cloudy"
    },

    900: {
        label: "tornado",
        icon: "tornado"
    },
    901: {
        label: "tropical storm",
        icon: "hurricane"
    },
    902: {
        label: "hurricane",
        icon: "hurricane"
    },
    903: {
        label: "cold",
        icon: "snowflake-cold"
    },
    904: {
        label: "hot",
        icon: "hot"
    },
    905: {
        label: "windy",
        icon: "windy"
    },
    906: {
        label: "hail",
        icon: "hail"
    },
    951: {
        label: "calm",
        icon: "sunny"
    },
    952: {
        label: "light breeze",
        icon: "cloudy-gusts"
    },
    953: {
        label: "gentle breeze",
        icon: "cloudy-gusts"
    },
    954: {
        label: "moderate breeze",
        icon: "cloudy-gusts"
    },
    955: {
        label: "fresh breeze",
        icon: "cloudy-gusts"
    },
    956: {
        label: "strong breeze",
        icon: "cloudy-gusts"
    },
    957: {
        label: "high wind, near gale",
        icon: "cloudy-gusts"
    },
    958: {
        label: "gale",
        icon: "cloudy-gusts"
    },
    959: {
        label: "severe gale",
        icon: "cloudy-gusts"
    },
    960: {
        label: "storm",
        icon: "thunderstorm"
    },
    961: {
        label: "violent storm",
        icon: "thunderstorm"
    },
    962: {
        label: "hurricane",
        icon: "cloudy-gusts"
    }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Converts the given time string to 12-hour format and post fixes am/pm
 * For example, 13:00:00 will become 1pm.
 */
exports.toHour12 = function (time) {
    var h = parseInt(time.split(' ')[1].split(':')[0], 10);
    var postfix = h < 12 ? 'am' : 'pm';
    h = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return h + postfix;
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2Q0YmQwYzUzZGM5N2IyZjliYWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC93ZWF0aGVyL2FwaS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3dlYXRoZXIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmZpZy9pY29ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3RpbWUvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2VhdGhlci1pY29ucy9jc3Mvd2VhdGhlci1pY29ucy5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9zdHlsZXMuc2NzcyJdLCJuYW1lcyI6WyJjb25zb2xlIiwibG9nIiwiTWFpbiIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uRG9tQ29udGVudExvYWRlZCIsImJpbmQiLCJuYXZpZ2F0b3IiLCJFcnJvciIsInVwZGF0ZVdlYXRoZXIiLCJyZWZyZXNoQnV0dG9uIiwicXVlcnlTZWxlY3RvciIsInNldEJ1c3kiLCJnZW9sb2NhdGlvbiIsImdldEN1cnJlbnRQb3NpdGlvbiIsIm9uUmVzb2x2ZUN1cnJlbnRQb3NpdGlvbiIsImUiLCJzZXRFcnJvciIsIm1lc3NhZ2UiLCJ3YXJuIiwiaW5uZXJIVE1MIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiZGF0YSIsImNsYXNzTmFtZSIsIndlYXRoZXIiLCJpZCIsImlubmVyVGV4dCIsImRlc2NyaXB0aW9uIiwibmFtZSIsIm1haW4iLCJ0ZW1wIiwidGVtcF9taW4iLCJ0ZW1wX21heCIsImh1bWlkaXR5IiwicHJlc3N1cmUiLCJ0YXJnZXQiLCJsaXN0IiwiZmMiLCJlbCIsImNyZWF0ZUVsZW1lbnQiLCJkdF90eHQiLCJhcHBlbmRDaGlsZCIsInBvcyIsIlByb21pc2UiLCJhbGwiLCJjb29yZHMiLCJ0aGVuIiwidmFsdWVzIiwid2VhdGhlckRhdGEiLCJmb3JlY2FzdERhdGEiLCJyZW5kZXJDdXJyZW50V2VhdGhlciIsInJlbmRlckZvcmVjYXN0V2VhdGhlciIsInNldElkbGUiLCJjYXRjaCIsImV4cG9ydHMiLCJnZXRGb3JlY2FzdCIsIm9wdGlvbnMiLCJyZXNvbHZlIiwicmVqZWN0IiwidXJsIiwiZW5kUG9pbnQiLCJrZXkiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsInhociIsIlhNTEh0dHBSZXF1ZXN0IiwianNvbiIsIm9wZW4iLCJKU09OIiwicGFyc2UiLCJyZXNwb25zZVRleHQiLCJlcnJvciIsInNlbmQiLCJnZXRXZWF0aGVyIiwiYXBpIiwicmVzb2x2ZUljb24iLCJpY29uIiwiaWNvbnMiLCJsYWJlbCIsInRvSG91cjEyIiwidGltZSIsImgiLCJwYXJzZUludCIsInNwbGl0IiwicG9zdGZpeCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDN0RBOztBQUVBOztBQUNBOztBQUNBOztBQUVBQSxRQUFRQyxHQUFSLENBQVksd0JBQVo7QUFDQSxpQjs7Ozs7Ozs7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LFFBQUlDLFVBQVVILElBQUksRUFBSixHQUFTLElBQVQsR0FBZ0IsSUFBOUI7QUFDQUEsUUFBSUEsSUFBSSxFQUFKLEdBQVNBLElBQUksRUFBYixHQUFrQkEsTUFBTSxDQUFOLEdBQVUsRUFBVixHQUFlQSxDQUFyQztBQUNBLFdBQU9BLElBQUlHLE9BQVg7QUFDSCxDQUxELEM7Ozs7OztBQ0pBLHlDOzs7Ozs7QUNBQSx5Qzs7Ozs7O0FDQUEseUMiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgM2Q0YmQwYzUzZGM5N2IyZjliYWUiLCJpbXBvcnQge01haW59IGZyb20gJy4vYXBwL21haW4nO1xuXG5pbXBvcnQgJ25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzcyc7XG5pbXBvcnQgJ3dlYXRoZXItaWNvbnMvY3NzL3dlYXRoZXItaWNvbnMuY3NzJztcbmltcG9ydCAnLi9zdHlsZXMvc3R5bGVzLnNjc3MnO1xuXG5jb25zb2xlLmxvZygnV2VsY29tZSB0byBXZWF0aGVyQnV6eicpO1xubmV3IE1haW4oKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAuanMiLCJpbXBvcnQge2dldEZvcmVjYXN0LCBnZXRXZWF0aGVyfSBmcm9tICcuL3dlYXRoZXIvYXBpJztcbmltcG9ydCB7cmVzb2x2ZUljb259IGZyb20gJy4vd2VhdGhlci91dGlscyc7XG5pbXBvcnQge3RvSG91cjEyfSBmcm9tICcuL3RpbWUvdXRpbHMnO1xuXG5jbGFzcyBNYWluIHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgdGhpcy5vbkRvbUNvbnRlbnRMb2FkZWQuYmluZCh0aGlzKSk7XG4gICAgICAgIGlmICghJ2dlb2xvY2F0aW9uJyBpbiBuYXZpZ2F0b3IpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignR2VvbG9jYXRpb24gbm90IHN1cHBvcnRlZCBvbiBicm93c2VyIScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlV2VhdGhlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERPTUNvbnRlbnRMb2FkZWRcbiAgICAgKi9cbiAgICBvbkRvbUNvbnRlbnRMb2FkZWQoKSB7XG4gICAgICAgIGxldCByZWZyZXNoQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3JlZnJlc2gnKTtcbiAgICAgICAgcmVmcmVzaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0QnVzeSgpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVXZWF0aGVyKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgd2VhdGhlci5cbiAgICAgKi9cbiAgICB1cGRhdGVXZWF0aGVyKCkge1xuICAgICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKHRoaXMub25SZXNvbHZlQ3VycmVudFBvc2l0aW9uLmJpbmQodGhpcyksXG4gICAgICAgICAgICAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0RXJyb3IoZS5tZXNzYWdlID8gZS5tZXNzYWdlIDogXCJMb2NhdGlvbiB1bmF2YWlsYWJsZSFcIik7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdPb3BzIScsIGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vIG5vaW5zcGVjdGlvbiBKU01ldGhvZENhbkJlU3RhdGljXG4gICAgLyoqXG4gICAgICogU2V0IGJ1c3kgc3RhdGVcbiAgICAgKi9cbiAgICBzZXRCdXN5KCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9hZGVyJykuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwdWxzYXRlXCI+TG9hZGluZy4uLjwvc3Bhbj5cbiAgICAgICAgYDtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9hZGVyJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IGlkbGUgc3RhdGVcbiAgICAgKi9cbiAgICBzZXRJZGxlKCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2FkZXInKS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEaXNwbGF5IGVycm9yIG1lc3NhZ2VcbiAgICAgKiBAcGFyYW0gbWVzc2FnZVxuICAgICAqL1xuICAgIHNldEVycm9yKG1lc3NhZ2UpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvYWRlcicpLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgIDxoMT5FcnJvciE8L2gxPlxuICAgICAgICAgICAgICAgIDxzcGFuPiR7bWVzc2FnZX08L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIGA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVuZGVyIHRoZSBjdXJyZW50IHdlYXRoZXIgY29uZGl0aW9uc1xuICAgICAqIEBwYXJhbSB7e3dlYXRoZXIsIG5hbWUsIG1haW46IHt0ZW1wLCB0ZW1wX21pbiwgdGVtcF9tYXggaHVtaWRpdHksIHByZXNzdXJlfX19IGRhdGFcbiAgICAgKi9cbiAgICByZW5kZXJDdXJyZW50V2VhdGhlcihkYXRhKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53aScpLmNsYXNzTmFtZSA9IHJlc29sdmVJY29uKGRhdGEud2VhdGhlclswXS5pZCk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZXNjcmlwdGlvbicpLmlubmVyVGV4dCA9IGRhdGEud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvY2F0aW9uJykuaW5uZXJUZXh0ID0gZGF0YS5uYW1lO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVtcCcpLmlubmVyVGV4dCA9IGAke2RhdGEubWFpbi50ZW1wfcKwQ2A7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5taW5fbWF4JykuaW5uZXJUZXh0ID0gYCR7ZGF0YS5tYWluLnRlbXBfbWlufcKwQyAvICR7ZGF0YS5tYWluLnRlbXBfbWF4fcKwQ2A7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5odW1pZGl0eScpLmlubmVyVGV4dCA9IGAke2RhdGEubWFpbi5odW1pZGl0eX0lYDtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZXNzdXJlJykuaW5uZXJUZXh0ID0gYCR7ZGF0YS5tYWluLnByZXNzdXJlfWhQYWA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVuZGVyIHRoZSAzLWhvdXJseSB3ZWF0aGVyIGZvcmVjYXN0IGRhdGFcbiAgICAgKiBAcGFyYW0gZGF0YVxuICAgICAqL1xuICAgIHJlbmRlckZvcmVjYXN0V2VhdGhlcihkYXRhKSB7XG4gICAgICAgIGxldCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9yZWNhc3QnKTtcbiAgICAgICAgZm9yIChsZXQgZmMgb2YgZGF0YS5saXN0KSB7XG4gICAgICAgICAgICBsZXQgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgICAgICAgICAgIGVsLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImhvdXJcIj4ke3RvSG91cjEyKGZjLmR0X3R4dCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiJHtyZXNvbHZlSWNvbihmYy53ZWF0aGVyWzBdLmlkKX1cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZW1wXCI+JHtmYy5tYWluLnRlbXB9wrBDPC9zcGFuPlxuICAgICAgICAgICAgYDtcblxuICAgICAgICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKGVsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGhhbmRsZXIgZmlyZWQgd2hlbiB0aGUgY3VycmVudCBHUFMgbG9jYXRpb24gaXMgcmVzb2x2ZWQuXG4gICAgICogQHBhcmFtIHBvc1xuICAgICAqL1xuICAgIG9uUmVzb2x2ZUN1cnJlbnRQb3NpdGlvbihwb3MpIHtcbiAgICAgICAgUHJvbWlzZS5hbGwoW2dldFdlYXRoZXIocG9zLmNvb3JkcyksIGdldEZvcmVjYXN0KHBvcy5jb29yZHMpXSlcbiAgICAgICAgICAgIC50aGVuKCh2YWx1ZXMpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgW3dlYXRoZXJEYXRhLCBmb3JlY2FzdERhdGFdID0gdmFsdWVzO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyQ3VycmVudFdlYXRoZXIod2VhdGhlckRhdGEpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyRm9yZWNhc3RXZWF0aGVyKGZvcmVjYXN0RGF0YSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRJZGxlKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRFcnJvcignVW5hYmxlIHRvIGZldGNoIHdlYXRoZXIgZGF0YSEnKVxuICAgICAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnRzLk1haW4gPSBNYWluO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9tYWluLmpzIiwiaW1wb3J0IHthcGl9IGZyb20gJy4uLy4uL2NvbmZpZy9jb25maWcnO1xuXG4vKipcbiAqIEZldGNoIHRoZSAzIGhvdXJseSB3ZWF0aGVyIGZvcmVjYXN0LlxuICogQHBhcmFtIG9wdGlvbnNcbiAqIEByZXR1cm5zIHtQcm9taXNlfVxuICovXG5leHBvcnRzLmdldEZvcmVjYXN0ID0gKG9wdGlvbnMpID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBsZXQgdXJsID0gYCR7YXBpLmVuZFBvaW50fS9mb3JlY2FzdD9hcHBpZD0ke2FwaS5rZXl9YDtcbiAgICAgICAgdXJsICs9IGAmbGF0PSR7b3B0aW9ucy5sYXRpdHVkZX0mbG9uPSR7b3B0aW9ucy5sb25naXR1ZGV9JnVuaXRzPW1ldHJpY2A7XG5cbiAgICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpLCBqc29uO1xuICAgICAgICB4aHIub3BlbignR0VUJywgdXJsKTtcbiAgICAgICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGpzb24gPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ0F0dGVtcHQgdG8gcGFyc2UgSlNPTiBkYXRhIGhhcyBmYWlsZWQhJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXNvbHZlKGpzb24pO1xuICAgICAgICB9KTtcbiAgICAgICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ3RpbWVvdXQnLCAoKSA9PiB7XG4gICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHhoci5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsICgpID0+IHtcbiAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgeGhyLnNlbmQoKTtcbiAgICB9KTtcbn07XG5cbi8qKlxuICogRmV0Y2ggdGhlIGN1cnJlbnQgd2VhdGhlciBjb25kaXRpb25zLlxuICogQHBhcmFtIG9wdGlvbnNcbiAqIEByZXR1cm5zIHtQcm9taXNlfVxuICovXG5leHBvcnRzLmdldFdlYXRoZXIgPSAob3B0aW9ucykgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGxldCB1cmwgPSBgJHthcGkuZW5kUG9pbnR9L3dlYXRoZXI/YXBwaWQ9JHthcGkua2V5fWA7XG4gICAgICAgIHVybCArPSBgJmxhdD0ke29wdGlvbnMubGF0aXR1ZGV9Jmxvbj0ke29wdGlvbnMubG9uZ2l0dWRlfSZ1bml0cz1tZXRyaWNgO1xuXG4gICAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKSwganNvbjtcbiAgICAgICAgeGhyLm9wZW4oJ0dFVCcsIHVybCk7XG4gICAgICAgIHhoci5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBqc29uID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdBdHRlbXB0IHRvIHBhcnNlIEpTT04gZGF0YSBoYXMgZmFpbGVkIScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzb2x2ZShqc29uKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHhoci5hZGRFdmVudExpc3RlbmVyKCd0aW1lb3V0JywgKCkgPT4ge1xuICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgIH0pO1xuICAgICAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoKSA9PiB7XG4gICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHhoci5zZW5kKCk7XG4gICAgfSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC93ZWF0aGVyL2FwaS5qcyIsIi8qKlxuICogVmVyeSBiYXNpYyBhcHBsaWNhdGlvbiBjb25maWd1cmF0aW9uXG4gKiBAdHlwZSB7e319XG4gKi9cbmV4cG9ydHMuYXBpID0ge1xuICAgIGtleTogJzBkZWJkN2U3MThmNWU0NGNjNzA0NDA2ZjI0ZmZmYmMwJyxcbiAgICBlbmRQb2ludDogJ2h0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNSdcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29uZmlnL2NvbmZpZy5qcyIsImltcG9ydCB7aWNvbnN9IGZyb20gJy4uLy4uL2NvbmZpZy9pY29ucyc7XG5cbi8qKlxuICogUmV0dXJucyBhIGNsYXNzIG5hbWUgc3RyaW5nIGZvciB0aGUgY29ycmVzcG9uZGluZyBPcGVuV2VhdGhlck1hWyBpY29uIElELlxuICogQHBhcmFtIHtpbnR9IGlkIE9wZW5XZWF0aGVyTWFwIGljb24gSURcbiAqIEByZXR1cm5zIHtzdHJpbmd9IENsYXNzIG5hbWUsIGZvciBleGFtcGxlIFwid2kgd2ktZGF5LXJhaW5cIlxuICovXG5leHBvcnRzLnJlc29sdmVJY29uID0gKGlkKSA9PiB7XG4gICAgbGV0IGljb24gPSBpY29uc1tpZF0uaWNvbjtcblxuICAgIGlmICghKGlkID4gNjk5ICYmIGlkIDwgODAwKSAmJiAhKGlkID4gODk5ICYmIGlkIDwgMTAwMCkpIHtcbiAgICAgICAgaWNvbiA9ICdkYXktJyArIGljb247XG4gICAgfVxuXG4gICAgcmV0dXJuIGB3aSB3aS0ke2ljb259YDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL3dlYXRoZXIvdXRpbHMuanMiLCIvKipcbiAqIFNpbXBsZSBtYXBwaW5nIG1hbmlmZXN0IGZvciBPcGVuV2VhdGhlck1hcCBpY29uIElEcyB0byBXZWF0aGVyIEljb25zIGZvbnRcbiAqIEB0eXBlIHt7fX1cbiAqL1xuZXhwb3J0cy5pY29ucyA9IHtcbiAgICAyMDA6IHtcbiAgICAgICAgbGFiZWw6IFwidGh1bmRlcnN0b3JtIHdpdGggbGlnaHQgcmFpblwiLFxuICAgICAgICBpY29uOiBcInN0b3JtLXNob3dlcnNcIlxuICAgIH0sXG4gICAgMjAxOiB7XG4gICAgICAgIGxhYmVsOiBcInRodW5kZXJzdG9ybSB3aXRoIHJhaW5cIixcbiAgICAgICAgaWNvbjogXCJzdG9ybS1zaG93ZXJzXCJcbiAgICB9LFxuICAgIDIwMjoge1xuICAgICAgICBsYWJlbDogXCJ0aHVuZGVyc3Rvcm0gd2l0aCBoZWF2eSByYWluXCIsXG4gICAgICAgIGljb246IFwic3Rvcm0tc2hvd2Vyc1wiXG4gICAgfSxcbiAgICAyMTA6IHtcbiAgICAgICAgbGFiZWw6IFwibGlnaHQgdGh1bmRlcnN0b3JtXCIsXG4gICAgICAgIGljb246IFwic3Rvcm0tc2hvd2Vyc1wiXG4gICAgfSxcbiAgICAyMTE6IHtcbiAgICAgICAgbGFiZWw6IFwidGh1bmRlcnN0b3JtXCIsXG4gICAgICAgIGljb246IFwidGh1bmRlcnN0b3JtXCJcbiAgICB9LFxuICAgIDIxMjoge1xuICAgICAgICBsYWJlbDogXCJoZWF2eSB0aHVuZGVyc3Rvcm1cIixcbiAgICAgICAgaWNvbjogXCJ0aHVuZGVyc3Rvcm1cIlxuICAgIH0sXG4gICAgMjIxOiB7XG4gICAgICAgIGxhYmVsOiBcInJhZ2dlZCB0aHVuZGVyc3Rvcm1cIixcbiAgICAgICAgaWNvbjogXCJ0aHVuZGVyc3Rvcm1cIlxuICAgIH0sXG4gICAgMjMwOiB7XG4gICAgICAgIGxhYmVsOiBcInRodW5kZXJzdG9ybSB3aXRoIGxpZ2h0IGRyaXp6bGVcIixcbiAgICAgICAgaWNvbjogXCJzdG9ybS1zaG93ZXJzXCJcbiAgICB9LFxuICAgIDIzMToge1xuICAgICAgICBsYWJlbDogXCJ0aHVuZGVyc3Rvcm0gd2l0aCBkcml6emxlXCIsXG4gICAgICAgIGljb246IFwic3Rvcm0tc2hvd2Vyc1wiXG4gICAgfSxcbiAgICAyMzI6IHtcbiAgICAgICAgbGFiZWw6IFwidGh1bmRlcnN0b3JtIHdpdGggaGVhdnkgZHJpenpsZVwiLFxuICAgICAgICBpY29uOiBcInN0b3JtLXNob3dlcnNcIlxuICAgIH0sXG4gICAgMzAwOiB7XG4gICAgICAgIGxhYmVsOiBcImxpZ2h0IGludGVuc2l0eSBkcml6emxlXCIsXG4gICAgICAgIGljb246IFwic3ByaW5rbGVcIlxuICAgIH0sXG4gICAgMzAxOiB7XG4gICAgICAgIGxhYmVsOiBcImRyaXp6bGVcIixcbiAgICAgICAgaWNvbjogXCJzcHJpbmtsZVwiXG4gICAgfSxcbiAgICAzMDI6IHtcbiAgICAgICAgbGFiZWw6IFwiaGVhdnkgaW50ZW5zaXR5IGRyaXp6bGVcIixcbiAgICAgICAgaWNvbjogXCJzcHJpbmtsZVwiXG4gICAgfSxcbiAgICAzMTA6IHtcbiAgICAgICAgbGFiZWw6IFwibGlnaHQgaW50ZW5zaXR5IGRyaXp6bGUgcmFpblwiLFxuICAgICAgICBpY29uOiBcInNwcmlua2xlXCJcbiAgICB9LFxuICAgIDMxMToge1xuICAgICAgICBsYWJlbDogXCJkcml6emxlIHJhaW5cIixcbiAgICAgICAgaWNvbjogXCJzcHJpbmtsZVwiXG4gICAgfSxcbiAgICAzMTI6IHtcbiAgICAgICAgbGFiZWw6IFwiaGVhdnkgaW50ZW5zaXR5IGRyaXp6bGUgcmFpblwiLFxuICAgICAgICBpY29uOiBcInNwcmlua2xlXCJcbiAgICB9LFxuICAgIDMxMzoge1xuICAgICAgICBsYWJlbDogXCJzaG93ZXIgcmFpbiBhbmQgZHJpenpsZVwiLFxuICAgICAgICBpY29uOiBcInNwcmlua2xlXCJcbiAgICB9LFxuICAgIDMxNDoge1xuICAgICAgICBsYWJlbDogXCJoZWF2eSBzaG93ZXIgcmFpbiBhbmQgZHJpenpsZVwiLFxuICAgICAgICBpY29uOiBcInNwcmlua2xlXCJcbiAgICB9LFxuICAgIDMyMToge1xuICAgICAgICBsYWJlbDogXCJzaG93ZXIgZHJpenpsZVwiLFxuICAgICAgICBpY29uOiBcInNwcmlua2xlXCJcbiAgICB9LFxuICAgIDUwMDoge1xuICAgICAgICBsYWJlbDogXCJsaWdodCByYWluXCIsXG4gICAgICAgIGljb246IFwicmFpblwiXG4gICAgfSxcbiAgICA1MDE6IHtcbiAgICAgICAgbGFiZWw6IFwibW9kZXJhdGUgcmFpblwiLFxuICAgICAgICBpY29uOiBcInJhaW5cIlxuICAgIH0sXG4gICAgNTAyOiB7XG4gICAgICAgIGxhYmVsOiBcImhlYXZ5IGludGVuc2l0eSByYWluXCIsXG4gICAgICAgIGljb246IFwicmFpblwiXG4gICAgfSxcbiAgICA1MDM6IHtcbiAgICAgICAgbGFiZWw6IFwidmVyeSBoZWF2eSByYWluXCIsXG4gICAgICAgIGljb246IFwicmFpblwiXG4gICAgfSxcbiAgICA1MDQ6IHtcbiAgICAgICAgbGFiZWw6IFwiZXh0cmVtZSByYWluXCIsXG4gICAgICAgIGljb246IFwicmFpblwiXG4gICAgfSxcbiAgICA1MTE6IHtcbiAgICAgICAgbGFiZWw6IFwiZnJlZXppbmcgcmFpblwiLFxuICAgICAgICBpY29uOiBcInJhaW4tbWl4XCJcbiAgICB9LFxuICAgIDUyMDoge1xuICAgICAgICBsYWJlbDogXCJsaWdodCBpbnRlbnNpdHkgc2hvd2VyIHJhaW5cIixcbiAgICAgICAgaWNvbjogXCJzaG93ZXJzXCJcbiAgICB9LFxuICAgIDUyMToge1xuICAgICAgICBsYWJlbDogXCJzaG93ZXIgcmFpblwiLFxuICAgICAgICBpY29uOiBcInNob3dlcnNcIlxuICAgIH0sXG4gICAgNTIyOiB7XG4gICAgICAgIGxhYmVsOiBcImhlYXZ5IGludGVuc2l0eSBzaG93ZXIgcmFpblwiLFxuICAgICAgICBpY29uOiBcInNob3dlcnNcIlxuICAgIH0sXG4gICAgNTMxOiB7XG4gICAgICAgIGxhYmVsOiBcInJhZ2dlZCBzaG93ZXIgcmFpblwiLFxuICAgICAgICBpY29uOiBcInNob3dlcnNcIlxuICAgIH0sXG4gICAgNjAwOiB7XG4gICAgICAgIGxhYmVsOiBcImxpZ2h0IHNub3dcIixcbiAgICAgICAgaWNvbjogXCJzbm93XCJcbiAgICB9LFxuICAgIDYwMToge1xuICAgICAgICBsYWJlbDogXCJzbm93XCIsXG4gICAgICAgIGljb246IFwic25vd1wiXG4gICAgfSxcbiAgICA2MDI6IHtcbiAgICAgICAgbGFiZWw6IFwiaGVhdnkgc25vd1wiLFxuICAgICAgICBpY29uOiBcInNub3dcIlxuICAgIH0sXG4gICAgNjExOiB7XG4gICAgICAgIGxhYmVsOiBcInNsZWV0XCIsXG4gICAgICAgIGljb246IFwic2xlZXRcIlxuICAgIH0sXG4gICAgNjEyOiB7XG4gICAgICAgIGxhYmVsOiBcInNob3dlciBzbGVldFwiLFxuICAgICAgICBpY29uOiBcInNsZWV0XCJcbiAgICB9LFxuICAgIDYxNToge1xuICAgICAgICBsYWJlbDogXCJsaWdodCByYWluIGFuZCBzbm93XCIsXG4gICAgICAgIGljb246IFwicmFpbi1taXhcIlxuICAgIH0sXG4gICAgNjE2OiB7XG4gICAgICAgIGxhYmVsOiBcInJhaW4gYW5kIHNub3dcIixcbiAgICAgICAgaWNvbjogXCJyYWluLW1peFwiXG4gICAgfSxcbiAgICA2MjA6IHtcbiAgICAgICAgbGFiZWw6IFwibGlnaHQgc2hvd2VyIHNub3dcIixcbiAgICAgICAgaWNvbjogXCJyYWluLW1peFwiXG4gICAgfSxcbiAgICA2MjE6IHtcbiAgICAgICAgbGFiZWw6IFwic2hvd2VyIHNub3dcIixcbiAgICAgICAgaWNvbjogXCJyYWluLW1peFwiXG4gICAgfSxcbiAgICA2MjI6IHtcbiAgICAgICAgbGFiZWw6IFwiaGVhdnkgc2hvd2VyIHNub3dcIixcbiAgICAgICAgaWNvbjogXCJyYWluLW1peFwiXG4gICAgfSxcbiAgICA3MDE6IHtcbiAgICAgICAgbGFiZWw6IFwibWlzdFwiLFxuICAgICAgICBpY29uOiBcInNwcmlua2xlXCJcbiAgICB9LFxuICAgIDcxMToge1xuICAgICAgICBsYWJlbDogXCJzbW9rZVwiLFxuICAgICAgICBpY29uOiBcInNtb2tlXCJcbiAgICB9LFxuICAgIDcyMToge1xuICAgICAgICBsYWJlbDogXCJoYXplXCIsXG4gICAgICAgIGljb246IFwiZGF5LWhhemVcIlxuICAgIH0sXG4gICAgNzMxOiB7XG4gICAgICAgIGxhYmVsOiBcInNhbmQsIGR1c3Qgd2hpcmxzXCIsXG4gICAgICAgIGljb246IFwiY2xvdWR5LWd1c3RzXCJcbiAgICB9LFxuICAgIDc0MToge1xuICAgICAgICBsYWJlbDogXCJmb2dcIixcbiAgICAgICAgaWNvbjogXCJmb2dcIlxuICAgIH0sXG4gICAgNzUxOiB7XG4gICAgICAgIGxhYmVsOiBcInNhbmRcIixcbiAgICAgICAgaWNvbjogXCJjbG91ZHktZ3VzdHNcIlxuICAgIH0sXG4gICAgNzYxOiB7XG4gICAgICAgIGxhYmVsOiBcImR1c3RcIixcbiAgICAgICAgaWNvbjogXCJkdXN0XCJcbiAgICB9LFxuICAgIDc2Mjoge1xuICAgICAgICBsYWJlbDogXCJ2b2xjYW5pYyBhc2hcIixcbiAgICAgICAgaWNvbjogXCJzbW9nXCJcbiAgICB9LFxuICAgIDc3MToge1xuICAgICAgICBsYWJlbDogXCJzcXVhbGxzXCIsXG4gICAgICAgIGljb246IFwiZGF5LXdpbmR5XCJcbiAgICB9LFxuICAgIDc4MToge1xuICAgICAgICBsYWJlbDogXCJ0b3JuYWRvXCIsXG4gICAgICAgIGljb246IFwidG9ybmFkb1wiXG4gICAgfSxcbiAgICA4MDA6IHtcbiAgICAgICAgbGFiZWw6IFwiY2xlYXIgc2t5XCIsXG4gICAgICAgIGljb246IFwic3VubnlcIlxuICAgIH0sXG4gICAgODAxOiB7XG4gICAgICAgIGxhYmVsOiBcImZldyBjbG91ZHNcIixcbiAgICAgICAgaWNvbjogXCJjbG91ZHlcIlxuICAgIH0sXG4gICAgODAyOiB7XG4gICAgICAgIGxhYmVsOiBcInNjYXR0ZXJlZCBjbG91ZHNcIixcbiAgICAgICAgaWNvbjogXCJjbG91ZHlcIlxuICAgIH0sXG4gICAgODAzOiB7XG4gICAgICAgIGxhYmVsOiBcImJyb2tlbiBjbG91ZHNcIixcbiAgICAgICAgaWNvbjogXCJjbG91ZHlcIlxuICAgIH0sXG4gICAgODA0OiB7XG4gICAgICAgIGxhYmVsOiBcIm92ZXJjYXN0IGNsb3Vkc1wiLFxuICAgICAgICBpY29uOiBcImNsb3VkeVwiXG4gICAgfSxcblxuICAgIDkwMDoge1xuICAgICAgICBsYWJlbDogXCJ0b3JuYWRvXCIsXG4gICAgICAgIGljb246IFwidG9ybmFkb1wiXG4gICAgfSxcbiAgICA5MDE6IHtcbiAgICAgICAgbGFiZWw6IFwidHJvcGljYWwgc3Rvcm1cIixcbiAgICAgICAgaWNvbjogXCJodXJyaWNhbmVcIlxuICAgIH0sXG4gICAgOTAyOiB7XG4gICAgICAgIGxhYmVsOiBcImh1cnJpY2FuZVwiLFxuICAgICAgICBpY29uOiBcImh1cnJpY2FuZVwiXG4gICAgfSxcbiAgICA5MDM6IHtcbiAgICAgICAgbGFiZWw6IFwiY29sZFwiLFxuICAgICAgICBpY29uOiBcInNub3dmbGFrZS1jb2xkXCJcbiAgICB9LFxuICAgIDkwNDoge1xuICAgICAgICBsYWJlbDogXCJob3RcIixcbiAgICAgICAgaWNvbjogXCJob3RcIlxuICAgIH0sXG4gICAgOTA1OiB7XG4gICAgICAgIGxhYmVsOiBcIndpbmR5XCIsXG4gICAgICAgIGljb246IFwid2luZHlcIlxuICAgIH0sXG4gICAgOTA2OiB7XG4gICAgICAgIGxhYmVsOiBcImhhaWxcIixcbiAgICAgICAgaWNvbjogXCJoYWlsXCJcbiAgICB9LFxuICAgIDk1MToge1xuICAgICAgICBsYWJlbDogXCJjYWxtXCIsXG4gICAgICAgIGljb246IFwic3VubnlcIlxuICAgIH0sXG4gICAgOTUyOiB7XG4gICAgICAgIGxhYmVsOiBcImxpZ2h0IGJyZWV6ZVwiLFxuICAgICAgICBpY29uOiBcImNsb3VkeS1ndXN0c1wiXG4gICAgfSxcbiAgICA5NTM6IHtcbiAgICAgICAgbGFiZWw6IFwiZ2VudGxlIGJyZWV6ZVwiLFxuICAgICAgICBpY29uOiBcImNsb3VkeS1ndXN0c1wiXG4gICAgfSxcbiAgICA5NTQ6IHtcbiAgICAgICAgbGFiZWw6IFwibW9kZXJhdGUgYnJlZXplXCIsXG4gICAgICAgIGljb246IFwiY2xvdWR5LWd1c3RzXCJcbiAgICB9LFxuICAgIDk1NToge1xuICAgICAgICBsYWJlbDogXCJmcmVzaCBicmVlemVcIixcbiAgICAgICAgaWNvbjogXCJjbG91ZHktZ3VzdHNcIlxuICAgIH0sXG4gICAgOTU2OiB7XG4gICAgICAgIGxhYmVsOiBcInN0cm9uZyBicmVlemVcIixcbiAgICAgICAgaWNvbjogXCJjbG91ZHktZ3VzdHNcIlxuICAgIH0sXG4gICAgOTU3OiB7XG4gICAgICAgIGxhYmVsOiBcImhpZ2ggd2luZCwgbmVhciBnYWxlXCIsXG4gICAgICAgIGljb246IFwiY2xvdWR5LWd1c3RzXCJcbiAgICB9LFxuICAgIDk1ODoge1xuICAgICAgICBsYWJlbDogXCJnYWxlXCIsXG4gICAgICAgIGljb246IFwiY2xvdWR5LWd1c3RzXCJcbiAgICB9LFxuICAgIDk1OToge1xuICAgICAgICBsYWJlbDogXCJzZXZlcmUgZ2FsZVwiLFxuICAgICAgICBpY29uOiBcImNsb3VkeS1ndXN0c1wiXG4gICAgfSxcbiAgICA5NjA6IHtcbiAgICAgICAgbGFiZWw6IFwic3Rvcm1cIixcbiAgICAgICAgaWNvbjogXCJ0aHVuZGVyc3Rvcm1cIlxuICAgIH0sXG4gICAgOTYxOiB7XG4gICAgICAgIGxhYmVsOiBcInZpb2xlbnQgc3Rvcm1cIixcbiAgICAgICAgaWNvbjogXCJ0aHVuZGVyc3Rvcm1cIlxuICAgIH0sXG4gICAgOTYyOiB7XG4gICAgICAgIGxhYmVsOiBcImh1cnJpY2FuZVwiLFxuICAgICAgICBpY29uOiBcImNsb3VkeS1ndXN0c1wiXG4gICAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb25maWcvaWNvbnMuanMiLCIvKipcbiAqIENvbnZlcnRzIHRoZSBnaXZlbiB0aW1lIHN0cmluZyB0byAxMi1ob3VyIGZvcm1hdCBhbmQgcG9zdCBmaXhlcyBhbS9wbVxuICogRm9yIGV4YW1wbGUsIDEzOjAwOjAwIHdpbGwgYmVjb21lIDFwbS5cbiAqL1xuZXhwb3J0cy50b0hvdXIxMiA9ICh0aW1lKSA9PiB7XG4gICAgbGV0IGggPSBwYXJzZUludCh0aW1lLnNwbGl0KCcgJylbMV0uc3BsaXQoJzonKVswXSwgMTApO1xuICAgIGxldCBwb3N0Zml4ID0gaCA8IDEyID8gJ2FtJyA6ICdwbSc7XG4gICAgaCA9IGggPiAxMiA/IGggLSAxMiA6IGggPT09IDAgPyAxMiA6IGg7XG4gICAgcmV0dXJuIGggKyBwb3N0Zml4O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvdGltZS91dGlscy5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbm9ybWFsaXplLmNzcy9ub3JtYWxpemUuY3NzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2VhdGhlci1pY29ucy9jc3Mvd2VhdGhlci1pY29ucy5jc3Ncbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zdHlsZXMvc3R5bGVzLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==