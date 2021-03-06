import vm    from 'vm';
import http  from 'http';
import https from 'https';

import * as types from '../types';

const getters = { 'http': http, 'https': https }

export function loader(protocol: string, path: string, config: types.config = {})
{
	return new Promise((resolve, reject) => {
		if (config.__callbacks && config.__callbacks.loading)
		{
			config.__callbacks.loading(protocol, path);
		}
		getters[protocol].get(`${protocol}://${path}`, (res) => {
			const { statusCode } = res;
			const contentType = res.headers['content-type'];
			if (statusCode !== 200)
			{
				reject(`Request Failed (status code ${statusCode})`);
				return;
			}
			// else if (!/^application\/javascript/.test(contentType))
			// {
			// 	reject(`Invalid content-type (Expected application/json but received ${contentType})`);
			// 	return;
			// }
			var chunks = [];
			res.setEncoding('utf8');
			res.on('data', (chunk) => chunks.push(chunk));
			res.on('end', () => {
				if (config.__callbacks && config.__callbacks.loaded)
				{
					config.__callbacks.loaded(protocol, path);
				}
				vm.runInThisContext(chunks.join(""), { filename: path });
				resolve();
			});
		}).on('error', reject);
	});
}

export default { "http": loader, "https": loader };
