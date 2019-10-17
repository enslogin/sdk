import * as types from '../types';
export declare function loader(protocol: string, path: string, config?: types.config): Promise<unknown>;
declare const _default: {
    "ipfs": typeof loader;
};
export default _default;
