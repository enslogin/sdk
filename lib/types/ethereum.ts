import { ethers } from 'ethers';

// Solidity
export type uint256   = string | number | ethers.utils.BigNumber;
export type address   = string | Uint8Array;
export type bytes32   = string | Uint8Array;
export type bytes     = string | Uint8Array;
export type arg       = address | uint256 | bytes32 | bytes | args;
export interface args extends Array<arg> {};

// Contract
export type contract = ethers.Contract;

// Provider
export interface provider extends ethers.providers.Provider
{
	enable  ?: () => Promise<void>;
	disable ?: () => Promise<void>;
}
