const chalk = require('chalk');
const colors = new chalk.Instance({ level: 3 });

class Logger {
    constructor(color, isNoColor) {
        this.color = color || '#1D99F3';

        this.colors = new chalk.Instance({ level: isNoColor ? 0 : 3 });
    }

    line() {
        console.log();
    }

    /**
     * @param {String} msg
     */
    title(msg) {
        console.log(`   ${msg.toUpperCase()}`);
    }

    /**
     * @param {String} msg
     * @param {string} [icon='']
     */
    log(msg, icon = '') {
        console.log(` ${this.colors.hex(this.color)(icon)} ${msg}`);
    }

    /**
     * @param {String} msg
     * @param {string} [icon='']
     */
    warn(msg, icon = '') {
        console.warn(` ${this.colors.hex(this.color)(icon)} ${msg}`);
    }

    /**
     * @param {String} msg
     * @param {string} [icon='']
     */
    error(msg, icon = '') {
        console.error(` ${this.colors.hex(this.color)(icon)} ${msg}`);
    }
}

module.exports = Logger;
