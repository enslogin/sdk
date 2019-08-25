import * as ethereum from './ethereum';

export interface config {
	provider    ? : { network: string },
	ipfs        ? : { host: string, port: number, protocol: string },
	user        ? : { addr: ethereum.address, username: string }
	__callbacks ? : {
		resolved: ()             => void,
		loading:  (path: string) => void,
		loaded:   (path: string) => void,
	},
}
