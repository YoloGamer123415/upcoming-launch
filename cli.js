const { program } = require('commander');
const nextLaunch = require('./src/nextLaunch');

program
    .version('0.0.1')

    .option('--disable-color', 'Disable colors', false)
    .option('-nl, --next-launch', 'Display the next launch', false)
    .option('--end <end string>', 'A string to log after logging the next launch. Only works with --next-launch')
    .option('--color <color>', 'A hex color to be used in the text displaying', '#1D99F3')

    .parse(process.argv);

const COLOR = program.color;
const IS_NO_COLOR = program.disableColor;

if (program.nextLaunch) {
    nextLaunch(COLOR, program.end, IS_NO_COLOR);
}
