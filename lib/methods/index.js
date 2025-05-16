const colors = require("../colors");
const data = require("../data");
const readline = require("../readline");
const clipboard = new Promise((resolve, reject) =>
{
    try
    {
        resolve(require("clipboardy").default);
    }
    catch(err)
    {
        import("clipboardy").then(c => resolve(c.default)).catch(console.err);
    }
});

const MENU_OPTIONS = ["create tkn", "delete tkn", "get tkn", "exit"];

const methods = {};

methods.createTkn = async(params) =>
{
    const tag = params.tag || await readline.input("tag of token: ");
    const tkn = await readline.inputPassword("token: ");
    await data.setTkn(tag, tkn);
    process.exit(0);
}

methods.deleteTkn = async(params) =>
{
    const options = Object.keys(data.getTags());
    const tag = params.tag || await readline.select(...options);
    await data.deleteTkn(tag);
    process.exit(0);
}
methods.getTkn = async(params) =>
{
    const options = Object.keys(data.getTags());
    const tag = params.tag || await readline.select(...options);
    const value = data.getTkn(tag);

    if(params.clipboard) await (await clipboard).write(value || "null");
    if(params.log)
    {
        console.clear();
        console.log(value || null);
    }
    process.exit(0);
}

methods.help = () =>
{
    console.log(colors.cyan + "tkn commands:");
    console.log(colors.white + "\tjust `tkn`to access to menu");
    console.log("\t`create` or `c`: possible flags `--tag`");
    console.log("\t`delete` or `d`: possible flags `--tag`");
    console.log("\t`get` or `g`: possible flags `--tag`, `--log`, `--clipboard`");
    console.log("");
    console.log(colors.cyan + "more information in `https://github.com/Gabrielito666/tkn`");
    process.exit(0);
}

methods.default = () =>
{
    console.log(colors.red + "command Error... use `tkn help` to get possible commands");
    process.exit(0);
}

const useTagOptions = async() =>
{
    const options = [...Object.keys(data.getTags()), "__get back__"];
    return await readline.select(...options);
}

methods.menu = async() =>
{
    while(true)
    {
        console.clear();
        const menuOption = await readline.select(...MENU_OPTIONS);
        console.clear();
    
        switch(menuOption)
        {
            case "create tkn":
    
                const tag = await readline.input("tag of token: ");
                const tkn = await readline.inputPassword("token: ");
                await data.setTkn(tag, tkn);
    
            break;
            case "delete tkn":

                const deleteOption = await useTagOptions();
                if(deleteOption !== "__get back__")
                {
                    await data.deleteTkn(deleteOption);
                }

            break;
            case "get tkn":
    
                const getOption = await useTagOptions();
                if(getOption !== "__get back__")
                {
                    await (await clipboard).write(data.getTkn(getOption));
                }
    
            break;
            case "exit":
                console.log(colors.red + 'Exiting...');   
            process.exit(0);
        }
    }
}

module.exports = methods;