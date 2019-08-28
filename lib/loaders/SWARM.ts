import vm    from 'vm';
import swarm from 'swarm-js';

import * as types from '../types';

export function loader(protocol: string, path: string, config: types.config = {})
{
	return new Promise((resolve, reject) => {
		if (config.__callbacks && config.__callbacks.loading)
		{
			config.__callbacks.loading(protocol, path);
		}
		swarm
		.at(config.swarm || "http://swarm-gateways.net")
		.download(path)
		.then(data => {
			// TODO handle dirs
			if (config.__callbacks && config.__callbacks.loaded)
			{
				config.__callbacks.loaded(protocol, path);
			}
			vm.runInThisContext(swarm.toString(data), { filename: path });
			resolve();
		})
		.catch(reject);
	});
}

export default { "swarm": loader };
