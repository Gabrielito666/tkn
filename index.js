const flags = require('./lib/flags');
const systemConfig = require('./lib/system-config');
const methods = require('./lib/methods');

const main = async() =>
{

    await systemConfig.init();

    const command = process.argv[2];

    const params = {};

    switch(command)
    {
        case "create":
        case "c":
            params.tag = flags.tag();

            await methods.createTkn(params);
            break;

        case "get":
        case "g":
            params.tag = flags.tag();
            params.log = flags.log();
            params.clipboard = flags.clipboard() || !flags.log();

            await methods.getTkn(params);
            break;
        case "delete":
        case "d":
            params.tag = flags.tag();

            await methods.deleteTkn(params);
            break;

        case "help":
        case "h":
            console.log("help");
            break;

        case undefined:
            await methods.menu();
            break;

        default:
            console.log("default");
            break;
    }
    methods.exit();
}
main();