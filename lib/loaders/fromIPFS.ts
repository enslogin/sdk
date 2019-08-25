// import IPFS     from 'ipfs';
import IPFSHTTP from 'ipfs-http-client';
import vm       from 'vm';

import * as types from '../types';

function __loadFromNode(node: types.ipfsApi, fileHash: string, config: types.config = {})
{
	return new Promise((resolve, reject) => {
		node.get(fileHash)
		.then(files => {
			files
			.filter(file => file.content !== undefined)
			.forEach(file => {
				if (config.__callbacks && config.__callbacks.loaded)
				{
					config.__callbacks.loaded(file.name);
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

export function fromIPFS(fileHash: string, config: types.config = {})
{
	if (config.__callbacks && config.__callbacks.loading)
	{
		config.__callbacks.loading(fileHash);
	}
	return __loadFromNode(
		IPFSHTTP(config.ipfs || { host: 'ipfs.infura.io', port: 5001, protocol: 'https' }),
		fileHash,
	);
}

// export function fromIPFS(fileHash: string, config: types.config = {})
// {
// 	return new Promise((resolve, reject) => {
// 		const node = new IPFS();
// 		node.once('ready', () => {
// 			console.log('node started');
// 			if (config.__callbacks && config.__callbacks.loading) { config.__callbacks.loading(fileHash); }
// 			__loadFromNode(node, fileHash)
// 			.then(() =>{ node.stop(resolve); })
// 			.catch(reject);
// 		});
// 		node.once('stop', () => {
// 			console.log('node stopped');
// 		});
// 	});
// }
