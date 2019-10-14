"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ethers_1 = require("ethers");
var ENS_json_1 = __importDefault(require("../abi/ENS.json"));
var Resolver_json_1 = __importDefault(require("../abi/Resolver.json"));
var Ens = /** @class */ (function () {
    function Ens(config) {
        this.config = config;
    }
    Ens.prototype.initialize = function (provider) {
        var _this = this;
        var that = this;
        return new Promise(function (resolve, reject) {
            provider
                .getNetwork()
                .then(function (chain) {
                _this.registry = new ethers_1.ethers.Contract((_this.config.provider.ens || chain.ensAddress).toString(), ENS_json_1.default.abi, provider);
                resolve(_this);
            })
                .catch(reject);
        });
    };
    Ens.prototype.getResolver = function (node) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.registry.resolver(node).then(function (addr) {
                if (addr === ethers_1.ethers.constants.AddressZero) {
                    resolve(null);
                }
                else {
                    resolve(new ethers_1.ethers.Contract(addr, Resolver_json_1.default.abi, _this.registry.provider));
                }
            })
                .catch(reject);
        });
    };
    Ens.labelhash = function (label) {
        return ethers_1.ethers.utils.solidityKeccak256(["string"], [label.toLowerCase()]);
    };
    Ens.compose = function (labelHash, rootHash) {
        return ethers_1.ethers.utils.solidityKeccak256(["bytes32", "bytes32"], [rootHash, labelHash]);
    };
    Ens.namehash = function (domain) {
        return domain.split('.').reverse().reduce(function (hash, label) { return Ens.compose(Ens.labelhash(label), hash); }, "0x0000000000000000000000000000000000000000000000000000000000000000");
    };
    return Ens;
}());
exports.default = Ens;