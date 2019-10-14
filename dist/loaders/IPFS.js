"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vm_1 = __importDefault(require("vm"));
var ipfs_http_client_1 = __importDefault(require("ipfs-http-client"));
function loader(protocol, path, config) {
    if (config === void 0) { config = {}; }
    return new Promise(function (resolve, reject) {
        if (config.__callbacks && config.__callbacks.loading) {
            config.__callbacks.loading(protocol, path);
        }
        ipfs_http_client_1.default(__assign({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }, config.ipfs))
            .get(path)
            .then(function (files) {
            files
                .filter(function (file) { return file.content !== undefined; })
                .forEach(function (file) {
                if (config.__callbacks && config.__callbacks.loaded) {
                    config.__callbacks.loaded(protocol, path);
                }
                vm_1.default.runInThisContext(file.content.toString(), { filename: file.name });
            });
            resolve();
        })
            .catch(reject);
    });
}
exports.loader = loader;
exports.default = { "ipfs": loader };
