"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var swarm_js_1 = __importDefault(require("swarm-js"));
var vm_1 = __importDefault(require("vm"));
function fromSwarm(protocol, path, config) {
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
exports.fromSwarm = fromSwarm;
