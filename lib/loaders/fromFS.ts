import fs from 'fs';
import vm from 'vm';

import * as types from '../types';

export function fromFS(protocol: string, path: string, config: types.config)
{
	if (config.__callbacks && config.__callbacks.loading)
	{
		config.__callbacks.loading(path);
	}
	return new Promise((resolve, reject) => {
		const stats = fs.lstatSync(path);
		if (stats.isFile())
		{
			if (config.__callbacks && config.__callbacks.loaded)
			{
				config.__callbacks.loaded(path);
			}
			vm.runInThisContext(fs.readFileSync(path).toString(), { filename: path });
			resolve();
		}
		else if (stats.isDirectory())
		{
			Promise.all(fs.readdirSync(path).map(file => fromFS(protocol, `${path}/${file}`, config)))
			.then(() => { resolve() })
			.catch(reject);
		}
		else
		{
			reject("unsupported filePath format");
		}
	});
}
