import { BigInt, log } from "@graphprotocol/graph-ts"
import {
  RegistryContract,
  _Application,
  _Challenge,
  _Deposit,
  _Withdrawal,
  _ApplicationWhitelisted,
  _ListingWithdrawn,
  _TouchAndRemoved,
  _ChallengeFailed,
  _ChallengeSucceeded,
  _RewardClaimed
} from "../generated/RegistryContract/RegistryContract"
import {
  VotingContract,
  _VoteCommitted,
  _VoteRevealed,
  _PollCreated
} from "../generated/VotingContract/VotingContract"
import { 
  Listing,
  Challenge,
  User,
  Vote
} from "../generated/schema"

// Registry contract events
export function handle_Application(event: _Application): void {
  let user = User.load(event.transaction.from.toHexString())

  if (user == null) {
    user = new User(event.transaction.from.toHexString())
    user.numChallenges = BigInt.fromI32(0)
    user.numListingApplications = BigInt.fromI32(1)
    user.numListingsWhitelisted = BigInt.fromI32(0)
    user.numVotesCommitted = BigInt.fromI32(0)
    user.numVotesRevealed = BigInt.fromI32(0)
    user.totalMapRewards = BigInt.fromI32(0)
    user.totalAmountStaked = event.params.deposit
  } else {
    user.numListingApplications = user.numListingApplications.plus(BigInt.fromI32(1))
    user.totalAmountStaked = user.totalAmountStaked.plus(event.params.deposit)
  }
  user.save()

  let listing = new Listing(event.params.listingHash.toHexString())
  listing.owner = user.id
  listing.whitelisted = false
  listing.deposit = event.params.deposit
  listing.wasRemoved = false
  listing.wasWithdrawn = false
  listing.applicationExpiry = event.params.appEndDate
  listing.data = event.params.data
  listing.save()
}

export function handle_Challenge(event: _Challenge): void {
  let challenge = new Challenge(event.params.challengeID.toHexString())
  let challenger = User.load(event.transaction.from.toHexString())

  if (challenger == null) {
    challenger = new User(event.transaction.from.toHexString())
    challenger.numChallenges = BigInt.fromI32(1)
    challenger.numListingApplications = BigInt.fromI32(0)
    challenger.numListingsWhitelisted = BigInt.fromI32(0)
    challenger.numVotesCommitted = BigInt.fromI32(0)
    challenger.numVotesRevealed = BigInt.fromI32(0)
    challenger.totalMapRewards = BigInt.fromI32(0)
    challenger.totalAmountStaked = event.params.deposit
  } else {
    challenger.numChallenges = challenger.numChallenges.plus(BigInt.fromI32(1))
    challenger.totalAmountStaked = challenger.totalAmountStaked.plus(event.params.deposit)
  }
  challenger.save()

  challenge.listing = event.params.listingHash.toHexString()
  challenge.status = "Voting"
  challenge.createdAtTimestamp = event.block.timestamp
  challenge.creator = event.transaction.from.toHexString()
  challenge.stake = event.params.deposit
  challenge.resolved = false
  challenge.totalNumberOfVotesCommitted = BigInt.fromI32(0)
  challenge.totalNumberOfVotesRevealed = BigInt.fromI32(0)
  challenge.totalVotesCommitted = BigInt.fromI32(0)
  challenge.totalVotesRevealed = BigInt.fromI32(0)
  challenge.totalNumberOfVotesFor = BigInt.fromI32(0)
  challenge.totalVotesFor = BigInt.fromI32(0)
  challenge.totalNumberOfVotesAgainst = BigInt.fromI32(0)
  challenge.totalVotesAgainst = BigInt.fromI32(0)
  challenge.votes = []
  challenge.committedUsers = []
  challenge.revealedUsers = []
  challenge.rewardPool = event.params.deposit.times(BigInt.fromI32(2))
  challenge.data = event.params.data
  challenge.save()
}

export function handle_Deposit(event: _Deposit): void {
  let listing = Listing.load(event.params.listingHash.toHexString())
  let user = User.load(event.transaction.from.toHexString())
  let amount = event.params.added
  listing.deposit = listing.deposit.plus(amount)
  user.totalAmountStaked = user.totalAmountStaked.plus(amount)
  listing.save()
  user.save()
}

export function handle_Withdrawal(event: _Withdrawal): void {
  let listing = Listing.load(event.params.listingHash.toHexString())
  let user = User.load(event.transaction.from.toHexString())
  let amount = event.params.withdrew
  listing.deposit = listing.deposit.minus(amount)
  user.totalAmountStaked = user.totalAmountStaked.minus(amount)
  listing.save()
  user.save()
}

export function handle_ApplicationWhitelisted(event: _ApplicationWhitelisted): void {
  let listing = Listing.load(event.params.listingHash.toHexString())
  let user = User.load(listing.owner)
  listing.whitelisted = true
  user.numListingsWhitelisted = user.numListingsWhitelisted.plus(BigInt.fromI32(1))
  listing.save()
  user.save()
}

export function handle_ListingWithdrawn(event: _ListingWithdrawn): void {
  let listing = Listing.load(event.params.listingHash.toHexString())
  let refund = listing.deposit
  let user = User.load(listing.owner)
  listing.wasWithdrawn = true
  listing.deposit = BigInt.fromI32(0)
  user.totalAmountStaked = user.totalAmountStaked.minus(refund)
  listing.save()
  user.save()
}

export function handle_TouchAndRemoved(event: _TouchAndRemoved): void {
  let listing = Listing.load(event.params.listingHash.toHexString())
  let refund = listing.deposit
  let user = User.load(listing.owner)
  listing.wasWithdrawn = true
  listing.deposit = BigInt.fromI32(0)
  user.totalAmountStaked = user.totalAmountStaked.minus(refund)
  listing.save()
  user.save()
}

export function handle_ChallengeFailed(event: _ChallengeFailed): void {
  var challenge = Challenge.load(event.params.challengeID.toHexString())
  challenge.status = "Failed"
  challenge.resolved = true
  challenge.votes.forEach(function(voteId){
    let vote = Vote.load(voteId)
    vote.isChallengeResolved = true
    if(vote.isRevealed) {
      if (vote.isForChallenge) {
        vote.wonChallenge = false
      } else {
        vote.wonChallenge = true
      }
    }
    vote.save() 
  })
  challenge.save()
}

export function handle_ChallengeSucceeded(event: _ChallengeSucceeded): void {
  var challenge = Challenge.load(event.params.challengeID.toHexString())
  challenge.status = "Successful"
  challenge.resolved = true
  challenge.votes.forEach(function(voteId){
    let vote = Vote.load(voteId)
    vote.isChallengeResolved = true
    if(vote.isRevealed) {
      if (!vote.isForChallenge) {
        vote.wonChallenge = false
      } else {
        vote.wonChallenge = true
      }
    }
    vote.save()
  })
  challenge.save()
}

export function handle_RewardClaimed(event: _RewardClaimed): void {
  let vote = Vote.load(event.params.challengeID.toHexString() + '_' + event.params.voter.toHexString())
  vote.rewardClaimed = true
  vote.rewardAmount = event.params.reward
  let user = User.load(event.params.voter.toHexString())
  if(user.totalMapRewards) {
    log.debug('totalMapRewards: {}, voteRewardAmount: {}', [user.totalMapRewards.toString(), event.params.reward.toString()])
    let voteRewardAmount = event.params.reward as BigInt
    user.totalMapRewards = user.totalMapRewards.plus(voteRewardAmount)
  } else if (event.params.reward) {
    user.totalMapRewards = event.params.reward
  }
  user.save()
  vote.save()
}

// Voting contract events
export function handle_VoteCommitted(event: _VoteCommitted): void {
  let voter = User.load(event.params.voter.toHexString())
  if (voter == null) {
    voter = new User(event.params.voter.toHexString())
    voter.numChallenges = BigInt.fromI32(0)
    voter.numListingApplications = BigInt.fromI32(0)
    voter.numListingsWhitelisted = BigInt.fromI32(0)
    voter.numVotesCommitted = BigInt.fromI32(1)
    voter.numVotesRevealed = BigInt.fromI32(0)
    voter.totalMapRewards = BigInt.fromI32(0)
    voter.totalAmountStaked = event.params.numTokens
  } else {
    voter.numVotesCommitted = voter.numVotesCommitted.plus(BigInt.fromI32(1))
    voter.totalAmountStaked = voter.totalAmountStaked.plus(event.params.numTokens)
  }
  

  let vote = new Vote(event.params.pollID.toHexString() + '_' + event.params.voter.toHexString())
  vote.challenge = event.params.pollID.toHexString()
  vote.voter = event.params.voter.toHexString()
  vote.isRevealed = false
  vote.voteAmount = event.params.numTokens
  vote.rewardClaimed = false
  vote.isChallengeResolved = false

  let challenge = Challenge.load(event.params.pollID.toHexString())
  challenge.totalNumberOfVotesCommitted = challenge.totalNumberOfVotesCommitted.plus(BigInt.fromI32(1))
  challenge.totalVotesCommitted = challenge.totalVotesCommitted.plus(event.params.numTokens)
  let votes = challenge.votes
  votes.push(vote.id)
  challenge.votes = votes
  let committedUsers = challenge.committedUsers
  committedUsers.push(voter.id)
  challenge.committedUsers = committedUsers
  voter.save()
  vote.save()
  challenge.save()
}

export function handle_VoteRevealed(event: _VoteRevealed): void {
  let voter = User.load(event.params.voter.toHexString())
  voter.numVotesRevealed = voter.numVotesRevealed.plus(BigInt.fromI32(1))

  let vote = new Vote(event.params.pollID.toHexString() + '_' + event.params.voter.toHexString())
  vote.isRevealed = true
  if(event.params.choice == BigInt.fromI32(0)) {
    vote.isForChallenge = true
  }
  else {
    vote.isForChallenge = false
  }

  let challenge = Challenge.load(event.params.pollID.toHexString())
  challenge.status = "Revealing"
  if(vote.isForChallenge){
    challenge.totalNumberOfVotesFor = challenge.totalNumberOfVotesFor.plus(BigInt.fromI32(1))
    challenge.totalVotesFor = challenge.totalVotesFor.plus(event.params.numTokens)
  } else {
    challenge.totalNumberOfVotesAgainst = challenge.totalNumberOfVotesAgainst.plus(BigInt.fromI32(1))
    challenge.totalVotesAgainst = challenge.totalVotesAgainst.plus(event.params.numTokens)
  }
  challenge.totalNumberOfVotesRevealed = challenge.totalNumberOfVotesRevealed.plus(BigInt.fromI32(1))
  challenge.totalVotesRevealed = challenge.totalVotesRevealed.plus(event.params.numTokens)
  let revealedUsers = challenge.revealedUsers
  revealedUsers.push(voter.id)
  challenge.revealedUsers = revealedUsers
  voter.save()
  vote.save()
  challenge.save()
}

export function handle_PollCreated(event: _PollCreated): void {
  let challenge = new Challenge(event.params.pollID.toHexString())
  challenge.status = "Pending"
  challenge.resolved = false
  challenge.voteCommitEndTimestamp = event.params.commitEndDate
  challenge.voteRevealEndTimestamp = event.params.revealEndDate
  challenge.quorumRequired = event.params.voteQuorum
  challenge.save()
}