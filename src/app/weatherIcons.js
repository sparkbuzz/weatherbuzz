import {icons} from './icons';

/**
 * @param {int} id
 * @returns {string}
 */
exports.resolveIcon = (id) => {
    let icon = icons[id].icon;

    if (!(id > 699 && id < 800) && !(id > 899 && id < 1000)) {
        icon = 'day-' + icon;
    }

    return `wi wi-${icon}`;
};
