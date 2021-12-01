# Design Patterns Decisions

## Inheritance and Interfaces

- Extends OppenZeppelin's `ERC721` and `Ownable` implementations.
- Uses OpenZeppelin's `Counters` library.

## Access Control

Uses `Ownable` access control pattern with `onlyOwner` modifier to limit access to the next functions:

- `giveaway`
- `setBaseURI`
- `setPrice`
- `setProvenanceHash`
- `toggleSaleStatus`
- `withdraw`
