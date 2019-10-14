import vm from 'vm';
import fs from 'fs';

import * as types from '../types';

export function loader(protocol: string, path: string, config: types.config = {})
{
	return new Promise((resolve, reject) => {
		if (config.__callbacks && config.__callbacks.loading)
		{
			config.__callbacks.loading(protocol, path);
		}
		const stats = fs.lstatSync(path);
		if (stats.isFile())
		{
			if (config.__callbacks && config.__callbacks.loaded)
			{
				config.__callbacks.loaded(protocol, path);
			}
			vm.runInThisContext(fs.readFileSync(path).toString(), { filename: path });
			resolve();
		}
		else if (stats.isDirectory())
		{
			Promise.all(fs.readdirSync(path).map(file => loader(protocol, `${path}/${file}`, config)))
			.then(() => { resolve() })
			.catch(reject);
		}
		else
		{
			reject("unsupported filePath format");
		}
	});
}

export default { "file": loader };
