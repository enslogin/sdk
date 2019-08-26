import { ethers }    from 'ethers';
import * as loaders  from "./loaders";
import * as ensutils from "./utils/ensutils";

import * as types from './types';

export default class ENSLogin
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
						console.log('Provider URL at web3-provider: ', descr)
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
						console.log('Provider URL at web3-provider-default: ', descr)
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
			const parsed     = descr.match('([a-zA-Z0-9_]*)://([^:]*)(:(.*))?');
			const protocol   = parsed[1];
			const uri        = parsed[2];
			const entrypoint = parsed[4] || 'provider';

			console.log(protocol, uri, entrypoint)

			var loader = null;
			switch (protocol)
			{
				case 'ipfs':  loader = loaders.fromIPFS;  break;
				case 'swarm': loader = loaders.fromSwarm; break;
				// case 'file':  loader = loaders.fromFS;    break;
				default:
					reject(`protocole ${protocol} is not supported`);
					return;
			}
			console.log(loader);
			loader(uri, config)
			.then(async () => resolve(await eval(entrypoint)(config)))
			.catch(reject);
		});
	}

	static connect(username: string, config: types.config)
	{
		return new Promise((resolve, reject) => {
			ENSLogin._resolveUsername(username, config)
			.then(({ addr, descr }) => {
				if (config.__callbacks && config.__callbacks.resolved)
				{
					config.__callbacks.resolved();
				}
				ENSLogin._loadProvider(descr, { ...config, user: { username, addr, descr }})
				.then(resolve)
				.catch(reject);
			})
			.catch(reject);
		});
	}
}
