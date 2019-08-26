import { ethers }    from 'ethers';
import ENS           from "../abi/ENS.json";
import RESOLVER      from "../abi/Resolver.json";

import * as types from '../types';

function labelhash(label: string): types.bytes32
{
	return ethers.utils.solidityKeccak256([ "string" ], [ label.toLowerCase() ])
}

function compose(labelHash: types.bytes32, rootHash: types.bytes32): types.bytes32
{
	return ethers.utils.solidityKeccak256([ "bytes32", "bytes32" ], [ rootHash,  labelHash ]);
}

function namehash(domain: string): types.bytes32
{
	return domain.split('.').reverse().reduce(
		(hash, label) => compose(labelhash(label), hash),
		"0x0000000000000000000000000000000000000000000000000000000000000000"
	);
}

function getENS(basicProvider: types.provider, config: types.config): Promise<types.contract>
{
	return new Promise(async (resolve, reject) => {
		basicProvider.getNetwork().then(chain => {
			const registry = config.provider.ens || chain.ensAddress;
			resolve(new ethers.Contract(registry.toString(), ENS.abi, basicProvider));
		})
		.catch(reject);
	});
}

function getResolver(ens: types.contract, node: types.bytes32, config: types.config): Promise<types.contract>
{
	return new Promise(async (resolve, reject) => {
		ens.resolver(node).then(addr => {
			if (addr === ethers.constants.AddressZero)
			{
				resolve(null);
			}
			else
			{
				resolve(new ethers.Contract(addr, RESOLVER.abi, ens.provider));
			}
		})
		.catch(reject);
	});
}

export {
	labelhash,
	compose,
	namehash,
	getENS,
	getResolver,
};
