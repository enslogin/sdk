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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loader = void 0;
const vm_1 = __importDefault(require("vm"));
const ipfs_http_client_1 = __importDefault(require("ipfs-http-client"));
const BufferList_1 = __importDefault(require("bl/BufferList"));
function loader(protocol, path, config = {}) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        var e_1, _a, e_2, _b;
        if (config.__callbacks && config.__callbacks.loading) {
            config.__callbacks.loading(protocol, path);
        }
        try {
            for (var _c = __asyncValues(ipfs_http_client_1.default(Object.assign({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }, config.ipfs)).get(path)), _d; _d = yield _c.next(), !_d.done;) {
                const file = _d.value;
                if (config.__callbacks && config.__callbacks.loaded) {
                    config.__callbacks.loaded(protocol, path);
                }
                const content = new BufferList_1.default();
                try {
                    for (var _e = (e_2 = void 0, __asyncValues(file.content)), _f; _f = yield _e.next(), !_f.done;) {
                        const chunk = _f.value;
                        content.append(chunk);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) yield _b.call(_e);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                vm_1.default.runInThisContext(content.toString(), { filename: file.name });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) yield _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        resolve();
        // IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https', ...config.ipfs })
        // .get(path)
        // .then(files => {
        // 	console.log(files)
        // 	files
        // 	.filter(file => file.content !== undefined)
        // 	.forEach(file => {
        //
        // 		if (config.__callbacks && config.__callbacks.loaded)
        // 		{
        // 			config.__callbacks.loaded(protocol, path);
        // 		}
        // 		vm.runInThisContext(file.content.toString(), { filename: file.name });
        // 	});
        // 	resolve();
        // })
        // .catch(reject);
    }));
}
exports.loader = loader;
exports.default = { "ipfs": loader };
