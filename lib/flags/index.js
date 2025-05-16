const flags = {};

flags.getParamWithValue = flag =>
{
    let value;
    process.argv.forEach((arg, i) => { if(arg === flag) value = process.argv[i+1] });
    console.log(process.argv);
    return value;
}
flags.getBooleanParam = flag => process.argv.includes(flag);

flags.tag = () => flags.getParamWithValue("--tag");
flags.log = () => flags.getBooleanParam("--log");
flags.clipboard = () => flags.getBooleanParam("--clipboard");

module.exports = flags;