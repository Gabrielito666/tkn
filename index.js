const flags = require('./lib/flags');
const systemConfig = require('./lib/system-config');
const methods = require('./lib/methods');

const main = async() =>
{
    const command = process.argv[2];

    const params = {};

    switch(command)
    {
        case "create":
        case "c":

            await systemConfig.init();
            params.tag = flags.tag();
            methods.createTkn(params);

        break;
        case "get":
        case "g":

            await systemConfig.init();
            params.tag = flags.tag();
            params.log = flags.log();
            params.clipboard = flags.clipboard() || !flags.log();
            methods.getTkn(params);

        break;
        case "delete":
        case "d":

            await systemConfig.init();
            params.tag = flags.tag();
            methods.deleteTkn(params);

        break;
        case "help":
        case "h":
            
            methods.help();

        break;
        case undefined:
            await systemConfig.init();
            methods.menu();
        break;

        default:
            methods.default();
        break;
    }
}
main();