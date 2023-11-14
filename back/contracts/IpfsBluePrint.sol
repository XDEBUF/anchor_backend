// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract IpfsBluePrint {
  struct FileDetails {
        string fileHash; // The IPFS file hash
        string fileName; // The file name
        string transactionDate; // The date in which file infos was stored
        string fileExtension; // The type of file (its extension)
    }

  mapping(address => FileDetails[]) filesList;

    function addFile(string memory fileHash, string memory fileName, string memory fileType, string memory date) public {
        FileDetails memory fileDetail = FileDetails({
            fileHash: fileHash,
            fileName: fileName,
            fileExtension: fileType,
            transactionDate: date
        });
        filesList[msg.sender].push(fileDetail);
    }
    function getFilesCount() public view returns (uint256) {
    return filesList[msg.sender].length;
}
}