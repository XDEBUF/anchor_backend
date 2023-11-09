import { readFileSync } from 'fs';
import { sha256 } from 'js-sha256';

/**
 * encode a file content
 * then encode a json content with metadata
 * store hash file metadata and file in IPFS
 * store hash of the file and the metadata in addition
 */

export function toEncodeSha256(contentFile){
    var hash = sha256.create();
    hash.update(contentFile);
    hash.hex();
    //console.log(hash.hex());
    return hash.hex();
}
export function toReadFile(localPathFile) {
    const data = readFileSync(localPathFile)
    return data;
}
export function toEncodeContentFile(localPathFile) {
    const content = this.toReadFile(localPathFile);
    const hashContent = this.toEncodeSha256(content);
    //console.log(hashContent);
    return hashContent;
}
export function toVerifyIntegrity(hash1,hash2) {
    return hash1===hash2 ? 'ok' : 'not ok';
}
