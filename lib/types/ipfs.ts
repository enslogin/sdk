export interface ipfsFile {
	name:    string,
	content: Uint8Array,
};

export interface ipfsApi {
	get: (ipfsHash: string) => Promise<ipfsFile[]>
}
