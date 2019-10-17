import * as types from '../types';
export default class Ens {
    config: types.config;
    registry: types.contract;
    constructor(config: types.config);
    initialize(provider: types.provider): Promise<Ens>;
    getResolver(node: types.bytes32): Promise<types.contract>;
    static labelhash(label: string): types.bytes32;
    static compose(labelHash: types.bytes32, rootHash: types.bytes32): types.bytes32;
    static namehash(domain: string): types.bytes32;
}
