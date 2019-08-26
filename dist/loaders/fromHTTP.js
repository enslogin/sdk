"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var https_1 = __importDefault(require("https"));
var vm_1 = __importDefault(require("vm"));
var getters = {
    'http': http_1.default,
    'https': https_1.default
};
function fromHTTP(protocol, path, config) {
    return new Promise(function (resolve, reject) {
        if (config.__callbacks && config.__callbacks.loading) {
            config.__callbacks.loading(protocol, path);
        }
        getters[protocol].get(protocol + "://" + path, function (res) {
            var statusCode = res.statusCode;
            var contentType = res.headers['content-type'];
            if (statusCode !== 200) {
                reject("Request Failed (status code " + statusCode + ")");
                return;
            }
            else if (!/^application\/javascript/.test(contentType)) {
                reject("Invalid content-type (Expected application/json but received " + contentType + ")");
                return;
            }
            var chunks = [];
            res.setEncoding('utf8');
            res.on('data', function (chunk) { return chunks.push(chunk); });
            res.on('end', function () {
                if (config.__callbacks && config.__callbacks.loaded) {
                    config.__callbacks.loaded(protocol, path);
                }
                vm_1.default.runInThisContext(chunks.join(""), { filename: path });
                resolve();
            });
        }).on('error', reject);
    });
}
exports.fromHTTP = fromHTTP;
