import { ethers } from 'ethers';
export declare type uint256 = string | number | ethers.utils.BigNumber;
export declare type address = string | Uint8Array;
export declare type bytes32 = string | Uint8Array;
export declare type bytes = string | Uint8Array;
export declare type arg = address | uint256 | bytes32 | bytes | args;
export interface args extends Array<arg> {
}
export declare type contract = ethers.Contract;
export declare type provider = ethers.providers.Provider;
