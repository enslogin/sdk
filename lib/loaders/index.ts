import { default as HTTP  } from './HTTP';
import { default as IPFS  } from './IPFS';
import { default as SWARM } from './SWARM';
// import { default as FS    } from './FS';

export default {
	...HTTP,
	...IPFS,
	...SWARM,
	// ...FS,
};
