import swarm from 'swarm-js';
import vm    from 'vm';

import * as types from '../types';

export function fromSwarm(fileHash: string, config: types.config = {})
{
	return new Promise((resolve, reject) => {
		if (config.__callbacks && config.__callbacks.loading)
		{
			config.__callbacks.loading(fileHash);
		}

		swarm
		.at(config.swarm || "http://swarm-gateways.net")
		.download(fileHash)
		.then(data => {
			// TODO handle dirs
			if (config.__callbacks && config.__callbacks.loaded)
			{
				config.__callbacks.loaded(fileHash); // name ?
			}
			vm.runInThisContext(
				swarm.toString(data),
				{ filename: fileHash }
			);
			resolve();
		})
		.catch(reject);
	});
}
