const path = require('path');
const fs = require('fs').promises;
const lekCryptools = require("lek-cryptools");

const encFile = path.join(process.env.TKN_PATHJ || process.cwd(), 'data.enc'); //Solo para modo devvv la J

const referencies =
{
    password : null,
    data : { tags: {} }
}

const existsFile = async(path) =>
{
    try
    {
      await fs.access(path);
      return true;
    }
    catch (err)
    {
      return false;
    }
}

const refreshEncFile = async() =>
{
    const jsonData = JSON.stringify(referencies.data);
    const encData = await lekCryptools.cipher(Buffer.from(jsonData, "utf-8"), referencies.password);
    await fs.writeFile(encFile, encData);
    return;
}

const data = {};

data.init = async(password) =>
{
    referencies.password = password;
    if(!await existsFile(encFile))
    {
        await fs.writeFile(encFile, Buffer.from(""));
        await refreshEncFile();
    }
    else
    {
        const data = await fs.readFile(encFile);
        const deciphredData = await lekCryptools.decipher(data, password);
        referencies.data = JSON.parse(deciphredData);
        referencies.password = password;

        if(!referencies.data.tags) throw new Error("error in ciphred data");
        return;
    }
}
data.isEmpty = async() =>
{
    if(!await existsFile(encFile)) return true;
    else if((await fs.readFile(encFile)).length === 0) return true;
    else return false;
}

data.setTkn = async(tag, tkn) =>
{
    referencies.data.tags[tag] = tkn;
    await refreshEncFile();
}
data.deleteTkn = async(tag) =>
{
    delete referencies.data.tags[tag];
    await refreshEncFile();
}
data.getTkn = (tag) => referencies.data.tags[tag];

data.getTags = () => referencies.data.tags;

module.exports = data;