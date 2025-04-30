const path = require('path');
const fs = require('fs').promises;
const colors = require('./lib/colors');
const readline = require('./lib/readline');
const lekCryptools = require("lek-cryptools");
const clipboard = require('clipboardy');

const encFile = path.join(process.env.TKN_PATH || process.cwd(), 'data.enc');

const referencies =
{
    password : null,
    data : null
}

const existsFile = async(path) =>
{
    try {
      await fs.access(path);
      return true;
    } catch (err) {
      return false;
    }
}

const refreshEncFile = async(msg) =>
{
    const jsonData = JSON.stringify(referencies.data);
    const encData = await lekCryptools.cipher(Buffer.from(jsonData, "utf-8"), referencies.password);
    await fs.writeFile(encFile, encData);
    console.log(msg);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return;
}

const inicialization = async() =>
{
    if(!await existsFile(encFile))
    {
        await fs.writeFile(encFile, Buffer.from(""));
    }
    
    const data = await fs.readFile(encFile);
    if(data.length === 0)
    {
        console.log(colors.cyan + 'Welcome to the password manager');
        console.log(colors.cyan + 'Please enter your master password');
    
        const password = await readline.inputPassword(colors.cyan + 'Enter your password: ');
        const confirmPassword = await readline.inputPassword(colors.cyan +'Confirm your password: ');
    
        if(password !== confirmPassword)
        {
            console.log(colors.red + 'Passwords do not match');
            inicialization();
        }
        else
        {
            referencies.password = password;
            referencies.data = { tags : {} };

            await refreshEncFile(colors.cyan +'Password saved successfully')
            return;
        }
    }
    else
    {
        console.log(colors.cyan + 'Welcome to the password manager');
    
        const pass = await readline.inputPassword(colors.cyan + 'Please enter your master password');

        try
        {
            const deciphredData = await lekCryptools.decipher(data, pass);
            referencies.data = JSON.parse(deciphredData);
            referencies.password = pass;
            if(!referencies.data.tags) throw new Error("error in ciphred data");
            return;
        }
        catch(err)
        {
            if(err instanceof lekCryptools.LekCryptoolsError)
            {
                console.log(colors.red + "Incorrect password");
                return inicialization();
            }
            else
            {
                throw err;
            }
        }
    }
}

const createTkn = async() =>
{
    console.clear();
    const tag = await readline.input("tag of token: ");
    const tkn = await readline.inputPassword("token: ");

    referencies.data.tags[tag] = tkn;
    await refreshEncFile(colors.cyan + "all right!");
    return menu();
}
const deleteTkn = async() =>
{
    const option = await readline.select(...Object.keys(referencies.data.tags), "__get back__");
    if(option === "__get back__") return menu();
    
    delete referencies.data.tags[option];
    await refreshEncFile("item is deleted");
    return menu();
}
const getTkn = async() =>
{
    const option = await readline.select(...Object.keys(referencies.data.tags), "__get back__");
    if(option === "__get back__") return menu();

    await clipboard.default.write(referencies.data.tags[option]);
    return menu();
}
const exit = async() =>
{
    console.log(colors.red + 'Exiting...');   
    process.exit(0);
}

const menu = async() =>
{
    console.clear();

    const menuOption = await readline.select("create tkn", "delete tkn", "get tkn", "exit");

    ({
        "create tkn" : createTkn,
        "delete tkn" : deleteTkn,
        "get tkn" : getTkn,
        "exit" : exit
    })[menuOption]();
}

const main = async() =>
{
    await inicialization();
    await menu();
}
main();