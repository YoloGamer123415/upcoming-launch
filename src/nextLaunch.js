const axios = require('axios');
const { EOL } = require('os');
const Logger = require('./logger');
const { formatDate, formatTMinus } = require('./time');

/**
 * @typedef {Object} Agency
 * @property {Number} id
 * @property {String} name
 * @property {String} abbrev
 * @property {String} countryCode
 * @property {Number} type
 * @property {String} changed
 * @property {String[]} [infoURLs]
 */

/**
 * @typedef {Object} LSP
 * @property {Number} id
 * @property {String} name
 * @property {String} abbrev
 * @property {String} countryCode
 * @property {Number} type
 * @property {String} changed
 * @property {String[]} infoURLs
 */

 /**
  * @typedef {Object} Mission
  * @property {Number} id
  * @property {String} name
  * @property {String} description
  * @property {Number} type
  * @property {String} typeName
  * @property {Agency[]} agencies
  * @property {any[]} payloads
  */

/**
 * @typedef {Object} Rocket
 * @property {Number} id
 * @property {String} name
 * @property {String} configuration
 * @property {String} familyname
 * @property {Agency[]} agencies
 * @property {String[]} [infoURLs]
 * @property {Number[]} imageSizes
 * @property {String} [imageURL]
 */

/**
 * @typedef {Object} Pad
 * @property {Number} id
 * @property {String} name
 * @property {String} [mapURL]
 * @property {Number} latitude
 * @property {Number} longitude
 * @property {Agency[]} agencies
 */

/**
 * @typedef {Object} Location
 * @property {Pad[]} pads
 * 
 * @property {Number} id
 * @property {String}  name
 * @property {String} countryCode
 */

/**
 * @typedef {Object} Launch
 * @property {Number} id
 * @property {String} name
 * 
 * @property {String} windowstart
 * @property {String} windowend
 * @property {String} net
 * @property {Number} wsstamp
 * @property {Number} westamp
 * @property {Number} netstamp
 * @property {String} isostart
 * @property {String} isoend
 * @property {String} isonet
 * 
 * @property {Number} status
 * @property {Number} tbdtime
 * 
 * @property {String[]} [vidURLs]
 * @property {String[]} [infoURLs]
 * 
 * @property {String} [holdreason]
 * @property {String} [failreason]
 * 
 * @property {Number} tbddate
 * @property {Number} probability
 * 
 * @property {String} [hashtag]
 * 
 * @property {String} changed
 * 
 * @property {Location} location
 * @property {Rocket} rocket
 * @property {Mission[]} missions
 * @property {LSP} lsp
 */

const URL = 'https://launchlibrary.net/1.4/launch/next/1/';
const STATUS = {
    1: {
        text: 'Green',
        color: 'green'
    },
    2: {
        text: 'Red',
        color: 'red'
    },
    3: {
        text: 'Succes',
        color: 'green'
    },
    4: {
        text: 'Failed',
        color: 'red'
    }
};
const ICONS = {
    clock: '',
    hourglass: '',
    rocket: '',
    crosshair: '',
    location: '',
    percentage: '',
    text: '',
    url: '',
    status: {
        succes: '',
        failed: '',
        green: '',
        red: ''
    }
}

/**
 * @param {String} [color]
 * @param {String} end
 * @param {Boolean} noColor
 */
function nextLaunch(color, end, noColor) {
    const logger = new Logger(color, noColor);

    axios({
        method: 'GET',
        url: URL
    }).then(res => res.data.launches)
        .then(launches => {
            /**
             * @type {Launch}
             */
            let launch = launches[0];

            if (!launch) {
                logger.error(`Something went wrong.`);
            } else {
                let [ rocket, missionName ] = launch.name.split('|').map(_ => _.trim() );
                let startDate = new Date(launch.windowstart);
                let startDateReadable = formatDate(startDate);
                let tMinus = startDate.getTime() - Date.now();
                let tMinusReadable = formatTMinus(tMinus);
                let status = STATUS[ launch.status ];
                let probability = launch.probability;
                let location = launch.location.name;
                let pad = launch.location.pads[0].name;
                let mission = launch.missions[0].description;
                let vidURL = launch.vidURLs[0];

                logger.title(`   Next Rocket Launch`);

                logger.log(missionName, ICONS.crosshair);
                logger.log(rocket, ICONS.rocket);
                logger.log(startDateReadable, ICONS.clock);

                if (launch.status === 1)
                    logger.log(tMinusReadable, ICONS.hourglass);
                else
                    logger.log(`Launch date unconfirmed`, ICONS.hourglass);

                logger.log(location, ICONS.location);
                logger.log(pad, ' ');

                logger.log( logger.colors.keyword(status.color)(status.text), ICONS.status[ status.text.toLowerCase() ]);
                
                if (probability < 0)
                    logger.log(`Unknown`, ICONS.percentage);
                else
                    logger.log(`${probability}%`, ICONS.percentage);

                logger.log(mission, ICONS.text);

                if (vidURL)
                    logger.log(vidURL, ICONS.url);

                if (end)
                    console.log( end.replace(/\\n/g, EOL).trim() );
            }
        })
        .catch(err => {
            logger.error(`Something went wrong.`);
            logger.line();
            throw err;
        });
}

module.exports = nextLaunch;
