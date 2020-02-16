import vm   from 'vm';
import IPFS from 'ipfs-http-client';
import BufferList from 'bl/BufferList';

import * as types from '../types';

export function loader(protocol: string, path: string, config: types.config = {})
{
	return new Promise(async (resolve, reject) => {
		if (config.__callbacks && config.__callbacks.loading)
		{
			config.__callbacks.loading(protocol, path);
		}

		for await (const file of IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https', ...config.ipfs }).get(path))
		{
			if (config.__callbacks && config.__callbacks.loaded)
			{
				config.__callbacks.loaded(protocol, path);
			}

			const content = new BufferList()
			for await (const chunk of file.content)
			{
				content.append(chunk)
			}
			vm.runInThisContext(content.toString(), { filename: file.name });
		}
		resolve();

		// IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https', ...config.ipfs })
		// .get(path)
		// .then(files => {
		// 	console.log(files)
		// 	files
		// 	.filter(file => file.content !== undefined)
		// 	.forEach(file => {
		//
		// 		if (config.__callbacks && config.__callbacks.loaded)
		// 		{
		// 			config.__callbacks.loaded(protocol, path);
		// 		}
		// 		vm.runInThisContext(file.content.toString(), { filename: file.name });
		// 	});
		// 	resolve();
		// })
		// .catch(reject);
	});
}

export default { "ipfs": loader };
