import { ethers }    from 'ethers';
import ENS           from "../abi/ENS.json";
import RESOLVER      from "../abi/Resolver.json";

import * as types from '../types';

function labelhash(label: string): types.ethereum.bytes32
{
	return ethers.utils.solidityKeccak256([ "string" ], [ label.toLowerCase() ])
}

function compose(labelHash: types.ethereum.bytes32, rootHash: types.ethereum.bytes32): types.ethereum.bytes32
{
	return ethers.utils.solidityKeccak256([ "bytes32", "bytes32" ], [ rootHash,  labelHash ]);
}

function namehash(domain: string): types.ethereum.bytes32
{
	return domain.split('.').reverse().reduce(
		(hash, label) => compose(labelhash(label), hash),
		"0x0000000000000000000000000000000000000000000000000000000000000000"
	);
}

function getENS(basicProvider: types.ethereum.provider, config: types.config): Promise<types.ethereum.contract>
{
	return new Promise(async (resolve, reject) => {
		basicProvider.getNetwork().then(chain => {
			resolve(new ethers.Contract(config.provider.ens.toString() || chain.ensAddress, ENS.abi, basicProvider));
		})
		.catch(reject);
	});
}

function getResolver(ens: types.ethereum.contract, node: types.ethereum.bytes32, config: types.config): Promise<types.ethereum.contract>
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
