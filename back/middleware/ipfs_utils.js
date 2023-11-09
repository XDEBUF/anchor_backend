import { createHelia } from 'helia'
import { unixfs } from '@helia/unixfs'
import { CID } from 'multiformats/cid'


export async function storeToIpfs (dataFile) { 
const helia = await createHelia();

const fs = unixfs(helia);
const c =fs.cat(CID.parse(utils.toReadFile(dataFile)));
console.log('cid= ',c)
return c;
}