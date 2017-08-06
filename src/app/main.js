import {getForecast, getWeather} from './weather/api';
import {resolveIcon} from './weather/utils';
import {toHour12} from './time/utils';

exports.main = function () {
    if (!'geolocation' in navigator) {
        throw new Error('Geolocation not supported on browser!');
        return;
    }

    updateWeather();

    function updateWeather() {
        navigator.geolocation.getCurrentPosition(onResolveCurrentPostion,
            (e) => {
                console.warn(e.message);
            }
        );
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelector('#refresh').addEventListener('click', () => {
            setBusy();
            updateWeather();
        })
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
        Promise.all([getWeather(pos.coords), getForecast(pos.coords)])
            .then((values) => {
                let [weatherData, forecastData] = values;

                document.querySelector('.wi').className = resolveIcon(weatherData.weather[0].id);
                document.querySelector('.description').innerText = weatherData.weather[0].description;
                document.querySelector('.location').innerText = weatherData.name;
                document.querySelector('.temp').innerText = `${weatherData.main.temp}°C`;
                document.querySelector('.min_max').innerText = `${weatherData.main.temp_min}°C / ${weatherData.main.temp_max}°C`;
                document.querySelector('.humidity').innerText = `${weatherData.main.humidity}%`;
                document.querySelector('.pressure').innerText = `${weatherData.main.pressure}hPa`;

                let target = document.querySelector('.forecast');
                for (let fc of forecastData.list) {
                    let el = document.createElement('span');

                    el.innerHTML = `
                                <span class="hour">${toHour12(fc.dt_txt)}</span>
                                <span class="${resolveIcon(fc.weather[0].id)}"></span>
                                <span class="temp">${fc.main.temp}°C</span>
                            `;

                    target.appendChild(el);
                }

                setIdle();
            });
    }
};
