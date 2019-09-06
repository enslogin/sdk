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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var HTTP_1 = __importDefault(require("./HTTP"));
var IPFS_1 = __importDefault(require("./IPFS"));
var SWARM_1 = __importDefault(require("./SWARM"));
// import { default as FS    } from './FS';
exports.default = __assign(__assign(__assign({}, HTTP_1.default), IPFS_1.default), SWARM_1.default);
