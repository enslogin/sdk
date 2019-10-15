import * as ethereum from './ethereum';

export interface config {
	provider    ?: { network?: string, ens?: ethereum.address },
	ipfs        ?: { host?: string, port?: number, protocol?: string },
	swarm       ?: string,
	user        ?: { username: string, descr: string, addr: ethereum.address }
	__callbacks ?: {
		resolved: (username: string, addr: ethereum.address, descr: string) => void,
		loading:  (protocol: string, path: string) => void,
		loaded:   (protocol: string, path: string) => void,
	},
}
