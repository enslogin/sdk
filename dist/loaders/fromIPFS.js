"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import IPFS     from 'ipfs';
var ipfs_http_client_1 = __importDefault(require("ipfs-http-client"));
var vm_1 = __importDefault(require("vm"));
function __loadFromNode(node, fileHash, config) {
    return new Promise(function (resolve, reject) {
        node.get(fileHash)
            .then(function (files) {
            files
                .filter(function (file) { return file.content !== undefined; })
                .forEach(function (file) {
                if (config.__callbacks && config.__callbacks.loaded) {
                    config.__callbacks.loaded(file.name);
                }
                vm_1.default.runInThisContext(file.content.toString(), { filename: file.name });
            });
            resolve();
        })
            .catch(reject);
    });
}
function fromIPFS(fileHash, config) {
    if (config === void 0) { config = {}; }
    if (config.__callbacks && config.__callbacks.loading) {
        config.__callbacks.loading(fileHash);
    }
    return __loadFromNode(ipfs_http_client_1.default(config.ipfs || { host: 'ipfs.infura.io', port: 5001, protocol: 'https' }), fileHash, config);
}
exports.fromIPFS = fromIPFS;
// export function fromIPFS(fileHash: string, config: types.config = {})
// {
// 	return new Promise((resolve, reject) => {
// 		const node = new IPFS();
// 		node.once('ready', () => {
// 			console.log('node started');
// 			if (config.__callbacks && config.__callbacks.loading) { config.__callbacks.loading(fileHash); }
// 			__loadFromNode(node, fileHash, config)
// 			.then(() =>{ node.stop(resolve); })
// 			.catch(reject);
// 		});
// 		node.once('stop', () => {
// 			console.log('node stopped');
// 		});
// 	});
// }
