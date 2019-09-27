# FOAM Subgraph

[Foam](https://foam.space) provides the tools to enable a crowdsourced map and decentralized location services.

## Networks and Performance

This subgraph can be found on The Graph Hosted Service at https://thegraph.com/explorer/subgraph/blocklytics/foam.

You can also run this subgraph locally, if you wish. Instructions for that can be found in [The Graph Documentation](https://thegraph.com/docs/quick-start).

## Getting started with querying
Below are a few ways to show how to query the Foam Subgraph for data. The queries show most of the information that is queryable, but there are many other filtering options that can be used, just check out the [querying api](https://thegraph.com/docs/graphql-api#queries).

### Querying All Active (Whitelisted) Listings
```graphql
{
  listings(where: {whitelisted: true, wasRemoved: false, wasWithdrawn: false}) {
    id
    owner {
      id
    }
    deposit
    applicationExpiry
    data
  }
}
```

### Querying All Votes for a given Challenge
```graphql
{
  challenge(id: "0x10") {
    votes {
      id
      voter {
        id
      }
      isRevealed
      isForChallenge
      voteAmount
      wonChallenge
      rewardAmount
      rewardClaimed
    }
  }
}
```