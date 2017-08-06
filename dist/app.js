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
(0, _main.main)();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _api = __webpack_require__(2);

var _utils = __webpack_require__(4);

var _utils2 = __webpack_require__(6);

exports.main = function () {
    if ('geolocation' in navigator) {

        var weatherData = null,
            forecastData = null;

        navigator.geolocation.getCurrentPosition(function (pos) {
            var options = {
                lat: pos.coords.latitude,
                long: pos.coords.longitude
            };

            (0, _api.getWeather)(options, function (weatherData) {
                document.querySelector('.wi').className = (0, _utils.resolveIcon)(weatherData.weather[0].id);
                document.querySelector('.description').innerText = weatherData.weather[0].description;
                document.querySelector('.location').innerText = weatherData.name;
                document.querySelector('.temp').innerText = weatherData.main.temp + '\xB0C';
                document.querySelector('.min_max').innerText = weatherData.main.temp_min + '\xB0C / ' + weatherData.main.temp_max + '\xB0C';
                document.querySelector('.humidity').innerText = weatherData.main.humidity + '%';
                document.querySelector('.pressure').innerText = weatherData.main.pressure + 'hPa';
            });

            (0, _api.getForecast)(options, function (forecastData) {
                var target = document.querySelector('.forecast');
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = forecastData.list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var fc = _step.value;

                        var el = document.createElement('span');

                        el.innerHTML = '\n                            <span>' + (0, _utils2.toHour12)(fc.dt_txt) + '</span>\n                            <span class="' + (0, _utils.resolveIcon)(fc.weather[0].id) + '"></span>\n                            <span>' + fc.main.temp + '\xB0C</span>\n                        ';

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
            });
        }, function (e) {
            console.warn(e.message);
        });
    }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _config = __webpack_require__(3);

exports.getForecast = function (options, success) {
    var url = _config.api.endPoint + '/forecast?appid=' + _config.api.key;
    url += '&lat=' + options.lat + '&lon=' + options.long + '&units=metric';

    var xhr = new XMLHttpRequest(),
        json = void 0;
    xhr.open('GET', url);
    xhr.addEventListener('load', function () {
        try {
            json = JSON.parse(xhr.responseText);
        } catch (error) {
            console.warn('Attempt to parse JSON data has failed!');
        }
        success(json);
    });
    xhr.send();
};

exports.getWeather = function (options, success) {
    var url = _config.api.endPoint + '/weather?appid=' + _config.api.key;
    url += '&lat=' + options.lat + '&lon=' + options.long + '&units=metric';

    var xhr = new XMLHttpRequest(),
        json = void 0;
    xhr.open('GET', url);
    xhr.addEventListener('load', function () {
        try {
            json = JSON.parse(xhr.responseText);
        } catch (error) {
            console.warn('Attempt to parse JSON data has failed!');
        }
        success(json);
    });
    xhr.send();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDM0Yjc2N2JmZDk0N2UwYWMzMzMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC93ZWF0aGVyL2FwaS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3dlYXRoZXIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmZpZy9pY29ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3RpbWUvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2VhdGhlci1pY29ucy9jc3Mvd2VhdGhlci1pY29ucy5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9zdHlsZXMuc2NzcyJdLCJuYW1lcyI6WyJjb25zb2xlIiwibG9nIiwiZXhwb3J0cyIsIm1haW4iLCJuYXZpZ2F0b3IiLCJ3ZWF0aGVyRGF0YSIsImZvcmVjYXN0RGF0YSIsImdlb2xvY2F0aW9uIiwiZ2V0Q3VycmVudFBvc2l0aW9uIiwicG9zIiwib3B0aW9ucyIsImxhdCIsImNvb3JkcyIsImxhdGl0dWRlIiwibG9uZyIsImxvbmdpdHVkZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNsYXNzTmFtZSIsIndlYXRoZXIiLCJpZCIsImlubmVyVGV4dCIsImRlc2NyaXB0aW9uIiwibmFtZSIsInRlbXAiLCJ0ZW1wX21pbiIsInRlbXBfbWF4IiwiaHVtaWRpdHkiLCJwcmVzc3VyZSIsInRhcmdldCIsImxpc3QiLCJmYyIsImVsIiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsImR0X3R4dCIsImFwcGVuZENoaWxkIiwiZSIsIndhcm4iLCJtZXNzYWdlIiwiZ2V0Rm9yZWNhc3QiLCJzdWNjZXNzIiwidXJsIiwiZW5kUG9pbnQiLCJrZXkiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsImpzb24iLCJvcGVuIiwiYWRkRXZlbnRMaXN0ZW5lciIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlVGV4dCIsImVycm9yIiwic2VuZCIsImdldFdlYXRoZXIiLCJhcGkiLCJyZXNvbHZlSWNvbiIsImljb24iLCJpY29ucyIsImxhYmVsIiwidG9Ib3VyMTIiLCJ0aW1lIiwiaCIsInBhcnNlSW50Iiwic3BsaXQiLCJwb3N0Zml4Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUM3REE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUFBLFFBQVFDLEdBQVIsQ0FBWSx3QkFBWjtBQUNBLGtCOzs7Ozs7Ozs7QUNQQTs7QUFDQTs7QUFDQTs7QUFFQUMsUUFBUUMsSUFBUixHQUFlLFlBQVk7QUFDdkIsUUFBSSxpQkFBaUJDLFNBQXJCLEVBQWdDOztBQUU1QixZQUFJQyxjQUFjLElBQWxCO0FBQUEsWUFBd0JDLGVBQWUsSUFBdkM7O0FBRUFGLGtCQUFVRyxXQUFWLENBQXNCQyxrQkFBdEIsQ0FDSSxVQUFDQyxHQUFELEVBQVM7QUFDTCxnQkFBSUMsVUFBVTtBQUNWQyxxQkFBS0YsSUFBSUcsTUFBSixDQUFXQyxRQUROO0FBRVZDLHNCQUFNTCxJQUFJRyxN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QixDQUE5QixDQUFULEVBQTJDLEVBQTNDLENBQVI7QUFDQSxRQUFJQyxVQUFVSCxJQUFJLEVBQUosR0FBUyxJQUFULEdBQWdCLElBQTlCO0FBQ0FBLFFBQUlBLElBQUksRUFBSixHQUFTQSxJQUFJLEVBQWIsR0FBa0JBLE1BQU0sQ0FBTixHQUFVLEVBQVYsR0FBZUEsQ0FBckM7QUFDQSxXQUFPQSxJQUFJRyxPQUFYO0FBQ0gsQ0FMRCxDOzs7Ozs7QUNKQSx5Qzs7Ozs7O0FDQUEseUM7Ozs7OztBQ0FBLHlDIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGQzNGI3NjdiZmQ5NDdlMGFjMzMzIiwiaW1wb3J0IHttYWlufSBmcm9tICcuL2FwcC9tYWluJztcblxuaW1wb3J0ICdub3JtYWxpemUuY3NzL25vcm1hbGl6ZS5jc3MnO1xuaW1wb3J0ICd3ZWF0aGVyLWljb25zL2Nzcy93ZWF0aGVyLWljb25zLmNzcyc7XG5pbXBvcnQgJy4vc3R5bGVzL3N0eWxlcy5zY3NzJztcblxuY29uc29sZS5sb2coJ1dlbGNvbWUgdG8gV2VhdGhlckJ1enonKTtcbm1haW4oKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAuanMiLCJpbXBvcnQge2dldEZvcmVjYXN0LCBnZXRXZWF0aGVyfSBmcm9tICcuL3dlYXRoZXIvYXBpJztcbmltcG9ydCB7cmVzb2x2ZUljb259IGZyb20gJy4vd2VhdGhlci91dGlscyc7XG5pbXBvcnQge3RvSG91cjEyfSBmcm9tICcuL3RpbWUvdXRpbHMnO1xuXG5leHBvcnRzLm1haW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCdnZW9sb2NhdGlvbicgaW4gbmF2aWdhdG9yKSB7XG5cbiAgICAgICAgbGV0IHdlYXRoZXJEYXRhID0gbnVsbCwgZm9yZWNhc3REYXRhID0gbnVsbDtcblxuICAgICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKFxuICAgICAgICAgICAgKHBvcykgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICBsYXQ6IHBvcy5jb29yZHMubGF0aXR1ZGUsXG4gICAgICAgICAgICAgICAgICAgIGxvbmc6IHBvcy5jb29yZHMubG9uZ2l0dWRlXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGdldFdlYXRoZXIob3B0aW9ucywgKHdlYXRoZXJEYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53aScpLmNsYXNzTmFtZSA9IHJlc29sdmVJY29uKHdlYXRoZXJEYXRhLndlYXRoZXJbMF0uaWQpO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVzY3JpcHRpb24nKS5pbm5lclRleHQgPSB3ZWF0aGVyRGF0YS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9jYXRpb24nKS5pbm5lclRleHQgPSB3ZWF0aGVyRGF0YS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVtcCcpLmlubmVyVGV4dCA9IGAke3dlYXRoZXJEYXRhLm1haW4udGVtcH3CsENgO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWluX21heCcpLmlubmVyVGV4dCA9IGAke3dlYXRoZXJEYXRhLm1haW4udGVtcF9taW59wrBDIC8gJHt3ZWF0aGVyRGF0YS5tYWluLnRlbXBfbWF4fcKwQ2A7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5odW1pZGl0eScpLmlubmVyVGV4dCA9IGAke3dlYXRoZXJEYXRhLm1haW4uaHVtaWRpdHl9JWA7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVzc3VyZScpLmlubmVyVGV4dCA9IGAke3dlYXRoZXJEYXRhLm1haW4ucHJlc3N1cmV9aFBhYDtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGdldEZvcmVjYXN0KG9wdGlvbnMsIChmb3JlY2FzdERhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JlY2FzdCcpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBmYyBvZiBmb3JlY2FzdERhdGEubGlzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHt0b0hvdXIxMihmYy5kdF90eHQpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIiR7cmVzb2x2ZUljb24oZmMud2VhdGhlclswXS5pZCl9XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPiR7ZmMubWFpbi50ZW1wfcKwQzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIGA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5hcHBlbmRDaGlsZChlbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL21haW4uanMiLCJpbXBvcnQge2FwaX0gZnJvbSAnLi4vLi4vY29uZmlnL2NvbmZpZyc7XG5cbmV4cG9ydHMuZ2V0Rm9yZWNhc3QgPSAob3B0aW9ucywgc3VjY2VzcykgPT4ge1xuICAgIGxldCB1cmwgPSBgJHthcGkuZW5kUG9pbnR9L2ZvcmVjYXN0P2FwcGlkPSR7YXBpLmtleX1gO1xuICAgIHVybCArPSBgJmxhdD0ke29wdGlvbnMubGF0fSZsb249JHtvcHRpb25zLmxvbmd9JnVuaXRzPW1ldHJpY2A7XG5cbiAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCksIGpzb247XG4gICAgeGhyLm9wZW4oJ0dFVCcsIHVybCk7XG4gICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBqc29uID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignQXR0ZW1wdCB0byBwYXJzZSBKU09OIGRhdGEgaGFzIGZhaWxlZCEnKTtcbiAgICAgICAgfVxuICAgICAgICBzdWNjZXNzKGpzb24pO1xuICAgIH0pO1xuICAgIHhoci5zZW5kKCk7XG59O1xuXG5leHBvcnRzLmdldFdlYXRoZXIgPSAob3B0aW9ucywgc3VjY2VzcykgPT4ge1xuICAgIGxldCB1cmwgPSBgJHthcGkuZW5kUG9pbnR9L3dlYXRoZXI/YXBwaWQ9JHthcGkua2V5fWA7XG4gICAgdXJsICs9IGAmbGF0PSR7b3B0aW9ucy5sYXR9Jmxvbj0ke29wdGlvbnMubG9uZ30mdW5pdHM9bWV0cmljYDtcblxuICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKSwganNvbjtcbiAgICB4aHIub3BlbignR0VUJywgdXJsKTtcbiAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGpzb24gPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdBdHRlbXB0IHRvIHBhcnNlIEpTT04gZGF0YSBoYXMgZmFpbGVkIScpO1xuICAgICAgICB9XG4gICAgICAgIHN1Y2Nlc3MoanNvbik7XG4gICAgfSk7XG4gICAgeGhyLnNlbmQoKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL3dlYXRoZXIvYXBpLmpzIiwiLyoqXG4gKiBWZXJ5IGJhc2ljIGFwcGxpY2F0aW9uIGNvbmZpZ3VyYXRpb25cbiAqIEB0eXBlIHt7fX1cbiAqL1xuZXhwb3J0cy5hcGkgPSB7XG4gICAga2V5OiAnMGRlYmQ3ZTcxOGY1ZTQ0Y2M3MDQ0MDZmMjRmZmZiYzAnLFxuICAgIGVuZFBvaW50OiAnaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41J1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb25maWcvY29uZmlnLmpzIiwiaW1wb3J0IHtpY29uc30gZnJvbSAnLi4vLi4vY29uZmlnL2ljb25zJztcblxuLyoqXG4gKiBSZXR1cm5zIGEgY2xhc3MgbmFtZSBzdHJpbmcgZm9yIHRoZSBjb3JyZXNwb25kaW5nIE9wZW5XZWF0aGVyTWFbIGljb24gSUQuXG4gKiBAcGFyYW0ge2ludH0gaWQgT3BlbldlYXRoZXJNYXAgaWNvbiBJRFxuICogQHJldHVybnMge3N0cmluZ30gQ2xhc3MgbmFtZSwgZm9yIGV4YW1wbGUgXCJ3aSB3aS1kYXktcmFpblwiXG4gKi9cbmV4cG9ydHMucmVzb2x2ZUljb24gPSAoaWQpID0+IHtcbiAgICBsZXQgaWNvbiA9IGljb25zW2lkXS5pY29uO1xuXG4gICAgaWYgKCEoaWQgPiA2OTkgJiYgaWQgPCA4MDApICYmICEoaWQgPiA4OTkgJiYgaWQgPCAxMDAwKSkge1xuICAgICAgICBpY29uID0gJ2RheS0nICsgaWNvbjtcbiAgICB9XG5cbiAgICByZXR1cm4gYHdpIHdpLSR7aWNvbn1gO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvd2VhdGhlci91dGlscy5qcyIsIi8qKlxuICogU2ltcGxlIG1hcHBpbmcgbWFuaWZlc3QgZm9yIE9wZW5XZWF0aGVyTWFwIGljb24gSURzIHRvIFdlYXRoZXIgSWNvbnMgZm9udFxuICogQHR5cGUge3t9fVxuICovXG5leHBvcnRzLmljb25zID0ge1xuICAgIDIwMDoge1xuICAgICAgICBsYWJlbDogXCJ0aHVuZGVyc3Rvcm0gd2l0aCBsaWdodCByYWluXCIsXG4gICAgICAgIGljb246IFwic3Rvcm0tc2hvd2Vyc1wiXG4gICAgfSxcbiAgICAyMDE6IHtcbiAgICAgICAgbGFiZWw6IFwidGh1bmRlcnN0b3JtIHdpdGggcmFpblwiLFxuICAgICAgICBpY29uOiBcInN0b3JtLXNob3dlcnNcIlxuICAgIH0sXG4gICAgMjAyOiB7XG4gICAgICAgIGxhYmVsOiBcInRodW5kZXJzdG9ybSB3aXRoIGhlYXZ5IHJhaW5cIixcbiAgICAgICAgaWNvbjogXCJzdG9ybS1zaG93ZXJzXCJcbiAgICB9LFxuICAgIDIxMDoge1xuICAgICAgICBsYWJlbDogXCJsaWdodCB0aHVuZGVyc3Rvcm1cIixcbiAgICAgICAgaWNvbjogXCJzdG9ybS1zaG93ZXJzXCJcbiAgICB9LFxuICAgIDIxMToge1xuICAgICAgICBsYWJlbDogXCJ0aHVuZGVyc3Rvcm1cIixcbiAgICAgICAgaWNvbjogXCJ0aHVuZGVyc3Rvcm1cIlxuICAgIH0sXG4gICAgMjEyOiB7XG4gICAgICAgIGxhYmVsOiBcImhlYXZ5IHRodW5kZXJzdG9ybVwiLFxuICAgICAgICBpY29uOiBcInRodW5kZXJzdG9ybVwiXG4gICAgfSxcbiAgICAyMjE6IHtcbiAgICAgICAgbGFiZWw6IFwicmFnZ2VkIHRodW5kZXJzdG9ybVwiLFxuICAgICAgICBpY29uOiBcInRodW5kZXJzdG9ybVwiXG4gICAgfSxcbiAgICAyMzA6IHtcbiAgICAgICAgbGFiZWw6IFwidGh1bmRlcnN0b3JtIHdpdGggbGlnaHQgZHJpenpsZVwiLFxuICAgICAgICBpY29uOiBcInN0b3JtLXNob3dlcnNcIlxuICAgIH0sXG4gICAgMjMxOiB7XG4gICAgICAgIGxhYmVsOiBcInRodW5kZXJzdG9ybSB3aXRoIGRyaXp6bGVcIixcbiAgICAgICAgaWNvbjogXCJzdG9ybS1zaG93ZXJzXCJcbiAgICB9LFxuICAgIDIzMjoge1xuICAgICAgICBsYWJlbDogXCJ0aHVuZGVyc3Rvcm0gd2l0aCBoZWF2eSBkcml6emxlXCIsXG4gICAgICAgIGljb246IFwic3Rvcm0tc2hvd2Vyc1wiXG4gICAgfSxcbiAgICAzMDA6IHtcbiAgICAgICAgbGFiZWw6IFwibGlnaHQgaW50ZW5zaXR5IGRyaXp6bGVcIixcbiAgICAgICAgaWNvbjogXCJzcHJpbmtsZVwiXG4gICAgfSxcbiAgICAzMDE6IHtcbiAgICAgICAgbGFiZWw6IFwiZHJpenpsZVwiLFxuICAgICAgICBpY29uOiBcInNwcmlua2xlXCJcbiAgICB9LFxuICAgIDMwMjoge1xuICAgICAgICBsYWJlbDogXCJoZWF2eSBpbnRlbnNpdHkgZHJpenpsZVwiLFxuICAgICAgICBpY29uOiBcInNwcmlua2xlXCJcbiAgICB9LFxuICAgIDMxMDoge1xuICAgICAgICBsYWJlbDogXCJsaWdodCBpbnRlbnNpdHkgZHJpenpsZSByYWluXCIsXG4gICAgICAgIGljb246IFwic3ByaW5rbGVcIlxuICAgIH0sXG4gICAgMzExOiB7XG4gICAgICAgIGxhYmVsOiBcImRyaXp6bGUgcmFpblwiLFxuICAgICAgICBpY29uOiBcInNwcmlua2xlXCJcbiAgICB9LFxuICAgIDMxMjoge1xuICAgICAgICBsYWJlbDogXCJoZWF2eSBpbnRlbnNpdHkgZHJpenpsZSByYWluXCIsXG4gICAgICAgIGljb246IFwic3ByaW5rbGVcIlxuICAgIH0sXG4gICAgMzEzOiB7XG4gICAgICAgIGxhYmVsOiBcInNob3dlciByYWluIGFuZCBkcml6emxlXCIsXG4gICAgICAgIGljb246IFwic3ByaW5rbGVcIlxuICAgIH0sXG4gICAgMzE0OiB7XG4gICAgICAgIGxhYmVsOiBcImhlYXZ5IHNob3dlciByYWluIGFuZCBkcml6emxlXCIsXG4gICAgICAgIGljb246IFwic3ByaW5rbGVcIlxuICAgIH0sXG4gICAgMzIxOiB7XG4gICAgICAgIGxhYmVsOiBcInNob3dlciBkcml6emxlXCIsXG4gICAgICAgIGljb246IFwic3ByaW5rbGVcIlxuICAgIH0sXG4gICAgNTAwOiB7XG4gICAgICAgIGxhYmVsOiBcImxpZ2h0IHJhaW5cIixcbiAgICAgICAgaWNvbjogXCJyYWluXCJcbiAgICB9LFxuICAgIDUwMToge1xuICAgICAgICBsYWJlbDogXCJtb2RlcmF0ZSByYWluXCIsXG4gICAgICAgIGljb246IFwicmFpblwiXG4gICAgfSxcbiAgICA1MDI6IHtcbiAgICAgICAgbGFiZWw6IFwiaGVhdnkgaW50ZW5zaXR5IHJhaW5cIixcbiAgICAgICAgaWNvbjogXCJyYWluXCJcbiAgICB9LFxuICAgIDUwMzoge1xuICAgICAgICBsYWJlbDogXCJ2ZXJ5IGhlYXZ5IHJhaW5cIixcbiAgICAgICAgaWNvbjogXCJyYWluXCJcbiAgICB9LFxuICAgIDUwNDoge1xuICAgICAgICBsYWJlbDogXCJleHRyZW1lIHJhaW5cIixcbiAgICAgICAgaWNvbjogXCJyYWluXCJcbiAgICB9LFxuICAgIDUxMToge1xuICAgICAgICBsYWJlbDogXCJmcmVlemluZyByYWluXCIsXG4gICAgICAgIGljb246IFwicmFpbi1taXhcIlxuICAgIH0sXG4gICAgNTIwOiB7XG4gICAgICAgIGxhYmVsOiBcImxpZ2h0IGludGVuc2l0eSBzaG93ZXIgcmFpblwiLFxuICAgICAgICBpY29uOiBcInNob3dlcnNcIlxuICAgIH0sXG4gICAgNTIxOiB7XG4gICAgICAgIGxhYmVsOiBcInNob3dlciByYWluXCIsXG4gICAgICAgIGljb246IFwic2hvd2Vyc1wiXG4gICAgfSxcbiAgICA1MjI6IHtcbiAgICAgICAgbGFiZWw6IFwiaGVhdnkgaW50ZW5zaXR5IHNob3dlciByYWluXCIsXG4gICAgICAgIGljb246IFwic2hvd2Vyc1wiXG4gICAgfSxcbiAgICA1MzE6IHtcbiAgICAgICAgbGFiZWw6IFwicmFnZ2VkIHNob3dlciByYWluXCIsXG4gICAgICAgIGljb246IFwic2hvd2Vyc1wiXG4gICAgfSxcbiAgICA2MDA6IHtcbiAgICAgICAgbGFiZWw6IFwibGlnaHQgc25vd1wiLFxuICAgICAgICBpY29uOiBcInNub3dcIlxuICAgIH0sXG4gICAgNjAxOiB7XG4gICAgICAgIGxhYmVsOiBcInNub3dcIixcbiAgICAgICAgaWNvbjogXCJzbm93XCJcbiAgICB9LFxuICAgIDYwMjoge1xuICAgICAgICBsYWJlbDogXCJoZWF2eSBzbm93XCIsXG4gICAgICAgIGljb246IFwic25vd1wiXG4gICAgfSxcbiAgICA2MTE6IHtcbiAgICAgICAgbGFiZWw6IFwic2xlZXRcIixcbiAgICAgICAgaWNvbjogXCJzbGVldFwiXG4gICAgfSxcbiAgICA2MTI6IHtcbiAgICAgICAgbGFiZWw6IFwic2hvd2VyIHNsZWV0XCIsXG4gICAgICAgIGljb246IFwic2xlZXRcIlxuICAgIH0sXG4gICAgNjE1OiB7XG4gICAgICAgIGxhYmVsOiBcImxpZ2h0IHJhaW4gYW5kIHNub3dcIixcbiAgICAgICAgaWNvbjogXCJyYWluLW1peFwiXG4gICAgfSxcbiAgICA2MTY6IHtcbiAgICAgICAgbGFiZWw6IFwicmFpbiBhbmQgc25vd1wiLFxuICAgICAgICBpY29uOiBcInJhaW4tbWl4XCJcbiAgICB9LFxuICAgIDYyMDoge1xuICAgICAgICBsYWJlbDogXCJsaWdodCBzaG93ZXIgc25vd1wiLFxuICAgICAgICBpY29uOiBcInJhaW4tbWl4XCJcbiAgICB9LFxuICAgIDYyMToge1xuICAgICAgICBsYWJlbDogXCJzaG93ZXIgc25vd1wiLFxuICAgICAgICBpY29uOiBcInJhaW4tbWl4XCJcbiAgICB9LFxuICAgIDYyMjoge1xuICAgICAgICBsYWJlbDogXCJoZWF2eSBzaG93ZXIgc25vd1wiLFxuICAgICAgICBpY29uOiBcInJhaW4tbWl4XCJcbiAgICB9LFxuICAgIDcwMToge1xuICAgICAgICBsYWJlbDogXCJtaXN0XCIsXG4gICAgICAgIGljb246IFwic3ByaW5rbGVcIlxuICAgIH0sXG4gICAgNzExOiB7XG4gICAgICAgIGxhYmVsOiBcInNtb2tlXCIsXG4gICAgICAgIGljb246IFwic21va2VcIlxuICAgIH0sXG4gICAgNzIxOiB7XG4gICAgICAgIGxhYmVsOiBcImhhemVcIixcbiAgICAgICAgaWNvbjogXCJkYXktaGF6ZVwiXG4gICAgfSxcbiAgICA3MzE6IHtcbiAgICAgICAgbGFiZWw6IFwic2FuZCwgZHVzdCB3aGlybHNcIixcbiAgICAgICAgaWNvbjogXCJjbG91ZHktZ3VzdHNcIlxuICAgIH0sXG4gICAgNzQxOiB7XG4gICAgICAgIGxhYmVsOiBcImZvZ1wiLFxuICAgICAgICBpY29uOiBcImZvZ1wiXG4gICAgfSxcbiAgICA3NTE6IHtcbiAgICAgICAgbGFiZWw6IFwic2FuZFwiLFxuICAgICAgICBpY29uOiBcImNsb3VkeS1ndXN0c1wiXG4gICAgfSxcbiAgICA3NjE6IHtcbiAgICAgICAgbGFiZWw6IFwiZHVzdFwiLFxuICAgICAgICBpY29uOiBcImR1c3RcIlxuICAgIH0sXG4gICAgNzYyOiB7XG4gICAgICAgIGxhYmVsOiBcInZvbGNhbmljIGFzaFwiLFxuICAgICAgICBpY29uOiBcInNtb2dcIlxuICAgIH0sXG4gICAgNzcxOiB7XG4gICAgICAgIGxhYmVsOiBcInNxdWFsbHNcIixcbiAgICAgICAgaWNvbjogXCJkYXktd2luZHlcIlxuICAgIH0sXG4gICAgNzgxOiB7XG4gICAgICAgIGxhYmVsOiBcInRvcm5hZG9cIixcbiAgICAgICAgaWNvbjogXCJ0b3JuYWRvXCJcbiAgICB9LFxuICAgIDgwMDoge1xuICAgICAgICBsYWJlbDogXCJjbGVhciBza3lcIixcbiAgICAgICAgaWNvbjogXCJzdW5ueVwiXG4gICAgfSxcbiAgICA4MDE6IHtcbiAgICAgICAgbGFiZWw6IFwiZmV3IGNsb3Vkc1wiLFxuICAgICAgICBpY29uOiBcImNsb3VkeVwiXG4gICAgfSxcbiAgICA4MDI6IHtcbiAgICAgICAgbGFiZWw6IFwic2NhdHRlcmVkIGNsb3Vkc1wiLFxuICAgICAgICBpY29uOiBcImNsb3VkeVwiXG4gICAgfSxcbiAgICA4MDM6IHtcbiAgICAgICAgbGFiZWw6IFwiYnJva2VuIGNsb3Vkc1wiLFxuICAgICAgICBpY29uOiBcImNsb3VkeVwiXG4gICAgfSxcbiAgICA4MDQ6IHtcbiAgICAgICAgbGFiZWw6IFwib3ZlcmNhc3QgY2xvdWRzXCIsXG4gICAgICAgIGljb246IFwiY2xvdWR5XCJcbiAgICB9LFxuXG4gICAgOTAwOiB7XG4gICAgICAgIGxhYmVsOiBcInRvcm5hZG9cIixcbiAgICAgICAgaWNvbjogXCJ0b3JuYWRvXCJcbiAgICB9LFxuICAgIDkwMToge1xuICAgICAgICBsYWJlbDogXCJ0cm9waWNhbCBzdG9ybVwiLFxuICAgICAgICBpY29uOiBcImh1cnJpY2FuZVwiXG4gICAgfSxcbiAgICA5MDI6IHtcbiAgICAgICAgbGFiZWw6IFwiaHVycmljYW5lXCIsXG4gICAgICAgIGljb246IFwiaHVycmljYW5lXCJcbiAgICB9LFxuICAgIDkwMzoge1xuICAgICAgICBsYWJlbDogXCJjb2xkXCIsXG4gICAgICAgIGljb246IFwic25vd2ZsYWtlLWNvbGRcIlxuICAgIH0sXG4gICAgOTA0OiB7XG4gICAgICAgIGxhYmVsOiBcImhvdFwiLFxuICAgICAgICBpY29uOiBcImhvdFwiXG4gICAgfSxcbiAgICA5MDU6IHtcbiAgICAgICAgbGFiZWw6IFwid2luZHlcIixcbiAgICAgICAgaWNvbjogXCJ3aW5keVwiXG4gICAgfSxcbiAgICA5MDY6IHtcbiAgICAgICAgbGFiZWw6IFwiaGFpbFwiLFxuICAgICAgICBpY29uOiBcImhhaWxcIlxuICAgIH0sXG4gICAgOTUxOiB7XG4gICAgICAgIGxhYmVsOiBcImNhbG1cIixcbiAgICAgICAgaWNvbjogXCJzdW5ueVwiXG4gICAgfSxcbiAgICA5NTI6IHtcbiAgICAgICAgbGFiZWw6IFwibGlnaHQgYnJlZXplXCIsXG4gICAgICAgIGljb246IFwiY2xvdWR5LWd1c3RzXCJcbiAgICB9LFxuICAgIDk1Mzoge1xuICAgICAgICBsYWJlbDogXCJnZW50bGUgYnJlZXplXCIsXG4gICAgICAgIGljb246IFwiY2xvdWR5LWd1c3RzXCJcbiAgICB9LFxuICAgIDk1NDoge1xuICAgICAgICBsYWJlbDogXCJtb2RlcmF0ZSBicmVlemVcIixcbiAgICAgICAgaWNvbjogXCJjbG91ZHktZ3VzdHNcIlxuICAgIH0sXG4gICAgOTU1OiB7XG4gICAgICAgIGxhYmVsOiBcImZyZXNoIGJyZWV6ZVwiLFxuICAgICAgICBpY29uOiBcImNsb3VkeS1ndXN0c1wiXG4gICAgfSxcbiAgICA5NTY6IHtcbiAgICAgICAgbGFiZWw6IFwic3Ryb25nIGJyZWV6ZVwiLFxuICAgICAgICBpY29uOiBcImNsb3VkeS1ndXN0c1wiXG4gICAgfSxcbiAgICA5NTc6IHtcbiAgICAgICAgbGFiZWw6IFwiaGlnaCB3aW5kLCBuZWFyIGdhbGVcIixcbiAgICAgICAgaWNvbjogXCJjbG91ZHktZ3VzdHNcIlxuICAgIH0sXG4gICAgOTU4OiB7XG4gICAgICAgIGxhYmVsOiBcImdhbGVcIixcbiAgICAgICAgaWNvbjogXCJjbG91ZHktZ3VzdHNcIlxuICAgIH0sXG4gICAgOTU5OiB7XG4gICAgICAgIGxhYmVsOiBcInNldmVyZSBnYWxlXCIsXG4gICAgICAgIGljb246IFwiY2xvdWR5LWd1c3RzXCJcbiAgICB9LFxuICAgIDk2MDoge1xuICAgICAgICBsYWJlbDogXCJzdG9ybVwiLFxuICAgICAgICBpY29uOiBcInRodW5kZXJzdG9ybVwiXG4gICAgfSxcbiAgICA5NjE6IHtcbiAgICAgICAgbGFiZWw6IFwidmlvbGVudCBzdG9ybVwiLFxuICAgICAgICBpY29uOiBcInRodW5kZXJzdG9ybVwiXG4gICAgfSxcbiAgICA5NjI6IHtcbiAgICAgICAgbGFiZWw6IFwiaHVycmljYW5lXCIsXG4gICAgICAgIGljb246IFwiY2xvdWR5LWd1c3RzXCJcbiAgICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbmZpZy9pY29ucy5qcyIsIi8qKlxuICogQ29udmVydHMgdGhlIGdpdmVuIHRpbWUgc3RyaW5nIHRvIDEyLWhvdXIgZm9ybWF0IGFuZCBwb3N0IGZpeGVzIGFtL3BtXG4gKiBGb3IgZXhhbXBsZSwgMTM6MDA6MDAgd2lsbCBiZWNvbWUgMXBtLlxuICovXG5leHBvcnRzLnRvSG91cjEyID0gKHRpbWUpID0+IHtcbiAgICBsZXQgaCA9IHBhcnNlSW50KHRpbWUuc3BsaXQoJyAnKVsxXS5zcGxpdCgnOicpWzBdLCAxMCk7XG4gICAgbGV0IHBvc3RmaXggPSBoIDwgMTIgPyAnYW0nIDogJ3BtJztcbiAgICBoID0gaCA+IDEyID8gaCAtIDEyIDogaCA9PT0gMCA/IDEyIDogaDtcbiAgICByZXR1cm4gaCArIHBvc3RmaXg7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC90aW1lL3V0aWxzLmpzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9ub3JtYWxpemUuY3NzL25vcm1hbGl6ZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93ZWF0aGVyLWljb25zL2Nzcy93ZWF0aGVyLWljb25zLmNzc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3N0eWxlcy9zdHlsZXMuc2Nzc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9