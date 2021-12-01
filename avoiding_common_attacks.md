# Avoiding Common Attacks

## SWC-100: Function Default Visibility

All functions visibility modifiers consciously set up.

## SWC-103: Floating Pragma

Used specific compiler pragma `0.8.9` for the main contract.

## SWC-104: Unchecked Call Return Value

The `withdraw` function has one `call.value` to the owner's address and the return value `bool success` is checked.

## SWC-105: Unprotected Ether Withdrawal

The `withdraw` function is protected with OpenZeppelin `Ownable`'s `onlyOwner` modifier.

## SWC-108: State Variable Default Visibility

All state variables visibility modifiers consciously set up.

## SWC-115: Authorization through tx.origin

All access control validations and authorizations are made using the `onlyOwner` modifier which uses `msg.sender`.

## SWC-119: Shadowing State Variables

Made sure to avoid any ambiguities between storage variables, and to compile contract only when there's no compiler warnings.

## SWC-135: Code With No Effects

The whole contract code is reachable, and 33 unit tests were written for full code coverage.

## Proper Use of Require

Used `require` for validation of inputs, external call returns and varibales before state changes. Used always towards the beginning of functions, except in the `withdraw` function where `require` was used for validating the external call return value.

## Use Modifiers Only for Validation

Used modifier `onlyOwner` which only does access control validation.

## Pull Over Push

The only call made by the contract is from within the `withdraw` function. The rest of the contract functionality is based on receiving calls.

## Checks-Effects-Interactions

No state changes are made after the one `call.value` made in the contract.

## Proper Use of .call

Used `call.value` instead of `send` or `transfer` to send ether.
