export const CONTRACT_ADDRESS = '0x43c7650562b2F05a18dE91834683844214422090' as const;

export const CONTRACT_ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "name_", "type": "string" },
      { "internalType": "string", "name": "symbol_", "type": "string" }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "batchId", "type": "uint256" },
      { "indexed": true, "internalType": "address", "name": "farmer", "type": "address" },
      { "indexed": false, "internalType": "string", "name": "origin", "type": "string" },
      { "indexed": false, "internalType": "string", "name": "variety", "type": "string" },
      { "indexed": false, "internalType": "string", "name": "ipfsHash", "type": "string" }
    ],
    "name": "BatchMinted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "batchId", "type": "uint256" },
      { "indexed": false, "internalType": "uint8", "name": "stage", "type": "uint8" },
      { "indexed": true, "internalType": "address", "name": "actor", "type": "address" },
      { "indexed": false, "internalType": "string", "name": "ipfsHash", "type": "string" }
    ],
    "name": "StageAppended",
    "type": "event"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "string", "name": "origin", "type": "string" },
      { "internalType": "string", "name": "variety", "type": "string" },
      { "internalType": "string", "name": "initialMetadataIpfs", "type": "string" },
      { "internalType": "uint256", "name": "harvestTimestamp", "type": "uint256" },
      { "internalType": "address", "name": "farmerAddr", "type": "address" }
    ],
    "name": "mintBatch",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "batchId", "type": "uint256" },
      { "internalType": "uint8", "name": "stage", "type": "uint8" },
      { "internalType": "string", "name": "metadataIpfsHash", "type": "string" }
    ],
    "name": "appendStage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "batchId", "type": "uint256" }],
    "name": "getBatchCore",
    "outputs": [
      {
        "components": [
          { "internalType": "uint256", "name": "batchId", "type": "uint256" },
          { "internalType": "string", "name": "origin", "type": "string" },
          { "internalType": "string", "name": "variety", "type": "string" },
          { "internalType": "address", "name": "farmer", "type": "address" },
          { "internalType": "uint256", "name": "harvestTimestamp", "type": "uint256" },
          { "internalType": "uint8", "name": "currentStage", "type": "uint8" }
        ],
        "internalType": "struct BatchTypes.BatchCore",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "batchId", "type": "uint256" }],
    "name": "getHistory",
    "outputs": [
      {
        "components": [
          { "internalType": "uint8", "name": "stage", "type": "uint8" },
          { "internalType": "string", "name": "metadataIpfsHash", "type": "string" },
          { "internalType": "uint256", "name": "timestamp", "type": "uint256" },
          { "internalType": "address", "name": "actor", "type": "address" }
        ],
        "internalType": "struct BatchTypes.StageRecord[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
    "name": "ownerOf",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  }
] as const;
