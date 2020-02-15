"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HTTP_1 = __importDefault(require("./HTTP"));
const IPFS_1 = __importDefault(require("./IPFS"));
// import { default as SWARM } from './SWARM';
// import { default as FS    } from './FS';
exports.default = Object.assign(Object.assign({}, HTTP_1.default), IPFS_1.default);
/*
 * TODO:
 * check compatibility of swarm with recursive resolution (CODE_PATH)
 */
