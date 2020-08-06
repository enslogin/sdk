import { ethers } from 'ethers';
import { BigNumberish } from "@ethersproject/bignumber";
import { BytesLike } from "@ethersproject/bytes";
export declare type uint256 = BigNumberish;
export declare type address = BytesLike;
export declare type bytes32 = BytesLike;
export declare type bytes = BytesLike;
export declare type arg = address | uint256 | bytes32 | bytes | args;
export interface args extends Array<arg> {
}
export declare type contract = ethers.Contract;
export interface provider extends ethers.providers.Provider {
    enable?: () => Promise<void>;
    disable?: () => Promise<void>;
}
