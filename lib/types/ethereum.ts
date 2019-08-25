import { ethers } from 'ethers';

// Solidity
export type uint256   = string | number | ethers.utils.BigNumber;
export type address   = string | Uint8Array;
export type bytes32   = string | Uint8Array;
export type bytes     = string | Uint8Array;
export type arg       = address | uint256 | bytes32 | bytes | args;
export interface args extends Array<arg> {};

export type contract = ethers.Contract;
export type provider = ethers.providers.Provider;
