exports.main = function () {
    if ('geolocation' in navigator) {
        /**
         * @type {{}}}
         */
        const api = {
            key: '0debd7e718f5e44cc704406f24fffbc0',
            endPoint: 'http://api.openweathermap.org/data/2.5'
        };

        let weatherData = null, forecastData = null;

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                let url = `${api.endPoint}/weather?appid=${api.key}`;
                url += `&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=metric`;

                // Get the current weather

                let weatherXhr = new XMLHttpRequest();
                weatherXhr.open('GET', url);
                weatherXhr.addEventListener('load', () => {
                    try {
                        weatherData = JSON.parse(weatherXhr.responseText);
                    } catch (error) {
                        console.warn('Attempt to parse JSON data has failed!');
                    }

                    document.querySelector('.wi').className = 'wi wi-day-cloudy';

                    document.querySelector('.description').innerText = weatherData.weather[0].description;

                    document.querySelector('.name').innerText = weatherData.name;
                    document.querySelector('.temp').innerText = `${weatherData.main.temp}°C`;
                    document.querySelector('.min_max').innerText = `${weatherData.main.temp_min}°C/${weatherData.main.temp_max}°C`;
                    document.querySelector('.humidity').innerText = `${weatherData.main.humidity}%`;
                    document.querySelector('.pressure').innerText = `${weatherData.main.pressure}hPa`;
                });
                weatherXhr.send();

                // Get the forecast for the day

                url = `${api.endPoint}/forecast?appid=${api.key}`;
                url += `&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=metric`;

                let forecastXhr = new XMLHttpRequest();
                forecastXhr.open('GET', url);
                forecastXhr.addEventListener('load', () => {
                    try {
                        forecastData = JSON.parse(forecastXhr.responseText);
                    } catch (error) {
                        console.warn('Attempt to parse JSON data has failed!');
                    }

                    let target = document.querySelector('.forecast');
                    for (let fc of forecastData.list) {
                        let el = document.createElement('span');
                        let d = fc.dt_txt;
                        d = parseInt(d.split(' ')[1].split(':')[0], 10);
                        d = d > 12 ? (d - 12) + 'pm' : (d === 0 ? 12 + 'am' : d + 'pm')
                        el.innerHTML = `
                        <span>${d}</span>
                        <span class="wi wi-day-cloudy"></span>
                        <span>${fc.main.temp}°</span>
                        
                    `;
                        target.appendChild(el);
                    }
                });
                forecastXhr.send();

            },
            (e) => {
                console.warn(e.message);
            }
        );
    }
};
