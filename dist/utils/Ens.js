"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const ENS_json_1 = __importDefault(require("../abi/ENS.json"));
const Resolver_json_1 = __importDefault(require("../abi/Resolver.json"));
class Ens {
    constructor(config) {
        this.config = config;
    }
    initialize(provider) {
        const that = this;
        return new Promise((resolve, reject) => {
            provider
                .getNetwork()
                .then(chain => {
                this.registry = new ethers_1.ethers.Contract((this.config.provider.ens || chain.ensAddress).toString(), ENS_json_1.default.abi, provider);
                resolve(this);
            })
                .catch(reject);
        });
    }
    getResolver(node) {
        return new Promise((resolve, reject) => {
            this.registry.resolver(node).then(addr => {
                if (addr === ethers_1.ethers.constants.AddressZero) {
                    resolve(null);
                }
                else {
                    resolve(new ethers_1.ethers.Contract(addr, Resolver_json_1.default.abi, this.registry.provider));
                }
            })
                .catch(reject);
        });
    }
    static labelhash(label) {
        return ethers_1.ethers.utils.solidityKeccak256(["string"], [label.toLowerCase()]);
    }
    static compose(labelHash, rootHash) {
        return ethers_1.ethers.utils.solidityKeccak256(["bytes32", "bytes32"], [rootHash, labelHash]);
    }
    static namehash(domain) {
        return domain.split('.').reverse().reduce((hash, label) => Ens.compose(Ens.labelhash(label), hash), "0x0000000000000000000000000000000000000000000000000000000000000000");
    }
}
exports.default = Ens;
