export const SAMPLE_CONTRACT_ADDRESS =
  "0x003F58FA209740b5953E489fFe83EEA2629aC6A9";
export const SAMPLEABI = `[
    {
      "inputs": [],
      "stateMutability": "payable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "when",
          "type": "uint256"
        }
      ],
      "name": "Withdrawal",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "setValue",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "storedValue",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "unlockTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "_user",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ]`;

export const defaultChain = 42420

export const networks = [
  { rpc: "https://mainnet-rpc.assetchain.org", chainId: 42420, explorer: 'https://scan.assetchain.org', name: "Asset Chain" },
  { rpc: "https://enugu-rpc.assetchain.org", chainId: 42421, explorer: 'https://scan-testnet.assetchain.org', name: 'Asset Chain Testnet' },
];

export const numReg = new RegExp("[0-9]");

export const _NATIVE = `0x0000000000000000000000000000000000000001`;
export const USDT = import.meta.env.VITE_USDT_ADDRESS;

export const ASSETS = [
  {
    symbol: "RWA",
    token: _NATIVE,
  },
  { symbol: "USDT", token: USDT },
];
