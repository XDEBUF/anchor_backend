 fs = require('fs');
 sha256 =require ('js-sha256');

/**
 * encode a file content
 * then encode a json content with metadata
 * store hash file metadata and file in IPFS
 * store hash of the file and the metadata in addition
 */

const toEncodeSha256=(contentFile)=>{
    var hash = sha256.create();
    hash.update(contentFile);
    hash.hex();
    //console.log(hash.hex());
    return hash.hex();
}
const toReadFile=(fileLocalPath) =>{
    const data = readFileSync(fileLocalPath)
    return data;
}
const toEncodeContentFile=(fileLocalPath) => {
    const content = toReadFile(fileLocalPath);
    const hashContent = toEncodeSha256(content);
    //console.log(hashContent);
    return hashContent;
}
 const toVerifyIntegrity=(hash1,hash2) => {
    return hash1===hash2 ? 'ok' : 'not ok';
}
