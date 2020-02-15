"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vm_1 = __importDefault(require("vm"));
const ipfs_http_client_1 = __importDefault(require("ipfs-http-client"));
function loader(protocol, path, config = {}) {
    return new Promise((resolve, reject) => {
        if (config.__callbacks && config.__callbacks.loading) {
            config.__callbacks.loading(protocol, path);
        }
        ipfs_http_client_1.default(Object.assign({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }, config.ipfs))
            .get(path)
            .then(files => {
            files
                .filter(file => file.content !== undefined)
                .forEach(file => {
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
