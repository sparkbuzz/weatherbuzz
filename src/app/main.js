import {getForecast, getWeather} from './weather/api';
import {resolveIcon} from './weather/utils';
import {toHour12} from './time/utils';

class Main {
    /**
     * Constructor
     */
    constructor() {
        document.addEventListener('DOMContentLoaded', this.onDomContentLoaded.bind(this));
        if (!'geolocation' in navigator) {
            throw new Error('Geolocation not supported on browser!');
        }
        this.updateWeather();
    }

    /**
     * DOMContentLoaded
     */
    onDomContentLoaded() {
        let refreshButton = document.querySelector('#refresh');
        refreshButton.addEventListener('click', () => {
            this.setBusy();
            this.updateWeather();
        });
    }

    /**
     * Update the weather.
     */
    updateWeather() {
        navigator.geolocation.getCurrentPosition(this.onResolveCurrentPosition.bind(this),
            (e) => {
                this.setError(e.message ? e.message : "Location unavailable!");
                console.warn('Oops!', e);
            }
        );
    }

    // noinspection JSMethodCanBeStatic
    /**
     * Set busy state
     */
    setBusy() {
        document.querySelector('.loader').innerHTML = `
            <span class="pulsate">Loading...</span>
        `;
        document.querySelector('main').classList.add('hidden');
        document.querySelector('.loader').classList.remove('hidden');
    }

    /**
     * Set idle state
     */
    setIdle() {
        document.querySelector('main').classList.remove('hidden');
        document.querySelector('.loader').classList.add('hidden');
    }

    /**
     * Display error message
     * @param message
     */
    setError(message) {
        document.querySelector('.loader').innerHTML = `
            <span>
                <h1>Error!</h1>
                <span>${message}</span>
            </span>
        `;
    }

    /**
     * Render the current weather conditions
     * @param {{weather, name, main: {temp, temp_min, temp_max humidity, pressure}}} data
     */
    renderCurrentWeather(data) {
        document.querySelector('.wi').className = resolveIcon(data.weather[0].id);
        document.querySelector('.description').innerText = data.weather[0].description;
        document.querySelector('.location').innerText = data.name;
        document.querySelector('.temp').innerText = `${data.main.temp}°C`;
        document.querySelector('.min_max').innerText = `${data.main.temp_min}°C / ${data.main.temp_max}°C`;
        document.querySelector('.humidity').innerText = `${data.main.humidity}%`;
        document.querySelector('.pressure').innerText = `${data.main.pressure}hPa`;
    }

    /**
     * Render the 3-hourly weather forecast data
     * @param data
     */
    renderForecastWeather(data) {
        let target = document.querySelector('.forecast');
        for (let fc of data.list) {
            let el = document.createElement('span');

            el.innerHTML = `
                <span class="hour">${toHour12(fc.dt_txt)}</span>
                <span class="${resolveIcon(fc.weather[0].id)}"></span>
                <span class="temp">${fc.main.temp}°C</span>
            `;

            target.appendChild(el);
        }
    }

    /**
     * Event handler fired when the current GPS location is resolved.
     * @param pos
     */
    onResolveCurrentPosition(pos) {
        Promise.all([getWeather(pos.coords), getForecast(pos.coords)])
            .then((values) => {
                let [weatherData, forecastData] = values;
                this.renderCurrentWeather(weatherData);
                this.renderForecastWeather(forecastData);
                this.setIdle();
            })
            .catch((e) => {
                console.log(e);
                this.setError('Unable to fetch weather data!')
            });
    }
}

exports.Main = Main;
