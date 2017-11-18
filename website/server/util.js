let fs = require("fs");
let util = require("util");


let write = util.promisify(fs.writeFile);
 
let unlink = util.promisify(fs.unlink);

module.exports = {
    writeFile: write,
    unlink: unlink
}