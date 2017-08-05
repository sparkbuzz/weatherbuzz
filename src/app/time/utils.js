/**
 * Converts the given time string to 12-hour format and post fixes am/pm
 * For example, 13:00:00 will become 1pm.
 */
exports.toHour12 = (time) => {
    let h = parseInt(time.split(' ')[1].split(':')[0], 10);
    let postfix = h < 12 ? 'am' : 'pm';
    h = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return h + postfix;
};
