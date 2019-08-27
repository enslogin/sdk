import { ethers }    from 'ethers';
import * as loaders  from "./loaders";
import * as ensutils from "./utils/ensutils";

import * as types from './types';

export default class ENSLoginSDK
{
	static _resolveUsername(username: string, config: types.config)
	{
		return new Promise(async (resolve, reject) => {
			try
			{
				const basicProvider = ethers.getDefaultProvider(config.provider.network);
				const ens           = await ensutils.getENS(basicProvider, config);
				var addr;
				{
					const node     = ensutils.namehash(username);
					const resolver = await ensutils.getResolver(ens, node, config);
					if (resolver)
					{
						addr  = await resolver.addr(node);
						const descr = await resolver.text(node, 'web3-provider');
						if (descr)
						{
							resolve({ addr, descr });
							return;
						}
					}
				}
				{
					const node     = ensutils.namehash(username.split('.').splice(1).join('.'));
					const resolver = await ensutils.getResolver(ens, node, config);
					if (resolver)
					{
						const descr = await resolver.text(node, 'web3-provider-default');
						if (descr)
						{
							resolve({ addr, descr });
							return;
						}
					}
				}
				reject("No web3 provider specified for this user");
			}
			catch(e)
			{
				reject(e);
			}
		});
	}

	static _loadProvider(descr: string, config: types.config)
	{
		return new Promise((resolve, reject) => {
			const parsed     = descr.match('(([a-zA-Z0-9_]*)@)?([a-zA-Z0-9_]*)://(.*)');
			const entrypoint = parsed[2] || 'provider';
			const protocol   = parsed[3];
			const uri        = parsed[4];

			var loader = null;
			switch (protocol)
			{
				case 'http':  loader = loaders.fromHTTP;  break;
				case 'https': loader = loaders.fromHTTP;  break;
				case 'ipfs':  loader = loaders.fromIPFS;  break;
				case 'swarm': loader = loaders.fromSwarm; break;
				// case 'file':  loader = loaders.fromFS;    break;
				default:
					reject(`protocole ${protocol} is not supported`);
					return;
			}
			console.log("with global[entrypoint]");
			loader(protocol, uri, config)
			.then(async () => resolve(await global[entrypoint](config)))
			.catch(reject);
		});
	}

	static connect(username: string, config: types.config)
	{
		return new Promise((resolve, reject) => {
			ENSLoginSDK._resolveUsername(username, config)
			.then(({ addr, descr }) => {
				if (config.__callbacks && config.__callbacks.resolved)
				{
					config.__callbacks.resolved(username, addr, descr);
				}
				ENSLoginSDK._loadProvider(descr, { ...config, user: { username, addr, descr }})
				.then(resolve)
				.catch(reject);
			})
			.catch(reject);
		});
	}
}
