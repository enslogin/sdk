import vm   from 'vm';
import IPFS from 'ipfs-http-client';

import * as types from '../types';

export function loader(protocol: string, path: string, config: types.config = {})
{
	return new Promise((resolve, reject) => {
		if (config.__callbacks && config.__callbacks.loading)
		{
			config.__callbacks.loading(protocol, path);
		}
		IPFS(config.ipfs || { host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
		.get(path)
		.then(files => {
			files
			.filter(file => file.content !== undefined)
			.forEach(file => {
				if (config.__callbacks && config.__callbacks.loaded)
				{
					config.__callbacks.loaded(protocol, path);
				}
				vm.runInThisContext(file.content.toString(), { filename: file.name });
			});
			resolve();
		})
		.catch(reject);
	});
}

export default { "ipfs": loader };
