"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var vm_1 = __importDefault(require("vm"));
function fromFS(protocol, path, config) {
    if (config.__callbacks && config.__callbacks.loading) {
        config.__callbacks.loading(path);
    }
    return new Promise(function (resolve, reject) {
        var stats = fs_1.default.lstatSync(path);
        if (stats.isFile()) {
            if (config.__callbacks && config.__callbacks.loaded) {
                config.__callbacks.loaded(path);
            }
            vm_1.default.runInThisContext(fs_1.default.readFileSync(path).toString(), { filename: path });
            resolve();
        }
        else if (stats.isDirectory()) {
            Promise.all(fs_1.default.readdirSync(path).map(function (file) { return fromFS(protocol, path + "/" + file, config); }))
                .then(function () { resolve(); })
                .catch(reject);
        }
        else {
            reject("unsupported filePath format");
        }
    });
}
exports.fromFS = fromFS;
