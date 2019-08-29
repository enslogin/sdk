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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ethers_1 = require("ethers");
var loaders_1 = __importDefault(require("./loaders"));
var Ens_1 = __importDefault(require("./utils/Ens"));
var ProviderWrapper_1 = __importDefault(require("./utils/ProviderWrapper"));
var ENSLoginSDK = /** @class */ (function () {
    function ENSLoginSDK() {
    }
    ENSLoginSDK._resolveUsername = function (username, config) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var provider, ens, addr, node, resolver, descr, node, resolver, descr, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        provider = ethers_1.ethers.getDefaultProvider(config.provider.network);
                        return [4 /*yield*/, (new Ens_1.default(config)).initialize(provider)];
                    case 1:
                        ens = _a.sent();
                        node = Ens_1.default.namehash(username);
                        return [4 /*yield*/, ens.getResolver(node)];
                    case 2:
                        resolver = _a.sent();
                        if (!resolver) return [3 /*break*/, 5];
                        return [4 /*yield*/, resolver.addr(node)];
                    case 3:
                        addr = _a.sent();
                        return [4 /*yield*/, resolver.text(node, 'web3-provider')];
                    case 4:
                        descr = _a.sent();
                        if (descr) {
                            resolve({ addr: addr, descr: descr });
                            return [2 /*return*/];
                        }
                        _a.label = 5;
                    case 5:
                        node = Ens_1.default.namehash(username.split('.').splice(1).join('.'));
                        return [4 /*yield*/, ens.getResolver(node)];
                    case 6:
                        resolver = _a.sent();
                        if (!resolver) return [3 /*break*/, 8];
                        return [4 /*yield*/, resolver.text(node, 'web3-provider-default')];
                    case 7:
                        descr = _a.sent();
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
            try {
                loaders_1.default[protocol](protocol, uri, config)
                    .then(function () { return __awaiter(_this, void 0, void 0, function () { var _a, _b; return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = resolve;
                            _b = ProviderWrapper_1.default;
                            return [4 /*yield*/, global[entrypoint](config)];
                        case 1: return [2 /*return*/, _a.apply(void 0, [_b.apply(void 0, [_c.sent()])])];
                    }
                }); }); })
                    .catch(reject);
            }
            catch (e) {
                reject("protocole " + protocol + " is not supported");
            }
        });
    };
    ENSLoginSDK.connect = function (username, config) {
        return new Promise(function (resolve, reject) {
            ENSLoginSDK._resolveUsername(username, config)
                .then(function (_a) {
                var addr = _a.addr, descr = _a.descr;
                if (config.__callbacks && config.__callbacks.resolved) {
                    config.__callbacks.resolved(username, addr, descr);
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
