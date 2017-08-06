import {api} from '../../config/config';

/**
 * Fetch the 3 hourly weather forecast.
 * @param options
 * @returns {Promise}
 */
exports.getForecast = (options) => {
    return new Promise((resolve, reject) => {
        let url = `${api.endPoint}/forecast?appid=${api.key}`;
        url += `&lat=${options.latitude}&lon=${options.longitude}&units=metric`;

        let xhr = new XMLHttpRequest(), json;
        xhr.open('GET', url);
        xhr.addEventListener('load', () => {
            try {
                json = JSON.parse(xhr.responseText);
            } catch (error) {
                console.warn('Attempt to parse JSON data has failed!');
            }
            resolve(json);
        });
        xhr.addEventListener('timeout', () => {
            reject();
        });
        xhr.addEventListener('error', () => {
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
exports.getWeather = (options) => {
    return new Promise((resolve, reject) => {
        let url = `${api.endPoint}/weather?appid=${api.key}`;
        url += `&lat=${options.latitude}&lon=${options.longitude}&units=metric`;

        let xhr = new XMLHttpRequest(), json;
        xhr.open('GET', url);
        xhr.addEventListener('load', () => {
            try {
                json = JSON.parse(xhr.responseText);
            } catch (error) {
                console.warn('Attempt to parse JSON data has failed!');
            }
            resolve(json);
        });
        xhr.addEventListener('timeout', () => {
            reject();
        });
        xhr.addEventListener('error', () => {
            reject();
        });
        xhr.send();
    });
};
