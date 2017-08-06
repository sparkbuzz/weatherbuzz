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


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _api = __webpack_require__(2);

var _utils = __webpack_require__(4);

var _utils2 = __webpack_require__(6);

exports.main = function () {
    if (!'geolocation' in navigator) {
        throw new Error('Geolocation not supported on browser!');
        return;
    }

    updateWeather();

    function updateWeather() {
        navigator.geolocation.getCurrentPosition(onResolveCurrentPostion, function (e) {
            console.warn(e.message);
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelector('#refresh').addEventListener('click', function () {
            setBusy();
            updateWeather();
        });
    });

    function setBusy() {
        document.querySelector('main').classList.add('hidden');
        document.querySelector('.loader').classList.remove('hidden');
    }

    function setIdle() {
        document.querySelector('main').classList.remove('hidden');
        document.querySelector('.loader').classList.add('hidden');
    }

    function onResolveCurrentPostion(pos) {
        Promise.all([(0, _api.getWeather)(pos.coords), (0, _api.getForecast)(pos.coords)]).then(function (values) {
            var _values = _slicedToArray(values, 2),
                weatherData = _values[0],
                forecastData = _values[1];

            document.querySelector('.wi').className = (0, _utils.resolveIcon)(weatherData.weather[0].id);
            document.querySelector('.description').innerText = weatherData.weather[0].description;
            document.querySelector('.location').innerText = weatherData.name;
            document.querySelector('.temp').innerText = weatherData.main.temp + '\xB0C';
            document.querySelector('.min_max').innerText = weatherData.main.temp_min + '\xB0C / ' + weatherData.main.temp_max + '\xB0C';
            document.querySelector('.humidity').innerText = weatherData.main.humidity + '%';
            document.querySelector('.pressure').innerText = weatherData.main.pressure + 'hPa';

            var target = document.querySelector('.forecast');
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = forecastData.list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var fc = _step.value;

                    var el = document.createElement('span');

                    el.innerHTML = '\n                                <span class="hour">' + (0, _utils2.toHour12)(fc.dt_txt) + '</span>\n                                <span class="' + (0, _utils.resolveIcon)(fc.weather[0].id) + '"></span>\n                                <span class="temp">' + fc.main.temp + '\xB0C</span>\n                            ';

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

            setIdle();
        });
    }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _config = __webpack_require__(3);

exports.getForecast = function (options, success) {
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
        xhr.send();
    });
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjcyZjg2MTAzNjI5ODViZGVkNzAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC93ZWF0aGVyL2FwaS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3dlYXRoZXIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmZpZy9pY29ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3RpbWUvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2VhdGhlci1pY29ucy9jc3Mvd2VhdGhlci1pY29ucy5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9zdHlsZXMuc2NzcyJdLCJuYW1lcyI6WyJjb25zb2xlIiwibG9nIiwiZXhwb3J0cyIsIm1haW4iLCJuYXZpZ2F0b3IiLCJFcnJvciIsInVwZGF0ZVdlYXRoZXIiLCJnZW9sb2NhdGlvbiIsImdldEN1cnJlbnRQb3NpdGlvbiIsIm9uUmVzb2x2ZUN1cnJlbnRQb3N0aW9uIiwiZSIsIndhcm4iLCJtZXNzYWdlIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwicXVlcnlTZWxlY3RvciIsInNldEJ1c3kiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJzZXRJZGxlIiwicG9zIiwiUHJvbWlzZSIsImFsbCIsImNvb3JkcyIsInRoZW4iLCJ2YWx1ZXMiLCJ3ZWF0aGVyRGF0YSIsImZvcmVjYXN0RGF0YSIsImNsYXNzTmFtZSIsIndlYXRoZXIiLCJpZCIsImlubmVyVGV4dCIsImRlc2NyaXB0aW9uIiwibmFtZSIsInRlbXAiLCJ0ZW1wX21pbiIsInRlbXBfbWF4IiwiaHVtaWRpdHkiLCJwcmVzc3VyZSIsInRhcmdldCIsImxpc3QiLCJmYyIsImVsIiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsImR0X3R4dCIsImFwcGVuZENoaWxkIiwiZ2V0Rm9yZWNhc3QiLCJvcHRpb25zIiwic3VjY2VzcyIsInJlc29sdmUiLCJyZWplY3QiLCJ1cmwiLCJlbmRQb2ludCIsImtleSIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJqc29uIiwib3BlbiIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlVGV4dCIsImVycm9yIiwic2VuZCIsImdldFdlYXRoZXIiLCJhcGkiLCJyZXNvbHZlSWNvbiIsImljb24iLCJpY29ucyIsImxhYmVsIiwidG9Ib3VyMTIiLCJ0aW1lIiwiaCIsInBhcnNlSW50Iiwic3BsaXQiLCJwb3N0Zml4Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUM3REE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUFBLFFBQVFDLEdBQVIsQ0FBWSx3QkFBWjtBQUNBLGtCOzs7Ozs7Ozs7OztBQ1BBOztBQUNBOztBQUNBOztBQUVBQyxRQUFRQyxJQUFSLEdBQWUsWUFBWTtBQUN2QixRQUFJLENBQUMsYUFBRCxJQUFrQkMsU0FBdEIsRUFBaUM7QUFDN0IsY0FBTSxJQUFJQyxLQUFKLENBQVUs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LElBQUksRUFBSixHQUFTQSxJQUFJLEVBQWIsR0FBa0JBLE1BQU0sQ0FBTixHQUFVLEVBQVYsR0FBZUEsQ0FBckM7QUFDQSxXQUFPQSxJQUFJRyxPQUFYO0FBQ0gsQ0FMRCxDOzs7Ozs7QUNKQSx5Qzs7Ozs7O0FDQUEseUM7Ozs7OztBQ0FBLHlDIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGY3MmY4NjEwMzYyOTg1YmRlZDcwIiwiaW1wb3J0IHttYWlufSBmcm9tICcuL2FwcC9tYWluJztcblxuaW1wb3J0ICdub3JtYWxpemUuY3NzL25vcm1hbGl6ZS5jc3MnO1xuaW1wb3J0ICd3ZWF0aGVyLWljb25zL2Nzcy93ZWF0aGVyLWljb25zLmNzcyc7XG5pbXBvcnQgJy4vc3R5bGVzL3N0eWxlcy5zY3NzJztcblxuY29uc29sZS5sb2coJ1dlbGNvbWUgdG8gV2VhdGhlckJ1enonKTtcbm1haW4oKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAuanMiLCJpbXBvcnQge2dldEZvcmVjYXN0LCBnZXRXZWF0aGVyfSBmcm9tICcuL3dlYXRoZXIvYXBpJztcbmltcG9ydCB7cmVzb2x2ZUljb259IGZyb20gJy4vd2VhdGhlci91dGlscyc7XG5pbXBvcnQge3RvSG91cjEyfSBmcm9tICcuL3RpbWUvdXRpbHMnO1xuXG5leHBvcnRzLm1haW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCEnZ2VvbG9jYXRpb24nIGluIG5hdmlnYXRvcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0dlb2xvY2F0aW9uIG5vdCBzdXBwb3J0ZWQgb24gYnJvd3NlciEnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHVwZGF0ZVdlYXRoZXIoKTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVdlYXRoZXIoKSB7XG4gICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24ob25SZXNvbHZlQ3VycmVudFBvc3Rpb24sXG4gICAgICAgICAgICAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZWZyZXNoJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBzZXRCdXN5KCk7XG4gICAgICAgICAgICB1cGRhdGVXZWF0aGVyKCk7XG4gICAgICAgIH0pXG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBzZXRCdXN5KCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJykuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2FkZXInKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRJZGxlKCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2FkZXInKS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblJlc29sdmVDdXJyZW50UG9zdGlvbihwb3MpIHtcbiAgICAgICAgUHJvbWlzZS5hbGwoW2dldFdlYXRoZXIocG9zLmNvb3JkcyksIGdldEZvcmVjYXN0KHBvcy5jb29yZHMpXSlcbiAgICAgICAgICAgIC50aGVuKCh2YWx1ZXMpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgW3dlYXRoZXJEYXRhLCBmb3JlY2FzdERhdGFdID0gdmFsdWVzO1xuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndpJykuY2xhc3NOYW1lID0gcmVzb2x2ZUljb24od2VhdGhlckRhdGEud2VhdGhlclswXS5pZCk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlc2NyaXB0aW9uJykuaW5uZXJUZXh0ID0gd2VhdGhlckRhdGEud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9jYXRpb24nKS5pbm5lclRleHQgPSB3ZWF0aGVyRGF0YS5uYW1lO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZW1wJykuaW5uZXJUZXh0ID0gYCR7d2VhdGhlckRhdGEubWFpbi50ZW1wfcKwQ2A7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1pbl9tYXgnKS5pbm5lclRleHQgPSBgJHt3ZWF0aGVyRGF0YS5tYWluLnRlbXBfbWlufcKwQyAvICR7d2VhdGhlckRhdGEubWFpbi50ZW1wX21heH3CsENgO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5odW1pZGl0eScpLmlubmVyVGV4dCA9IGAke3dlYXRoZXJEYXRhLm1haW4uaHVtaWRpdHl9JWA7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZXNzdXJlJykuaW5uZXJUZXh0ID0gYCR7d2VhdGhlckRhdGEubWFpbi5wcmVzc3VyZX1oUGFgO1xuXG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JlY2FzdCcpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGZjIG9mIGZvcmVjYXN0RGF0YS5saXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgICAgICAgICAgICAgICAgICBlbC5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaG91clwiPiR7dG9Ib3VyMTIoZmMuZHRfdHh0KX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiJHtyZXNvbHZlSWNvbihmYy53ZWF0aGVyWzBdLmlkKX1cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGVtcFwiPiR7ZmMubWFpbi50ZW1wfcKwQzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgO1xuXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5hcHBlbmRDaGlsZChlbCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2V0SWRsZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvbWFpbi5qcyIsImltcG9ydCB7YXBpfSBmcm9tICcuLi8uLi9jb25maWcvY29uZmlnJztcblxuZXhwb3J0cy5nZXRGb3JlY2FzdCA9IChvcHRpb25zLCBzdWNjZXNzKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgbGV0IHVybCA9IGAke2FwaS5lbmRQb2ludH0vZm9yZWNhc3Q/YXBwaWQ9JHthcGkua2V5fWA7XG4gICAgICAgIHVybCArPSBgJmxhdD0ke29wdGlvbnMubGF0aXR1ZGV9Jmxvbj0ke29wdGlvbnMubG9uZ2l0dWRlfSZ1bml0cz1tZXRyaWNgO1xuXG4gICAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKSwganNvbjtcbiAgICAgICAgeGhyLm9wZW4oJ0dFVCcsIHVybCk7XG4gICAgICAgIHhoci5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBqc29uID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdBdHRlbXB0IHRvIHBhcnNlIEpTT04gZGF0YSBoYXMgZmFpbGVkIScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzb2x2ZShqc29uKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHhoci5zZW5kKCk7XG4gICAgfSk7XG59O1xuXG5leHBvcnRzLmdldFdlYXRoZXIgPSAob3B0aW9ucykgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGxldCB1cmwgPSBgJHthcGkuZW5kUG9pbnR9L3dlYXRoZXI/YXBwaWQ9JHthcGkua2V5fWA7XG4gICAgICAgIHVybCArPSBgJmxhdD0ke29wdGlvbnMubGF0aXR1ZGV9Jmxvbj0ke29wdGlvbnMubG9uZ2l0dWRlfSZ1bml0cz1tZXRyaWNgO1xuXG4gICAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKSwganNvbjtcbiAgICAgICAgeGhyLm9wZW4oJ0dFVCcsIHVybCk7XG4gICAgICAgIHhoci5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBqc29uID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdBdHRlbXB0IHRvIHBhcnNlIEpTT04gZGF0YSBoYXMgZmFpbGVkIScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzb2x2ZShqc29uKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHhoci5zZW5kKCk7XG4gICAgfSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC93ZWF0aGVyL2FwaS5qcyIsIi8qKlxuICogVmVyeSBiYXNpYyBhcHBsaWNhdGlvbiBjb25maWd1cmF0aW9uXG4gKiBAdHlwZSB7e319XG4gKi9cbmV4cG9ydHMuYXBpID0ge1xuICAgIGtleTogJzBkZWJkN2U3MThmNWU0NGNjNzA0NDA2ZjI0ZmZmYmMwJyxcbiAgICBlbmRQb2ludDogJ2h0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNSdcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29uZmlnL2NvbmZpZy5qcyIsImltcG9ydCB7aWNvbnN9IGZyb20gJy4uLy4uL2NvbmZpZy9pY29ucyc7XG5cbi8qKlxuICogUmV0dXJucyBhIGNsYXNzIG5hbWUgc3RyaW5nIGZvciB0aGUgY29ycmVzcG9uZGluZyBPcGVuV2VhdGhlck1hWyBpY29uIElELlxuICogQHBhcmFtIHtpbnR9IGlkIE9wZW5XZWF0aGVyTWFwIGljb24gSURcbiAqIEByZXR1cm5zIHtzdHJpbmd9IENsYXNzIG5hbWUsIGZvciBleGFtcGxlIFwid2kgd2ktZGF5LXJhaW5cIlxuICovXG5leHBvcnRzLnJlc29sdmVJY29uID0gKGlkKSA9PiB7XG4gICAgbGV0IGljb24gPSBpY29uc1tpZF0uaWNvbjtcblxuICAgIGlmICghKGlkID4gNjk5ICYmIGlkIDwgODAwKSAmJiAhKGlkID4gODk5ICYmIGlkIDwgMTAwMCkpIHtcbiAgICAgICAgaWNvbiA9ICdkYXktJyArIGljb247XG4gICAgfVxuXG4gICAgcmV0dXJuIGB3aSB3aS0ke2ljb259YDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL3dlYXRoZXIvdXRpbHMuanMiLCIvKipcbiAqIFNpbXBsZSBtYXBwaW5nIG1hbmlmZXN0IGZvciBPcGVuV2VhdGhlck1hcCBpY29uIElEcyB0byBXZWF0aGVyIEljb25zIGZvbnRcbiAqIEB0eXBlIHt7fX1cbiAqL1xuZXhwb3J0cy5pY29ucyA9IHtcbiAgICAyMDA6IHtcbiAgICAgICAgbGFiZWw6IFwidGh1bmRlcnN0b3JtIHdpdGggbGlnaHQgcmFpblwiLFxuICAgICAgICBpY29uOiBcInN0b3JtLXNob3dlcnNcIlxuICAgIH0sXG4gICAgMjAxOiB7XG4gICAgICAgIGxhYmVsOiBcInRodW5kZXJzdG9ybSB3aXRoIHJhaW5cIixcbiAgICAgICAgaWNvbjogXCJzdG9ybS1zaG93ZXJzXCJcbiAgICB9LFxuICAgIDIwMjoge1xuICAgICAgICBsYWJlbDogXCJ0aHVuZGVyc3Rvcm0gd2l0aCBoZWF2eSByYWluXCIsXG4gICAgICAgIGljb246IFwic3Rvcm0tc2hvd2Vyc1wiXG4gICAgfSxcbiAgICAyMTA6IHtcbiAgICAgICAgbGFiZWw6IFwibGlnaHQgdGh1bmRlcnN0b3JtXCIsXG4gICAgICAgIGljb246IFwic3Rvcm0tc2hvd2Vyc1wiXG4gICAgfSxcbiAgICAyMTE6IHtcbiAgICAgICAgbGFiZWw6IFwidGh1bmRlcnN0b3JtXCIsXG4gICAgICAgIGljb246IFwidGh1bmRlcnN0b3JtXCJcbiAgICB9LFxuICAgIDIxMjoge1xuICAgICAgICBsYWJlbDogXCJoZWF2eSB0aHVuZGVyc3Rvcm1cIixcbiAgICAgICAgaWNvbjogXCJ0aHVuZGVyc3Rvcm1cIlxuICAgIH0sXG4gICAgMjIxOiB7XG4gICAgICAgIGxhYmVsOiBcInJhZ2dlZCB0aHVuZGVyc3Rvcm1cIixcbiAgICAgICAgaWNvbjogXCJ0aHVuZGVyc3Rvcm1cIlxuICAgIH0sXG4gICAgMjMwOiB7XG4gICAgICAgIGxhYmVsOiBcInRodW5kZXJzdG9ybSB3aXRoIGxpZ2h0IGRyaXp6bGVcIixcbiAgICAgICAgaWNvbjogXCJzdG9ybS1zaG93ZXJzXCJcbiAgICB9LFxuICAgIDIzMToge1xuICAgICAgICBsYWJlbDogXCJ0aHVuZGVyc3Rvcm0gd2l0aCBkcml6emxlXCIsXG4gICAgICAgIGljb246IFwic3Rvcm0tc2hvd2Vyc1wiXG4gICAgfSxcbiAgICAyMzI6IHtcbiAgICAgICAgbGFiZWw6IFwidGh1bmRlcnN0b3JtIHdpdGggaGVhdnkgZHJpenpsZVwiLFxuICAgICAgICBpY29uOiBcInN0b3JtLXNob3dlcnNcIlxuICAgIH0sXG4gICAgMzAwOiB7XG4gICAgICAgIGxhYmVsOiBcImxpZ2h0IGludGVuc2l0eSBkcml6emxlXCIsXG4gICAgICAgIGljb246IFwic3ByaW5rbGVcIlxuICAgIH0sXG4gICAgMzAxOiB7XG4gICAgICAgIGxhYmVsOiBcImRyaXp6bGVcIixcbiAgICAgICAgaWNvbjogXCJzcHJpbmtsZVwiXG4gICAgfSxcbiAgICAzMDI6IHtcbiAgICAgICAgbGFiZWw6IFwiaGVhdnkgaW50ZW5zaXR5IGRyaXp6bGVcIixcbiAgICAgICAgaWNvbjogXCJzcHJpbmtsZVwiXG4gICAgfSxcbiAgICAzMTA6IHtcbiAgICAgICAgbGFiZWw6IFwibGlnaHQgaW50ZW5zaXR5IGRyaXp6bGUgcmFpblwiLFxuICAgICAgICBpY29uOiBcInNwcmlua2xlXCJcbiAgICB9LFxuICAgIDMxMToge1xuICAgICAgICBsYWJlbDogXCJkcml6emxlIHJhaW5cIixcbiAgICAgICAgaWNvbjogXCJzcHJpbmtsZVwiXG4gICAgfSxcbiAgICAzMTI6IHtcbiAgICAgICAgbGFiZWw6IFwiaGVhdnkgaW50ZW5zaXR5IGRyaXp6bGUgcmFpblwiLFxuICAgICAgICBpY29uOiBcInNwcmlua2xlXCJcbiAgICB9LFxuICAgIDMxMzoge1xuICAgICAgICBsYWJlbDogXCJzaG93ZXIgcmFpbiBhbmQgZHJpenpsZVwiLFxuICAgICAgICBpY29uOiBcInNwcmlua2xlXCJcbiAgICB9LFxuICAgIDMxNDoge1xuICAgICAgICBsYWJlbDogXCJoZWF2eSBzaG93ZXIgcmFpbiBhbmQgZHJpenpsZVwiLFxuICAgICAgICBpY29uOiBcInNwcmlua2xlXCJcbiAgICB9LFxuICAgIDMyMToge1xuICAgICAgICBsYWJlbDogXCJzaG93ZXIgZHJpenpsZVwiLFxuICAgICAgICBpY29uOiBcInNwcmlua2xlXCJcbiAgICB9LFxuICAgIDUwMDoge1xuICAgICAgICBsYWJlbDogXCJsaWdodCByYWluXCIsXG4gICAgICAgIGljb246IFwicmFpblwiXG4gICAgfSxcbiAgICA1MDE6IHtcbiAgICAgICAgbGFiZWw6IFwibW9kZXJhdGUgcmFpblwiLFxuICAgICAgICBpY29uOiBcInJhaW5cIlxuICAgIH0sXG4gICAgNTAyOiB7XG4gICAgICAgIGxhYmVsOiBcImhlYXZ5IGludGVuc2l0eSByYWluXCIsXG4gICAgICAgIGljb246IFwicmFpblwiXG4gICAgfSxcbiAgICA1MDM6IHtcbiAgICAgICAgbGFiZWw6IFwidmVyeSBoZWF2eSByYWluXCIsXG4gICAgICAgIGljb246IFwicmFpblwiXG4gICAgfSxcbiAgICA1MDQ6IHtcbiAgICAgICAgbGFiZWw6IFwiZXh0cmVtZSByYWluXCIsXG4gICAgICAgIGljb246IFwicmFpblwiXG4gICAgfSxcbiAgICA1MTE6IHtcbiAgICAgICAgbGFiZWw6IFwiZnJlZXppbmcgcmFpblwiLFxuICAgICAgICBpY29uOiBcInJhaW4tbWl4XCJcbiAgICB9LFxuICAgIDUyMDoge1xuICAgICAgICBsYWJlbDogXCJsaWdodCBpbnRlbnNpdHkgc2hvd2VyIHJhaW5cIixcbiAgICAgICAgaWNvbjogXCJzaG93ZXJzXCJcbiAgICB9LFxuICAgIDUyMToge1xuICAgICAgICBsYWJlbDogXCJzaG93ZXIgcmFpblwiLFxuICAgICAgICBpY29uOiBcInNob3dlcnNcIlxuICAgIH0sXG4gICAgNTIyOiB7XG4gICAgICAgIGxhYmVsOiBcImhlYXZ5IGludGVuc2l0eSBzaG93ZXIgcmFpblwiLFxuICAgICAgICBpY29uOiBcInNob3dlcnNcIlxuICAgIH0sXG4gICAgNTMxOiB7XG4gICAgICAgIGxhYmVsOiBcInJhZ2dlZCBzaG93ZXIgcmFpblwiLFxuICAgICAgICBpY29uOiBcInNob3dlcnNcIlxuICAgIH0sXG4gICAgNjAwOiB7XG4gICAgICAgIGxhYmVsOiBcImxpZ2h0IHNub3dcIixcbiAgICAgICAgaWNvbjogXCJzbm93XCJcbiAgICB9LFxuICAgIDYwMToge1xuICAgICAgICBsYWJlbDogXCJzbm93XCIsXG4gICAgICAgIGljb246IFwic25vd1wiXG4gICAgfSxcbiAgICA2MDI6IHtcbiAgICAgICAgbGFiZWw6IFwiaGVhdnkgc25vd1wiLFxuICAgICAgICBpY29uOiBcInNub3dcIlxuICAgIH0sXG4gICAgNjExOiB7XG4gICAgICAgIGxhYmVsOiBcInNsZWV0XCIsXG4gICAgICAgIGljb246IFwic2xlZXRcIlxuICAgIH0sXG4gICAgNjEyOiB7XG4gICAgICAgIGxhYmVsOiBcInNob3dlciBzbGVldFwiLFxuICAgICAgICBpY29uOiBcInNsZWV0XCJcbiAgICB9LFxuICAgIDYxNToge1xuICAgICAgICBsYWJlbDogXCJsaWdodCByYWluIGFuZCBzbm93XCIsXG4gICAgICAgIGljb246IFwicmFpbi1taXhcIlxuICAgIH0sXG4gICAgNjE2OiB7XG4gICAgICAgIGxhYmVsOiBcInJhaW4gYW5kIHNub3dcIixcbiAgICAgICAgaWNvbjogXCJyYWluLW1peFwiXG4gICAgfSxcbiAgICA2MjA6IHtcbiAgICAgICAgbGFiZWw6IFwibGlnaHQgc2hvd2VyIHNub3dcIixcbiAgICAgICAgaWNvbjogXCJyYWluLW1peFwiXG4gICAgfSxcbiAgICA2MjE6IHtcbiAgICAgICAgbGFiZWw6IFwic2hvd2VyIHNub3dcIixcbiAgICAgICAgaWNvbjogXCJyYWluLW1peFwiXG4gICAgfSxcbiAgICA2MjI6IHtcbiAgICAgICAgbGFiZWw6IFwiaGVhdnkgc2hvd2VyIHNub3dcIixcbiAgICAgICAgaWNvbjogXCJyYWluLW1peFwiXG4gICAgfSxcbiAgICA3MDE6IHtcbiAgICAgICAgbGFiZWw6IFwibWlzdFwiLFxuICAgICAgICBpY29uOiBcInNwcmlua2xlXCJcbiAgICB9LFxuICAgIDcxMToge1xuICAgICAgICBsYWJlbDogXCJzbW9rZVwiLFxuICAgICAgICBpY29uOiBcInNtb2tlXCJcbiAgICB9LFxuICAgIDcyMToge1xuICAgICAgICBsYWJlbDogXCJoYXplXCIsXG4gICAgICAgIGljb246IFwiZGF5LWhhemVcIlxuICAgIH0sXG4gICAgNzMxOiB7XG4gICAgICAgIGxhYmVsOiBcInNhbmQsIGR1c3Qgd2hpcmxzXCIsXG4gICAgICAgIGljb246IFwiY2xvdWR5LWd1c3RzXCJcbiAgICB9LFxuICAgIDc0MToge1xuICAgICAgICBsYWJlbDogXCJmb2dcIixcbiAgICAgICAgaWNvbjogXCJmb2dcIlxuICAgIH0sXG4gICAgNzUxOiB7XG4gICAgICAgIGxhYmVsOiBcInNhbmRcIixcbiAgICAgICAgaWNvbjogXCJjbG91ZHktZ3VzdHNcIlxuICAgIH0sXG4gICAgNzYxOiB7XG4gICAgICAgIGxhYmVsOiBcImR1c3RcIixcbiAgICAgICAgaWNvbjogXCJkdXN0XCJcbiAgICB9LFxuICAgIDc2Mjoge1xuICAgICAgICBsYWJlbDogXCJ2b2xjYW5pYyBhc2hcIixcbiAgICAgICAgaWNvbjogXCJzbW9nXCJcbiAgICB9LFxuICAgIDc3MToge1xuICAgICAgICBsYWJlbDogXCJzcXVhbGxzXCIsXG4gICAgICAgIGljb246IFwiZGF5LXdpbmR5XCJcbiAgICB9LFxuICAgIDc4MToge1xuICAgICAgICBsYWJlbDogXCJ0b3JuYWRvXCIsXG4gICAgICAgIGljb246IFwidG9ybmFkb1wiXG4gICAgfSxcbiAgICA4MDA6IHtcbiAgICAgICAgbGFiZWw6IFwiY2xlYXIgc2t5XCIsXG4gICAgICAgIGljb246IFwic3VubnlcIlxuICAgIH0sXG4gICAgODAxOiB7XG4gICAgICAgIGxhYmVsOiBcImZldyBjbG91ZHNcIixcbiAgICAgICAgaWNvbjogXCJjbG91ZHlcIlxuICAgIH0sXG4gICAgODAyOiB7XG4gICAgICAgIGxhYmVsOiBcInNjYXR0ZXJlZCBjbG91ZHNcIixcbiAgICAgICAgaWNvbjogXCJjbG91ZHlcIlxuICAgIH0sXG4gICAgODAzOiB7XG4gICAgICAgIGxhYmVsOiBcImJyb2tlbiBjbG91ZHNcIixcbiAgICAgICAgaWNvbjogXCJjbG91ZHlcIlxuICAgIH0sXG4gICAgODA0OiB7XG4gICAgICAgIGxhYmVsOiBcIm92ZXJjYXN0IGNsb3Vkc1wiLFxuICAgICAgICBpY29uOiBcImNsb3VkeVwiXG4gICAgfSxcblxuICAgIDkwMDoge1xuICAgICAgICBsYWJlbDogXCJ0b3JuYWRvXCIsXG4gICAgICAgIGljb246IFwidG9ybmFkb1wiXG4gICAgfSxcbiAgICA5MDE6IHtcbiAgICAgICAgbGFiZWw6IFwidHJvcGljYWwgc3Rvcm1cIixcbiAgICAgICAgaWNvbjogXCJodXJyaWNhbmVcIlxuICAgIH0sXG4gICAgOTAyOiB7XG4gICAgICAgIGxhYmVsOiBcImh1cnJpY2FuZVwiLFxuICAgICAgICBpY29uOiBcImh1cnJpY2FuZVwiXG4gICAgfSxcbiAgICA5MDM6IHtcbiAgICAgICAgbGFiZWw6IFwiY29sZFwiLFxuICAgICAgICBpY29uOiBcInNub3dmbGFrZS1jb2xkXCJcbiAgICB9LFxuICAgIDkwNDoge1xuICAgICAgICBsYWJlbDogXCJob3RcIixcbiAgICAgICAgaWNvbjogXCJob3RcIlxuICAgIH0sXG4gICAgOTA1OiB7XG4gICAgICAgIGxhYmVsOiBcIndpbmR5XCIsXG4gICAgICAgIGljb246IFwid2luZHlcIlxuICAgIH0sXG4gICAgOTA2OiB7XG4gICAgICAgIGxhYmVsOiBcImhhaWxcIixcbiAgICAgICAgaWNvbjogXCJoYWlsXCJcbiAgICB9LFxuICAgIDk1MToge1xuICAgICAgICBsYWJlbDogXCJjYWxtXCIsXG4gICAgICAgIGljb246IFwic3VubnlcIlxuICAgIH0sXG4gICAgOTUyOiB7XG4gICAgICAgIGxhYmVsOiBcImxpZ2h0IGJyZWV6ZVwiLFxuICAgICAgICBpY29uOiBcImNsb3VkeS1ndXN0c1wiXG4gICAgfSxcbiAgICA5NTM6IHtcbiAgICAgICAgbGFiZWw6IFwiZ2VudGxlIGJyZWV6ZVwiLFxuICAgICAgICBpY29uOiBcImNsb3VkeS1ndXN0c1wiXG4gICAgfSxcbiAgICA5NTQ6IHtcbiAgICAgICAgbGFiZWw6IFwibW9kZXJhdGUgYnJlZXplXCIsXG4gICAgICAgIGljb246IFwiY2xvdWR5LWd1c3RzXCJcbiAgICB9LFxuICAgIDk1NToge1xuICAgICAgICBsYWJlbDogXCJmcmVzaCBicmVlemVcIixcbiAgICAgICAgaWNvbjogXCJjbG91ZHktZ3VzdHNcIlxuICAgIH0sXG4gICAgOTU2OiB7XG4gICAgICAgIGxhYmVsOiBcInN0cm9uZyBicmVlemVcIixcbiAgICAgICAgaWNvbjogXCJjbG91ZHktZ3VzdHNcIlxuICAgIH0sXG4gICAgOTU3OiB7XG4gICAgICAgIGxhYmVsOiBcImhpZ2ggd2luZCwgbmVhciBnYWxlXCIsXG4gICAgICAgIGljb246IFwiY2xvdWR5LWd1c3RzXCJcbiAgICB9LFxuICAgIDk1ODoge1xuICAgICAgICBsYWJlbDogXCJnYWxlXCIsXG4gICAgICAgIGljb246IFwiY2xvdWR5LWd1c3RzXCJcbiAgICB9LFxuICAgIDk1OToge1xuICAgICAgICBsYWJlbDogXCJzZXZlcmUgZ2FsZVwiLFxuICAgICAgICBpY29uOiBcImNsb3VkeS1ndXN0c1wiXG4gICAgfSxcbiAgICA5NjA6IHtcbiAgICAgICAgbGFiZWw6IFwic3Rvcm1cIixcbiAgICAgICAgaWNvbjogXCJ0aHVuZGVyc3Rvcm1cIlxuICAgIH0sXG4gICAgOTYxOiB7XG4gICAgICAgIGxhYmVsOiBcInZpb2xlbnQgc3Rvcm1cIixcbiAgICAgICAgaWNvbjogXCJ0aHVuZGVyc3Rvcm1cIlxuICAgIH0sXG4gICAgOTYyOiB7XG4gICAgICAgIGxhYmVsOiBcImh1cnJpY2FuZVwiLFxuICAgICAgICBpY29uOiBcImNsb3VkeS1ndXN0c1wiXG4gICAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb25maWcvaWNvbnMuanMiLCIvKipcbiAqIENvbnZlcnRzIHRoZSBnaXZlbiB0aW1lIHN0cmluZyB0byAxMi1ob3VyIGZvcm1hdCBhbmQgcG9zdCBmaXhlcyBhbS9wbVxuICogRm9yIGV4YW1wbGUsIDEzOjAwOjAwIHdpbGwgYmVjb21lIDFwbS5cbiAqL1xuZXhwb3J0cy50b0hvdXIxMiA9ICh0aW1lKSA9PiB7XG4gICAgbGV0IGggPSBwYXJzZUludCh0aW1lLnNwbGl0KCcgJylbMV0uc3BsaXQoJzonKVswXSwgMTApO1xuICAgIGxldCBwb3N0Zml4ID0gaCA8IDEyID8gJ2FtJyA6ICdwbSc7XG4gICAgaCA9IGggPiAxMiA/IGggLSAxMiA6IGggPT09IDAgPyAxMiA6IGg7XG4gICAgcmV0dXJuIGggKyBwb3N0Zml4O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvdGltZS91dGlscy5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbm9ybWFsaXplLmNzcy9ub3JtYWxpemUuY3NzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2VhdGhlci1pY29ucy9jc3Mvd2VhdGhlci1pY29ucy5jc3Ncbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zdHlsZXMvc3R5bGVzLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==