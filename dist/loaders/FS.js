"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vm_1 = __importDefault(require("vm"));
var fs_1 = __importDefault(require("fs"));
function loader(protocol, path, config) {
    if (config === void 0) { config = {}; }
    return new Promise(function (resolve, reject) {
        if (config.__callbacks && config.__callbacks.loading) {
            config.__callbacks.loading(protocol, path);
        }
        var stats = fs_1.default.lstatSync(path);
        if (stats.isFile()) {
            if (config.__callbacks && config.__callbacks.loaded) {
                config.__callbacks.loaded(protocol, path);
            }
            vm_1.default.runInThisContext(fs_1.default.readFileSync(path).toString(), { filename: path });
            resolve();
        }
        else if (stats.isDirectory()) {
            Promise.all(fs_1.default.readdirSync(path).map(function (file) { return loader(protocol, path + "/" + file, config); }))
                .then(function () { resolve(); })
                .catch(reject);
        }
        else {
            reject("unsupported filePath format");
        }
    });
}
exports.loader = loader;
exports.default = { "file": loader };
