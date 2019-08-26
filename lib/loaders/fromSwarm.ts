import swarm from 'swarm-js';
import vm    from 'vm';

import * as types from '../types';

export function fromSwarm(protocol: string, fileHash: string, config: types.config = {})
{
	if (config.__callbacks && config.__callbacks.loading)
	{
		config.__callbacks.loading(fileHash);
	}
	return new Promise((resolve, reject) => {
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
