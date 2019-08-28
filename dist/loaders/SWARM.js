"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vm_1 = __importDefault(require("vm"));
var swarm_js_1 = __importDefault(require("swarm-js"));
function loader(protocol, path, config) {
    if (config === void 0) { config = {}; }
    return new Promise(function (resolve, reject) {
        if (config.__callbacks && config.__callbacks.loading) {
            config.__callbacks.loading(protocol, path);
        }
        swarm_js_1.default
            .at(config.swarm || "http://swarm-gateways.net")
            .download(path)
            .then(function (data) {
            // TODO handle dirs
            if (config.__callbacks && config.__callbacks.loaded) {
                config.__callbacks.loaded(protocol, path);
            }
            vm_1.default.runInThisContext(swarm_js_1.default.toString(data), { filename: path });
            resolve();
        })
            .catch(reject);
    });
}
exports.loader = loader;
exports.default = { "swarm": loader };
