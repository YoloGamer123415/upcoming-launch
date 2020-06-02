const DAYS = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
const MONTHS = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

/**
 * @param {Date} date
 * @returns {String}
 */
function formatDate(date) {
    return DAYS[ date.getDay() ] + ' '
        + MONTHS[ date.getMonth() ] + ' '
        + date.getDate() + ', '
        + date.getHours().toString().padStart(2, '0') + ':'
        + date.getMinutes().toString().padStart(2, '0') + ':'
        + date.getSeconds().toString().padStart(2, '0');
}

/**
 * @param {Number} time
 */
function formatTMinus(time) {
    let ret = 'T-';

    let millis = time % 1000;
    time = (time - millis) / 1000;
    let seconds = time % 60;
    time = (time - seconds) / 60;
    let minutes = time % 60;
    time = (time - minutes) / 60;
    let hours = time % 24;
    time = (time - hours) / 24
    let days = time % 24;

    if (days >= 1)
        ret += `${days}d `;

    ret += `${hours.toString().padStart(2, '0')}h `;
    ret += `${minutes.toString().padStart(2, '0')}m `;
    ret += `${seconds.toString().padStart(2, '0')}s`;

    return ret;
}

module.exports.DAYS = DAYS;
module.exports.MONTHS = MONTHS;
module.exports.formatDate = formatDate;
module.exports.formatTMinus = formatTMinus;
