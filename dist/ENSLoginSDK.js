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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ethers_1 = require("ethers");
var loaders = __importStar(require("./loaders"));
var ensutils = __importStar(require("./utils/ensutils"));
var ENSLoginSDK = /** @class */ (function () {
    function ENSLoginSDK() {
    }
    ENSLoginSDK._resolveUsername = function (username, config) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var basicProvider, ens, addr, node, resolver, descr, node, resolver, descr, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        basicProvider = ethers_1.ethers.getDefaultProvider(config.provider.network);
                        return [4 /*yield*/, ensutils.getENS(basicProvider, config)];
                    case 1:
                        ens = _a.sent();
                        node = ensutils.namehash(username);
                        return [4 /*yield*/, ensutils.getResolver(ens, node, config)];
                    case 2:
                        resolver = _a.sent();
                        if (!resolver) return [3 /*break*/, 5];
                        return [4 /*yield*/, resolver.addr(node)];
                    case 3:
                        addr = _a.sent();
                        return [4 /*yield*/, resolver.text(node, 'web3-provider')];
                    case 4:
                        descr = _a.sent();
                        console.log('Provider URL at web3-provider: ', descr);
                        if (descr) {
                            resolve({ addr: addr, descr: descr });
                            return [2 /*return*/];
                        }
                        _a.label = 5;
                    case 5:
                        node = ensutils.namehash(username.split('.').splice(1).join('.'));
                        return [4 /*yield*/, ensutils.getResolver(ens, node, config)];
                    case 6:
                        resolver = _a.sent();
                        if (!resolver) return [3 /*break*/, 8];
                        return [4 /*yield*/, resolver.text(node, 'web3-provider-default')];
                    case 7:
                        descr = _a.sent();
                        console.log('Provider URL at web3-provider-default: ', descr);
                        if (descr) {
                            resolve({ addr: addr, descr: descr });
                            return [2 /*return*/];
                        }
                        _a.label = 8;
                    case 8:
                        reject("No web3 provider specified for this user");
                        return [3 /*break*/, 10];
                    case 9:
                        e_1 = _a.sent();
                        reject(e_1);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        }); });
    };
    ENSLoginSDK._loadProvider = function (descr, config) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var parsed = descr.match('(([a-zA-Z0-9_]*)@)?([a-zA-Z0-9_]*)://(.*)');
            var entrypoint = parsed[2] || 'provider';
            var protocol = parsed[3];
            var uri = parsed[4];
            console.log(protocol, uri, entrypoint);
            var loader = null;
            switch (protocol) {
                case 'http':
                    loader = loaders.fromHTTP;
                    break;
                case 'https':
                    loader = loaders.fromHTTP;
                    break;
                case 'ipfs':
                    loader = loaders.fromIPFS;
                    break;
                case 'swarm':
                    loader = loaders.fromSwarm;
                    break;
                // case 'file':  loader = loaders.fromFS;    break;
                default:
                    reject("protocole " + protocol + " is not supported");
                    return;
            }
            loader(protocol, uri, config)
                .then(function () { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = resolve;
                        return [4 /*yield*/, eval(entrypoint)(config)];
                    case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                }
            }); }); })
                .catch(reject);
        });
    };
    ENSLoginSDK.connect = function (username, config) {
        return new Promise(function (resolve, reject) {
            ENSLoginSDK._resolveUsername(username, config)
                .then(function (_a) {
                var addr = _a.addr, descr = _a.descr;
                if (config.__callbacks && config.__callbacks.resolved) {
                    config.__callbacks.resolved();
                }
                ENSLoginSDK._loadProvider(descr, __assign({}, config, { user: { username: username, addr: addr, descr: descr } }))
                    .then(resolve)
                    .catch(reject);
            })
                .catch(reject);
        });
    };
    return ENSLoginSDK;
}());
exports.default = ENSLoginSDK;