import * as types from './types';
export declare class ENSLoginSDK {
    static _resolveUsername(username: string, config: types.config): Promise<unknown>;
    static _loadProvider(descr: string, config: types.config): Promise<unknown>;
    static connect(username: string, config: types.config): Promise<unknown>;
}
