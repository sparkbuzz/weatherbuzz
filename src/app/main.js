import {getForecast, getWeather} from './weather/api';
import {resolveIcon} from './weather/utils';

exports.main = function () {
    if ('geolocation' in navigator) {

        let weatherData = null, forecastData = null;

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                let options = {
                    lat: pos.coords.latitude,
                    long: pos.coords.longitude
                };

                getWeather(options, (weatherData) => {
                    document.querySelector('.wi').className = resolveIcon(weatherData.weather[0].id);
                    document.querySelector('.description').innerText = weatherData.weather[0].description;
                    document.querySelector('.name').innerText = weatherData.name;
                    document.querySelector('.temp').innerText = `${weatherData.main.temp}°C`;
                    document.querySelector('.min_max').innerText = `${weatherData.main.temp_min}°C / ${weatherData.main.temp_max}°C`;
                    document.querySelector('.humidity').innerText = `${weatherData.main.humidity}%`;
                    document.querySelector('.pressure').innerText = `${weatherData.main.pressure}hPa`;
                });

                getForecast(options, (forecastData) => {
                    let target = document.querySelector('.forecast');
                    for (let fc of forecastData.list) {
                        let el = document.createElement('span');
                        let d = fc.dt_txt;
                        let id = fc.weather[0].id;
                        d = parseInt(d.split(' ')[1].split(':')[0], 10);
                        d = d > 12 ? (d - 12) + 'pm' : (d === 0 ? 12 + 'am' : d + 'pm');
                        el.innerHTML = `
                            <span>${d}</span>
                            <span class="${resolveIcon(id)}"></span>
                            <span>${fc.main.temp}°C</span>
                        `;
                        target.appendChild(el);
                    }
                });
            },
            (e) => {
                console.warn(e.message);
            }
        );
    }
};
