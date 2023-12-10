//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import {Ownable} from "./utils/Ownable.sol";
import {SigningData} from "./Types.sol";

contract AgreementToken is ERC721, Ownable {
    mapping(uint256 => SigningData) private metadata;
    uint256 private totalSupply = 1;

    constructor(
        address _owner
    ) ERC721("Hata Agreement Token", "HAT") Ownable(_owner) {}

    function mint(address _to, SigningData memory _sdata) external onlyOwner {
        uint256 currentId = totalSupply;
        unchecked {
            ++totalSupply;
        }
        metadata[currentId] = _sdata;
        _safeMint(_to, currentId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        SigningData memory data = metadata[tokenId];

        // Convert tokenId to a string and concatenate it with "Agreement #"
        string memory agreementNumber = Strings.toString(tokenId);
        bytes memory tokenName = abi.encodePacked(
            ' "name": "Agreement #',
            agreementNumber,
            '",\n'
        );

        bytes memory description = abi.encodePacked(
            ' "description": "Property NFT",\n'
        );
        bytes memory image = abi.encodePacked(' "image": "",\n'); //todo: apply image here

        // Construct the JSON string
        string memory json = string(
            abi.encodePacked(
                "{\n",
                tokenName,
                description,
                image,
                _prepareAttributes(data),
                "\n}"
            )
        );

        // Encode the JSON string to Base64
        string memory base64Json = Base64.encode(bytes(json));

        return
            string(
                abi.encodePacked("data:application/json;base64,", base64Json)
            );
    }

    function _prepareAttributes(
        SigningData memory data
    ) internal pure returns (string memory) {
        bytes memory propertyID = abi.encodePacked(
            '\n\t{"trait_type": "Property ID", "value": "',
            _toHexString(data.propertyID),
            '"},'
        );
        bytes memory location = abi.encodePacked(
            '\n\t{"trait_type": "Title", "value": "',
            data.location,
            '"},'
        );
        bytes memory landlord = abi.encodePacked(
            '\n\t{"trait_type": "Landlord", "value": "',
            _toAddressString(data.landlord),
            '"},'
        );
        bytes memory price = abi.encodePacked(
            '\n\t{"trait_type": "Price", "value": "',
            Strings.toString(data.price),
            '"},'
        );
        bytes memory tenant = abi.encodePacked(
            '\n\t{"trait_type": "Tenant", "value": "',
            _toAddressString(data.tenant),
            '"},'
        );
        bytes memory rentStart = abi.encodePacked(
            '\n\t{"trait_type": "Rent Until", "value": "',
            Strings.toString(data.rentStart),
            '"},'
        );
        bytes memory rentFinish = abi.encodePacked(
            '\n\t{"trait_type": "Rent Until", "value": "',
            Strings.toString(data.rentFinish),
            '"},'
        );
        bytes memory timestamp = abi.encodePacked(
            '\n\t{"trait_type": "Agreement Timestamp", "value": "',
            Strings.toString(data.agreementTimestamp),
            '"},'
        );

        return
            string(
                abi.encodePacked(
                    ' "attributes": [',
                    propertyID,
                    location,
                    landlord,
                    price,
                    tenant,
                    rentStart,
                    rentFinish,
                    timestamp,
                    "\n  ]"
                )
            );
    }

    function _toHexString(bytes32 data) internal pure returns (string memory) {
        return Strings.toHexString(uint256(data), 32);
    }

    function _toAddressString(
        address _addr
    ) internal pure returns (string memory) {
        return Strings.toHexString(uint256(uint160(_addr)), 20);
    }

    function getTotalSupply() external view returns (uint256) {
        return totalSupply;
    }
}
