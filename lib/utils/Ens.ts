import { ethers } from 'ethers';
import ENS        from "../abi/ENS.json";
import RESOLVER   from "../abi/Resolver.json";
import * as types from '../types';

export default class Ens
{
	config:   types.config;
	registry: types.contract;

	constructor(config: types.config)
	{
		this.config = config;
	}

	initialize(provider: types.provider) : Promise<Ens>
	{
		const that = this;
		return new Promise((resolve, reject) => {
			provider
			.getNetwork()
			.then(chain => {
				this.registry = new ethers.Contract((this.config.provider.ens || chain.ensAddress).toString(), ENS.abi, provider);
				resolve(this);
			})
			.catch(reject);
		});
	}

	getResolver(node: types.bytes32): Promise<types.contract>
	{
		return new Promise((resolve, reject) => {
			this.registry.resolver(node).then(addr => {
				if (addr === ethers.constants.AddressZero)
				{
					resolve(null);
				}
				else
				{
					resolve(new ethers.Contract(addr, RESOLVER.abi, this.registry.provider));
				}
			})
			.catch(reject);
		});
	}

	static labelhash(label: string): types.bytes32
	{
		return ethers.utils.solidityKeccak256([ "string" ], [ label.toLowerCase() ])
	}

	static compose(labelHash: types.bytes32, rootHash: types.bytes32): types.bytes32
	{
		return ethers.utils.solidityKeccak256([ "bytes32", "bytes32" ], [ rootHash,  labelHash ]);
	}

	static namehash(domain: string): types.bytes32
	{
		return domain.split('.').reverse().reduce(
			(hash, label) => Ens.compose(Ens.labelhash(label), hash),
			"0x0000000000000000000000000000000000000000000000000000000000000000"
		);
	}
}
