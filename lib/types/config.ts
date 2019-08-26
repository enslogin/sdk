import * as ethereum from './ethereum';

export interface config {
	provider    ? : { network: string, ens: ethereum.address },
	ipfs        ? : { host: string, port: number, protocol: string },
	swarm       ? : string,
	user        ? : { username: string, descr: string, addr: ethereum.address }
	__callbacks ? : {
		resolved: ()             => void,
		loading:  (path: string) => void,
		loaded:   (path: string) => void,
	},
}
