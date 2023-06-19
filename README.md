# Metana Capstone Project 1 - Fate/Grand Order NFT Gacha

Re-implementation of a mobile game gacha system ([Fate/Grand Order](https://fate-go.us)) as a NFT gacha system. A gacha system (loot-box system) is a system 
whereby players attempt to get their favourite characters through the use of a random-number generator(RNG) based 
on a set percentage.

## Implementation Breakdown

- ### Saint Quartz
    In-game currency, implemented as ERC-20 tokens. These will be purchasable with ether in round numbers.
- ### Servants (Characters)
    Implemented as ERC-1155 rather than ERC-721 as there's no unique copies of each characters. But the amount of each individual characters will depend on the number of players purchasing as well as the dependence on RNG.

    Rates of the characters will be based on the following using the oracle, Chainlink VRF.
    
    - 5 Star, 1% 
    - 4 Star, 3% 
    - 3 Star, 40% 
