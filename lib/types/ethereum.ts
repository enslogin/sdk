import { ethers } from 'ethers';
import { BigNumberish } from "@ethersproject/bignumber";
import { BytesLike    } from "@ethersproject/bytes";

// Solidity
export type uint256   = BigNumberish;
export type address   = BytesLike;
export type bytes32   = BytesLike;
export type bytes     = BytesLike;
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
