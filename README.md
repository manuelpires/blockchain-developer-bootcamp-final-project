# Untitled Snakes Project 🐍

## About 📖

Final Project Submission for the ConsenSys Blockchain Developer Bootcamp 2021.

The project consists in a Solidity smart contract that defines a collection of Non-Fungible Tokens on the Ethereum blockchain, and a NextJS application that can be used for minting them. Metadata and images of the tokens were generated using the [NFT Collection Generator](https://github.com/manuelpires/nft-collection-generator) and then stored on IPFS using Pinata.

Initially, metadata and images URIs for all NFTs in the smart contract will point to the NextJS API Routes implemented. Upon receiving a request, this API will fetch the actual data from IPFS and only return it for NFTs that **have been minted**. This way we can expose the necessary data while avoiding leaking the CID of the whole content on IPFS. The intention is to replace the base URI for all NFTs with the actual IPFS base URI after **all tokens** have been minted, revealing in the end the real location of the content.

### Basic workflow

1. Enter dapp website.
2. Press the __Connect__ button and login with MetaMask.
   - The current supply of NFTs shows up.
   - Both the amount selector and the __Mint__ button show up.
3. Select amount of tokens to mint and press the __Mint__ button.
4. Sign with MetaMask the call to the __mint__ function of the smart contract.
5. A notification is shown to the user on transaction success/failure.
   - If successful, the tokens will be minted and transfered to the user address.

### Main tools/tech used

- Solidity
- OpenZeppelin contracts
- Hardhat & Waffle
- Infura
- IPFS & Pinata
- Ethers
- NextJS & React
- TypeScript

## Directory structure 🗂

- `components`: React components.
- `contracts`: Smart contract of the project.
- `hooks`: React hooks.
- `middleware`: Middleware for the NextJS API Routes.
- `pages`: NextJS pages and API Routes for the web application.
- `public`: Public folder of the web application.
- `scripts`: Scripts for the smart contract.
- `styles`: Global styles for the web application.
- `test`: Tests for smart contract.

## Getting Started 🛠

### Prerequisites

- [Download and install Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Install Yarn](https://classic.yarnpkg.com/lang/en/docs/install)

### Installation

Inside the project root directory, install all dependencies:

```sh
yarn install
```

This will also launch a `postinstall` script that will compile the contract and export all its typings for the web application to use.

## Usage 👾

### Compile the contract

Compile the smart contract and generate all its typings:

```sh
npx hardhat compile
```

### Test the contract

Run all unit tests using the Hardhat Network:

```sh
npx hardhat test
```

If you want to use Ganache to run the unit tests, first spin up a Ganache local testnet on port `8545` and then run:

```sh
npx hardhat --network localhost test
```

### Environment variables

You don't need to set up any environment varibales to compile or test the smart contract, although you'll need them if you want to deploy it or to run the NextJS application locally. The template for the necessary environment variables can be found in the `.env.template` file.

## Deployed dapp URL 🚀

[https://untitled-snakes-project.vercel.app](https://untitled-snakes-project.vercel.app)

## Verified smart contract on the Rinkeby testnet 🧪

[UntitledSnakesProject.sol](https://rinkeby.etherscan.io/address/0xF82953F87CC4b1AddF3dAd906404c78A55c93b29#code)

## Screencast 🖥

[https://youtu.be/fqFZwOGcw5o](https://youtu.be/fqFZwOGcw5o)

## Public Ethereum account for NFT certification 🎓

`manuelpires.eth`

## License 📜

Distributed under the MIT License. See `LICENSE` for more information.

## Contact 👋

Manuel Pires - manuelpiresok@gmail.com

Project Link: [https://github.com/manuelpires/blockchain-developer-bootcamp-final-project](https://github.com/manuelpires/blockchain-developer-bootcamp-final-project)
