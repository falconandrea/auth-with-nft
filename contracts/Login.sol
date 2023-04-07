// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract Login is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  string baseSvg =
    "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: sans-serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='black' /><text x='50%' y='40%' class='base' dominant-baseline='middle' text-anchor='middle'>Token for Login</text><text x='50%' y='60%' class='base' dominant-baseline='middle' text-anchor='middle'>";

  uint256 maxSupply = 1000;
  event NFTMinted(address sender, uint256 tokenId);

  constructor() ERC721("Login Token", "LGTKN") {}

  function mintLogin() public {
    uint256 newItemId = _tokenIds.current();
    require(newItemId < maxSupply, "Max supply has been reached");
    require(balanceOf(msg.sender) == 0, "Max Mint per wallet reached");

    string memory svgText = string(
        abi.encodePacked("Member number #", Strings.toString(newItemId + 1))
    );

    string memory finalSvg = string(
        abi.encodePacked(baseSvg, svgText, "</text></svg>")
    );

    string memory json = Base64.encode(
        bytes(
            string(
                abi.encodePacked(
                    '{"name": "',
                    svgText,
                    '", "description": "This NFT garant you to access on the reserved area on our Application", "image": "data:image/svg+xml;base64,',
                    Base64.encode(bytes(finalSvg)),
                    '"}'
                )
            )
        )
    );

    string memory finalTokenUri = string(
        abi.encodePacked("data:application/json;base64,", json)
    );

    _safeMint(msg.sender, newItemId);
    _setTokenURI(newItemId, finalTokenUri);

    _tokenIds.increment();
    emit NFTMinted(msg.sender, newItemId);
  }
}
