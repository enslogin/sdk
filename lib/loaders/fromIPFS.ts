// import IPFS     from 'ipfs';
import IPFSHTTP from 'ipfs-http-client';
import vm       from 'vm';

import * as types from '../types';

function __loadFromNode(node: types.ipfsApi, fileHash: string, config: types.config)
{
	if (config.__callbacks && config.__callbacks.loading)
	{
		config.__callbacks.loading({ uri: `${protocole}://${path}` });
	}
	return new Promise((resolve, reject) => {
		node.get(fileHash)
		.then(files => {
			files
			.filter(file => file.content !== undefined)
			.forEach(file => {
				if (config.__callbacks && config.__callbacks.loaded)
				{
					config.__callbacks.loaded({ uri: `${protocole}://${path}` });
				}
				vm.runInThisContext(
					file.content.toString(),
					{ filename: file.name }
				);
			});
			resolve();
		})
		.catch(reject);
	});
}

export function fromIPFS(protocol: string, fileHash: string, config: types.config = {})
{
	return __loadFromNode(
		IPFSHTTP(config.ipfs || { host: 'ipfs.infura.io', port: 5001, protocol: 'https' }),
		fileHash,
		config
	);
}

// export function fromIPFS(protocol: string, fileHash: string, config: types.config = {})
// {
// 	return new Promise((resolve, reject) => {
// 		const node = new IPFS();
// 		node.once('ready', () => {
// 			console.log('node started');
// 			__loadFromNode(node, fileHash, config)
// 			.then(() =>{ node.stop(resolve); })
// 			.catch(reject);
// 		});
// 		node.once('stop', () => {
// 			console.log('node stopped');
// 		});
// 	});
// }
