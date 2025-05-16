const colors = require("../colors");
const data = require("../data");
const lekCryptools = require("lek-cryptools");
const readline = require("../readline");

const systemConfig = {};

const setInitialPass = async() =>
{
    console.log(colors.cyan + 'Welcome to the password manager');
    console.log(colors.cyan + 'Please enter your master password');

    const password = await readline.inputPassword(colors.cyan + 'Enter your password: ');
    const confirmPassword = await readline.inputPassword(colors.cyan +'Confirm your password: ');

    if(password !== confirmPassword)
    {
        console.log(colors.red + 'Passwords do not match');
        return await setInitialPass();
    }
    else
    {
        await data.init(password);

        console.log(colors.cyan +'Password saved successfully');
        await await new Promise(resolve => setTimeout(resolve, 1000));
        return;
    }
}

const requirePass = async() =>
{
    console.log(colors.cyan + 'Welcome to the password manager');
    
    const pass = await readline.inputPassword(colors.cyan + 'Please enter your master password');

    try
    {
        await data.init(pass);
    }
    catch(err)
    {
        if(err instanceof lekCryptools.LekCryptoolsError)
        {
            console.log(colors.red + "Incorrect password");
            return await requirePass();
        }
        else
        {
            throw err;
        }
    }
}

systemConfig.init = async() =>
{   
    if(await data.isEmpty())
    {
        return await setInitialPass();
    }
    else
    {
        return await requirePass();
    }
}

module.exports = systemConfig;