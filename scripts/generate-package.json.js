"use strict";
exports.__esModule = true;
var pjson = require("../package.json");
var fs = require("fs");
function generate(name) {
    return JSON.stringify({
        name: "@scaljeri/fbp/" + name,
        version: "" + pjson.version,
        license: 'MIT',
        main: './index.js',
        types: './index.d.ts'
    }, null, 4);
}
['browser', 'nodejs'].forEach(function (name) {
    fs.writeFileSync("./dist/" + name + "/package.json", generate(name));
});
