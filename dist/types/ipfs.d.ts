export interface ipfsFile {
    name: string;
    content: Uint8Array;
}
export interface ipfsApi {
    get: (string: any) => Promise<ipfsFile[]>;
}
