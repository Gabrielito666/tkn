const colors = require("../colors");
const data = require("../data");
const readline = require("../readline");

const methods = {};

methods.createTkn = async(params) =>
{
    console.clear();
    const tag = params.tag || await readline.input("tag of token: ");
    const tkn = await readline.inputPassword("token: ");

    await data.setTkn(tag, tkn);
}
methods.deleteTkn = async(params) =>
{
    const option = params.tag || await readline.select(...Object.keys(data.getTags()), "__get back__");
    if(option === "__get back__") return;
    
    await data.deleteTkn(option);
}
methods.getTkn = async(params) =>
{
    const option = params.tag || await readline.select(...Object.keys(data.getTags()), "__get back__");
    if(option === "__get back__") return;

    if(params.clipboard || !params.log) await clipboard.default.write(data.getTkn(option));
    if(params.log)
    {
        console.clear();
        console.log(data.getTkn(option));
    }
    return;
}
methods.exit = async() =>
{
    console.log(colors.red + 'Exiting...');   
    process.exit(0);
}

methods.menu = async() =>
{
    console.clear();

    const menuOption = await readline.select("create tkn", "delete tkn", "get tkn", "exit");

    await ({
        "create tkn" : methods.createTkn,
        "delete tkn" : methods.deleteTkn,
        "get tkn" : methods.getTkn,
        "exit" : methods.exit
    })[menuOption]({});
    
    await methods.menu();
}

module.exports = methods;