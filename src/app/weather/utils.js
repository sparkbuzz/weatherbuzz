import {icons} from '../../config/icons';

/**
 * Returns a class name string for the corresponding OpenWeatherMa[ icon ID.
 * @param {int} id OpenWeatherMap icon ID
 * @returns {string} Class name, for example "wi wi-day-rain"
 */
exports.resolveIcon = (id) => {
    let icon = icons[id].icon;

    if (!(id > 699 && id < 800) && !(id > 899 && id < 1000)) {
        icon = 'day-' + icon;
    }

    return `wi wi-${icon}`;
};
