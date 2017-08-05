import {api} from '../../config/config';

exports.getForecast = (options, success) => {
    let url = `${api.endPoint}/forecast?appid=${api.key}`;
    url += `&lat=${options.lat}&lon=${options.long}&units=metric`;

    let xhr = new XMLHttpRequest(), json;
    xhr.open('GET', url);
    xhr.addEventListener('load', () => {
        try {
            json = JSON.parse(xhr.responseText);
        } catch (error) {
            console.warn('Attempt to parse JSON data has failed!');
        }
        success(json);
    });
    xhr.send();
};

exports.getWeather = (options, success) => {
    let url = `${api.endPoint}/weather?appid=${api.key}`;
    url += `&lat=${options.lat}&lon=${options.long}&units=metric`;

    let xhr = new XMLHttpRequest(), json;
    xhr.open('GET', url);
    xhr.addEventListener('load', () => {
        try {
            json = JSON.parse(xhr.responseText);
        } catch (error) {
            console.warn('Attempt to parse JSON data has failed!');
        }
        success(json);
    });
    xhr.send();
};
