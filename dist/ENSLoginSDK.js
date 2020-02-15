"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const loaders_1 = __importDefault(require("./loaders"));
const Ens_1 = __importDefault(require("./utils/Ens"));
const CODE_PATH = '/60/js'; // Using javascript on ethereum (slip-44: 60)
class ENSLoginSDK {
    static _resolveUsername(username, config) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const provider = ethers_1.ethers.getDefaultProvider(config.provider.network);
                const ens = yield (new Ens_1.default(config)).initialize(provider);
                var addr;
                {
                    const node = Ens_1.default.namehash(username);
                    const resolver = yield ens.getResolver(node);
                    if (resolver) {
                        addr = yield resolver.addr(node);
                        const descr = yield resolver.text(node, 'enslogin');
                        if (descr) {
                            resolve({ addr, descr });
                            return;
                        }
                    }
                }
                {
                    const node = Ens_1.default.namehash(username.split('.').splice(1).join('.'));
                    const resolver = yield ens.getResolver(node);
                    if (resolver) {
                        const descr = yield resolver.text(node, 'enslogin-default');
                        if (descr) {
                            resolve({ addr, descr });
                            return;
                        }
                    }
                }
                reject("ENSLogin is not available for this user");
            }
            catch (e) {
                reject(e);
            }
        }));
    }
    static _loadProvider(descr, config) {
        return new Promise((resolve, reject) => {
            const parsed = descr.match('(([a-zA-Z0-9_]*)@)?([a-zA-Z0-9_]*)://(.*)');
            const entrypoint = parsed[2] || 'provider';
            const protocol = parsed[3];
            const uri = parsed[4];
            try {
                loaders_1.default[protocol](protocol, uri + CODE_PATH, config)
                    // .then(async () => resolve(ProviderWrapper(await global[entrypoint](config))))
                    .then(() => __awaiter(this, void 0, void 0, function* () { return resolve(yield global[entrypoint](config)); }))
                    .catch(reject);
            }
            catch (e) {
                reject(`protocole ${protocol} is not supported`);
            }
        });
    }
    static connect(username, config) {
        return new Promise((resolve, reject) => {
            ENSLoginSDK._resolveUsername(username, config)
                .then(({ addr, descr }) => {
                if (config.__callbacks && config.__callbacks.resolved) {
                    config.__callbacks.resolved(username, addr, descr);
                }
                ENSLoginSDK._loadProvider(descr, Object.assign(Object.assign({}, config), { user: { username, addr, descr } }))
                    .then(resolve)
                    .catch(reject);
            })
                .catch(reject);
        });
    }
}
exports.ENSLoginSDK = ENSLoginSDK;
