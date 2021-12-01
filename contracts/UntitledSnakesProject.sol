// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title UntitledSnakesProject contract.
 * @author manuelpires.eth
 * @notice An NFT collection of 100 Snakes living on the Ethereum Blockchain.
 * @dev Extends OpenZeppelin implementation of the ERC-721 Non-Fungible Token Standard.
 */
contract UntitledSnakesProject is ERC721, Ownable {
    using Counters for Counters.Counter;

    /// Counter that keeps track of the current supply of tokens
    Counters.Counter private _tokenIdCounter;

    /// Maximum number of tokens that can be minted
    uint256 public constant MAX_TOKENS = 100;

    /// Maximum number of tokens that can be minted for giveaways
    uint256 public constant MAX_TOKENS_GIVEAWAYS = 10;

    /// Maximum number of tokens that can be minted per transaction
    uint256 public constant MAX_TOKENS_PER_TX = 2;

    /// Price to mint one token
    uint256 public price;

    /// Base URI for all tokens
    string public baseURI;

    /// Provenance hash of all tokens
    string public provenanceHash;

    /// Boolean that indicates if the sale is active or not
    bool public isSaleActive;

    /**
     * @dev Instantiate contract and set {name}, {symbol}, {price} and {baseURI}.
     * @param _price uint256 price to mint one token.
     * @param _initialBaseURI string initial base URI for all tokens.
     */
    constructor(uint256 _price, string memory _initialBaseURI)
        ERC721("UntitledSnakesProject", "SNAKE")
    {
        setPrice(_price);
        setBaseURI(_initialBaseURI);
    }

    /**
     * @notice Mint `_amount` tokens and transfer them to the caller.
     * @dev Requirements:
     * - The sale must be active.
     * - `_amount` must be greater than 0 and less than or equal to {MAX_TOKENS_PER_TX}.
     * - The current supply plus `_amount` must be less than or equal to {MAX_TOKENS}.
     * - {price} * `_amount` must be must less than or equal to the ether value sent.
     * @param _amount uint256 number of tokens to be minted.
     */
    function mint(uint256 _amount) external payable {
        uint256 supply = totalSupply();

        require(isSaleActive, "Sale is not active");
        require(_amount > 0 && _amount <= MAX_TOKENS_PER_TX, "Invalid mint amount");
        require(supply + _amount <= MAX_TOKENS, "Would exceed max supply");
        require(price * _amount <= msg.value, "Ether value sent is not enough");

        for (uint256 i; i < _amount; i++) {
            _mintToken(_msgSender());
        }
    }

    /**
     * @notice Giveaway `_amount` tokens to `_to`.
     * @dev Requirements:
     * - Must be called by the contract owner.
     * - `_amount` must be greater than 0 and less than or equal to {MAX_TOKENS_PER_TX}.
     * - The current supply plus `_amount` must be less than or equal to {MAX_TOKENS_GIVEAWAYS}.
     * @param _to target address that will receive the tokens.
     * @param _amount uint256 number of tokens to mint.
     */
    function giveaway(address _to, uint256 _amount) external onlyOwner {
        uint256 supply = totalSupply();

        require(_amount > 0 && _amount <= MAX_TOKENS_PER_TX, "Invalid giveaway amount");
        require(supply + _amount <= MAX_TOKENS_GIVEAWAYS, "Would exceed max giveaway tokens");

        for (uint256 i; i < _amount; i++) {
            _mintToken(_to);
        }
    }

    /**
     * @notice Set the provenance hash of all tokens.
     * @dev Can only be called by the contract owner.
     * Will be used to set the provenance hash once it is calculated.
     * @param _provenanceHash string povenance hash of all tokens.
     */
    function setProvenanceHash(string memory _provenanceHash) external onlyOwner {
        provenanceHash = _provenanceHash;
    }

    /**
     * @notice Toggle the sale status: inactive --> active, and vice versa.
     * @dev Can only be called by the contract owner.
     */
    function toggleSaleStatus() external onlyOwner {
        isSaleActive = !isSaleActive;
    }

    /**
     * @notice Withdraw all contract funds to the owner address.
     * @dev Can only be called by the contract owner.
     */
    function withdraw() external onlyOwner {
        uint256 amount = address(this).balance;
        (bool success, ) = payable(_msgSender()).call{value: amount}("");
        require(success, "Withdraw failed");
    }

    /**
     * @notice Return all tokenIds owned by `_owner`.
     * @param _owner target address to get the tokenIds of.
     * @return uint256[] array with every tokenId owned by `_owner`.
     */
    function walletOfOwner(address _owner) external view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(_owner);
        if (tokenCount == 0) {
            return new uint256[](0);
        }

        uint256 counter;
        uint256[] memory tokenIds = new uint256[](tokenCount);
        for (uint256 i; i < totalSupply(); i++) {
            if (ownerOf(i) == _owner) {
                tokenIds[counter] = i;
                counter++;

                if (counter == tokenCount) {
                    break;
                }
            }
        }
        return tokenIds;
    }

    /**
     * @notice Set the base URI for all tokens.
     * @dev Can only be called by the contract owner.
     * Will be used to update the initial {baseURI} with the real IPFS {baseURI} after minting.
     * @param _newBaseURI string base URI for all tokens.
     */
    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    /**
     * @notice Set the price to mint one token.
     * @dev Can only be called by the contract owner.
     * @param _newPrice uint256 price to mint one token.
     */
    function setPrice(uint256 _newPrice) public onlyOwner {
        price = _newPrice;
    }

    /**
     * @notice Return the current supply of tokens.
     * @return uint256 total number of tokens minted.
     */
    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    /**
     * @notice Return the base URI for all tokens.
     * @dev Overrides {_baseURI} function from parent ERC721 contract.
     * @return string base URI for all tokens.
     */
    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    /**
     * @notice Safely mint one token and transfer it to `_to`.
     * @dev Calls the ERC721 {_safeMint} function and increments {_tokenIdCounter}.
     * @param _to target address that will receive the token.
     */
    function _mintToken(address _to) private {
        uint256 tokenId = totalSupply();
        _tokenIdCounter.increment();
        _safeMint(_to, tokenId);
    }
}
