import * as types from './types';
export declare class ENSLoginSDK {
    static _resolveUsername(username: string, config: types.config): Promise<{
        addr: string;
        descr: string;
    }>;
    static _loadProvider(descr: string, config: types.config): Promise<types.provider>;
    static connect(username: string, config: types.config): Promise<types.provider>;
}
