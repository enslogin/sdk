import { ethers }             from 'ethers';
import { default as loaders } from "./loaders";
import Ens                    from "./utils/Ens";
// import ProviderWrapper        from "./utils/ProviderWrapper";

import * as types from './types';

const CODE_PATH = '/60/js'; // Using javascript on ethereum (slip-44: 60)

export default class ENSLoginSDK
{
	static _resolveUsername(username: string, config: types.config): Promise<{ addr: string, descr: string }>
	{
		return new Promise(async (resolve, reject) => {
			try
			{
				const provider = ethers.getDefaultProvider(config.provider.resolutionNetwork || config.provider.network);
				const ens = await (new Ens(config)).initialize(provider);
				var addr;
				{
					const node     = Ens.namehash(username);
					const resolver = await ens.getResolver(node);
					if (resolver)
					{
						addr  = await resolver.addr(node);
						const descr = await resolver.text(node, 'enslogin');
						if (descr)
						{
							resolve({ addr, descr });
							return;
						}
					}
				}
				{
					const node     = Ens.namehash(username.split('.').splice(1).join('.'));
					const resolver = await ens.getResolver(node);
					if (resolver)
					{
						const descr = await resolver.text(node, 'enslogin-default');
						if (descr)
						{
							resolve({ addr, descr });
							return;
						}
					}
				}
				reject("ENSLogin is not available for this user");
			}
			catch(e)
			{
				reject(e);
			}
		});
	}

	static _loadProvider(descr: string, config: types.config): Promise<types.provider>
	{
		return new Promise<types.provider>((resolve, reject) => {
			const parsed     = descr.match('(([a-zA-Z0-9_]*)@)?([a-zA-Z0-9_]*)://(.*)');
			const entrypoint = parsed[2] || 'provider';
			const protocol   = parsed[3];
			const uri        = parsed[4];

			try
			{
				loaders[protocol](protocol, uri + CODE_PATH, config)
				// .then(async () => resolve(ProviderWrapper(await global[entrypoint](config)) as unknown))
				.then(async () => resolve(await global[entrypoint](config)) as unknown)
				.catch(reject);
			}
			catch (e)
			{
				reject(`protocole ${protocol} is not supported`);
			}
		});
	}

	static connect(username: string, config: types.config): Promise<types.provider>
	{
		return new Promise<types.provider>((resolve, reject) => {
			ENSLoginSDK._resolveUsername(username || "", config)
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
