"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ipfs_http_client_1 = __importDefault(require("ipfs-http-client"));
var vm_1 = __importDefault(require("vm"));
function fromIPFS(protocol, path, config) {
    if (config === void 0) { config = {}; }
    return new Promise(function (resolve, reject) {
        if (config.__callbacks && config.__callbacks.loading) {
            config.__callbacks.loading(protocol, path);
        }
        ipfs_http_client_1.default(config.ipfs || { host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
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
exports.fromIPFS = fromIPFS;
