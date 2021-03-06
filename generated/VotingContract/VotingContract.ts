// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  EthereumCall,
  EthereumEvent,
  SmartContract,
  EthereumValue,
  JSONValue,
  TypedMap,
  Entity,
  EthereumTuple,
  Bytes,
  Address,
  BigInt,
  CallResult
} from "@graphprotocol/graph-ts";

export class _VoteCommitted extends EthereumEvent {
  get params(): _VoteCommitted__Params {
    return new _VoteCommitted__Params(this);
  }
}

export class _VoteCommitted__Params {
  _event: _VoteCommitted;

  constructor(event: _VoteCommitted) {
    this._event = event;
  }

  get pollID(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get numTokens(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get voter(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class _VoteRevealed extends EthereumEvent {
  get params(): _VoteRevealed__Params {
    return new _VoteRevealed__Params(this);
  }
}

export class _VoteRevealed__Params {
  _event: _VoteRevealed;

  constructor(event: _VoteRevealed) {
    this._event = event;
  }

  get pollID(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get numTokens(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get votesFor(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get votesAgainst(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get choice(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get voter(): Address {
    return this._event.parameters[5].value.toAddress();
  }
}

export class _PollCreated extends EthereumEvent {
  get params(): _PollCreated__Params {
    return new _PollCreated__Params(this);
  }
}

export class _PollCreated__Params {
  _event: _PollCreated;

  constructor(event: _PollCreated) {
    this._event = event;
  }

  get voteQuorum(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get commitEndDate(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get revealEndDate(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get pollID(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get creator(): Address {
    return this._event.parameters[4].value.toAddress();
  }
}

export class _VotingRightsGranted extends EthereumEvent {
  get params(): _VotingRightsGranted__Params {
    return new _VotingRightsGranted__Params(this);
  }
}

export class _VotingRightsGranted__Params {
  _event: _VotingRightsGranted;

  constructor(event: _VotingRightsGranted) {
    this._event = event;
  }

  get numTokens(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get voter(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class _VotingRightsWithdrawn extends EthereumEvent {
  get params(): _VotingRightsWithdrawn__Params {
    return new _VotingRightsWithdrawn__Params(this);
  }
}

export class _VotingRightsWithdrawn__Params {
  _event: _VotingRightsWithdrawn;

  constructor(event: _VotingRightsWithdrawn) {
    this._event = event;
  }

  get numTokens(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get voter(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class _TokensRescued extends EthereumEvent {
  get params(): _TokensRescued__Params {
    return new _TokensRescued__Params(this);
  }
}

export class _TokensRescued__Params {
  _event: _TokensRescued;

  constructor(event: _TokensRescued) {
    this._event = event;
  }

  get pollID(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get voter(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class VotingContract__pollMapResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;
  value3: BigInt;
  value4: BigInt;

  constructor(
    value0: BigInt,
    value1: BigInt,
    value2: BigInt,
    value3: BigInt,
    value4: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
  }

  toMap(): TypedMap<string, EthereumValue> {
    let map = new TypedMap<string, EthereumValue>();
    map.set("value0", EthereumValue.fromUnsignedBigInt(this.value0));
    map.set("value1", EthereumValue.fromUnsignedBigInt(this.value1));
    map.set("value2", EthereumValue.fromUnsignedBigInt(this.value2));
    map.set("value3", EthereumValue.fromUnsignedBigInt(this.value3));
    map.set("value4", EthereumValue.fromUnsignedBigInt(this.value4));
    return map;
  }
}

export class VotingContract extends SmartContract {
  static bind(address: Address): VotingContract {
    return new VotingContract("VotingContract", address);
  }

  getTotalNumberOfTokensForWinningOption(_pollID: BigInt): BigInt {
    let result = super.call("getTotalNumberOfTokensForWinningOption", [
      EthereumValue.fromUnsignedBigInt(_pollID)
    ]);

    return result[0].toBigInt();
  }

  try_getTotalNumberOfTokensForWinningOption(
    _pollID: BigInt
  ): CallResult<BigInt> {
    let result = super.tryCall("getTotalNumberOfTokensForWinningOption", [
      EthereumValue.fromUnsignedBigInt(_pollID)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBigInt());
  }

  INITIAL_POLL_NONCE(): BigInt {
    let result = super.call("INITIAL_POLL_NONCE", []);

    return result[0].toBigInt();
  }

  try_INITIAL_POLL_NONCE(): CallResult<BigInt> {
    let result = super.tryCall("INITIAL_POLL_NONCE", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBigInt());
  }

  getInsertPointForNumTokens(
    _voter: Address,
    _numTokens: BigInt,
    _pollID: BigInt
  ): BigInt {
    let result = super.call("getInsertPointForNumTokens", [
      EthereumValue.fromAddress(_voter),
      EthereumValue.fromUnsignedBigInt(_numTokens),
      EthereumValue.fromUnsignedBigInt(_pollID)
    ]);

    return result[0].toBigInt();
  }

  try_getInsertPointForNumTokens(
    _voter: Address,
    _numTokens: BigInt,
    _pollID: BigInt
  ): CallResult<BigInt> {
    let result = super.tryCall("getInsertPointForNumTokens", [
      EthereumValue.fromAddress(_voter),
      EthereumValue.fromUnsignedBigInt(_numTokens),
      EthereumValue.fromUnsignedBigInt(_pollID)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBigInt());
  }

  startPoll(
    _voteQuorum: BigInt,
    _commitDuration: BigInt,
    _revealDuration: BigInt
  ): BigInt {
    let result = super.call("startPoll", [
      EthereumValue.fromUnsignedBigInt(_voteQuorum),
      EthereumValue.fromUnsignedBigInt(_commitDuration),
      EthereumValue.fromUnsignedBigInt(_revealDuration)
    ]);

    return result[0].toBigInt();
  }

  try_startPoll(
    _voteQuorum: BigInt,
    _commitDuration: BigInt,
    _revealDuration: BigInt
  ): CallResult<BigInt> {
    let result = super.tryCall("startPoll", [
      EthereumValue.fromUnsignedBigInt(_voteQuorum),
      EthereumValue.fromUnsignedBigInt(_commitDuration),
      EthereumValue.fromUnsignedBigInt(_revealDuration)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBigInt());
  }

  voteTokenBalance(param0: Address): BigInt {
    let result = super.call("voteTokenBalance", [
      EthereumValue.fromAddress(param0)
    ]);

    return result[0].toBigInt();
  }

  try_voteTokenBalance(param0: Address): CallResult<BigInt> {
    let result = super.tryCall("voteTokenBalance", [
      EthereumValue.fromAddress(param0)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBigInt());
  }

  getLastNode(_voter: Address): BigInt {
    let result = super.call("getLastNode", [EthereumValue.fromAddress(_voter)]);

    return result[0].toBigInt();
  }

  try_getLastNode(_voter: Address): CallResult<BigInt> {
    let result = super.tryCall("getLastNode", [
      EthereumValue.fromAddress(_voter)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBigInt());
  }

  revealPeriodActive(_pollID: BigInt): boolean {
    let result = super.call("revealPeriodActive", [
      EthereumValue.fromUnsignedBigInt(_pollID)
    ]);

    return result[0].toBoolean();
  }

  try_revealPeriodActive(_pollID: BigInt): CallResult<boolean> {
    let result = super.tryCall("revealPeriodActive", [
      EthereumValue.fromUnsignedBigInt(_pollID)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBoolean());
  }

  isPassed(_pollID: BigInt): boolean {
    let result = super.call("isPassed", [
      EthereumValue.fromUnsignedBigInt(_pollID)
    ]);

    return result[0].toBoolean();
  }

  try_isPassed(_pollID: BigInt): CallResult<boolean> {
    let result = super.tryCall("isPassed", [
      EthereumValue.fromUnsignedBigInt(_pollID)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBoolean());
  }

  pollMap(param0: BigInt): VotingContract__pollMapResult {
    let result = super.call("pollMap", [
      EthereumValue.fromUnsignedBigInt(param0)
    ]);

    return new VotingContract__pollMapResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBigInt(),
      result[4].toBigInt()
    );
  }

  try_pollMap(param0: BigInt): CallResult<VotingContract__pollMapResult> {
    let result = super.tryCall("pollMap", [
      EthereumValue.fromUnsignedBigInt(param0)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(
      new VotingContract__pollMapResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toBigInt(),
        value[4].toBigInt()
      )
    );
  }

  getLockedTokens(_voter: Address): BigInt {
    let result = super.call("getLockedTokens", [
      EthereumValue.fromAddress(_voter)
    ]);

    return result[0].toBigInt();
  }

  try_getLockedTokens(_voter: Address): CallResult<BigInt> {
    let result = super.tryCall("getLockedTokens", [
      EthereumValue.fromAddress(_voter)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBigInt());
  }

  didCommit(_voter: Address, _pollID: BigInt): boolean {
    let result = super.call("didCommit", [
      EthereumValue.fromAddress(_voter),
      EthereumValue.fromUnsignedBigInt(_pollID)
    ]);

    return result[0].toBoolean();
  }

  try_didCommit(_voter: Address, _pollID: BigInt): CallResult<boolean> {
    let result = super.tryCall("didCommit", [
      EthereumValue.fromAddress(_voter),
      EthereumValue.fromUnsignedBigInt(_pollID)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBoolean());
  }

  validPosition(
    _prevID: BigInt,
    _nextID: BigInt,
    _voter: Address,
    _numTokens: BigInt
  ): boolean {
    let result = super.call("validPosition", [
      EthereumValue.fromUnsignedBigInt(_prevID),
      EthereumValue.fromUnsignedBigInt(_nextID),
      EthereumValue.fromAddress(_voter),
      EthereumValue.fromUnsignedBigInt(_numTokens)
    ]);

    return result[0].toBoolean();
  }

  try_validPosition(
    _prevID: BigInt,
    _nextID: BigInt,
    _voter: Address,
    _numTokens: BigInt
  ): CallResult<boolean> {
    let result = super.tryCall("validPosition", [
      EthereumValue.fromUnsignedBigInt(_prevID),
      EthereumValue.fromUnsignedBigInt(_nextID),
      EthereumValue.fromAddress(_voter),
      EthereumValue.fromUnsignedBigInt(_numTokens)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBoolean());
  }

  pollExists(_pollID: BigInt): boolean {
    let result = super.call("pollExists", [
      EthereumValue.fromUnsignedBigInt(_pollID)
    ]);

    return result[0].toBoolean();
  }

  try_pollExists(_pollID: BigInt): CallResult<boolean> {
    let result = super.tryCall("pollExists", [
      EthereumValue.fromUnsignedBigInt(_pollID)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBoolean());
  }

  pollNonce(): BigInt {
    let result = super.call("pollNonce", []);

    return result[0].toBigInt();
  }

  try_pollNonce(): CallResult<BigInt> {
    let result = super.tryCall("pollNonce", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBigInt());
  }

  attrUUID(_user: Address, _pollID: BigInt): Bytes {
    let result = super.call("attrUUID", [
      EthereumValue.fromAddress(_user),
      EthereumValue.fromUnsignedBigInt(_pollID)
    ]);

    return result[0].toBytes();
  }

  try_attrUUID(_user: Address, _pollID: BigInt): CallResult<Bytes> {
    let result = super.tryCall("attrUUID", [
      EthereumValue.fromAddress(_user),
      EthereumValue.fromUnsignedBigInt(_pollID)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBytes());
  }

  commitPeriodActive(_pollID: BigInt): boolean {
    let result = super.call("commitPeriodActive", [
      EthereumValue.fromUnsignedBigInt(_pollID)
    ]);

    return result[0].toBoolean();
  }

  try_commitPeriodActive(_pollID: BigInt): CallResult<boolean> {
    let result = super.tryCall("commitPeriodActive", [
      EthereumValue.fromUnsignedBigInt(_pollID)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBoolean());
  }

  didReveal(_voter: Address, _pollID: BigInt): boolean {
    let result = super.call("didReveal", [
      EthereumValue.fromAddress(_voter),
      EthereumValue.fromUnsignedBigInt(_pollID)
    ]);

    return result[0].toBoolean();
  }

  try_didReveal(_voter: Address, _pollID: BigInt): CallResult<boolean> {
    let result = super.tryCall("didReveal", [
      EthereumValue.fromAddress(_voter),
      EthereumValue.fromUnsignedBigInt(_pollID)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBoolean());
  }

  getNumPassingTokens(_voter: Address, _pollID: BigInt, _salt: BigInt): BigInt {
    let result = super.call("getNumPassingTokens", [
      EthereumValue.fromAddress(_voter),
      EthereumValue.fromUnsignedBigInt(_pollID),
      EthereumValue.fromUnsignedBigInt(_salt)
    ]);

    return result[0].toBigInt();
  }

  try_getNumPassingTokens(
    _voter: Address,
    _pollID: BigInt,
    _salt: BigInt
  ): CallResult<BigInt> {
    let result = super.tryCall("getNumPassingTokens", [
      EthereumValue.fromAddress(_voter),
      EthereumValue.fromUnsignedBigInt(_pollID),
      EthereumValue.fromUnsignedBigInt(_salt)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBigInt());
  }

  getNumTokens(_voter: Address, _pollID: BigInt): BigInt {
    let result = super.call("getNumTokens", [
      EthereumValue.fromAddress(_voter),
      EthereumValue.fromUnsignedBigInt(_pollID)
    ]);

    return result[0].toBigInt();
  }

  try_getNumTokens(_voter: Address, _pollID: BigInt): CallResult<BigInt> {
    let result = super.tryCall("getNumTokens", [
      EthereumValue.fromAddress(_voter),
      EthereumValue.fromUnsignedBigInt(_pollID)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBigInt());
  }

  getCommitHash(_voter: Address, _pollID: BigInt): Bytes {
    let result = super.call("getCommitHash", [
      EthereumValue.fromAddress(_voter),
      EthereumValue.fromUnsignedBigInt(_pollID)
    ]);

    return result[0].toBytes();
  }

  try_getCommitHash(_voter: Address, _pollID: BigInt): CallResult<Bytes> {
    let result = super.tryCall("getCommitHash", [
      EthereumValue.fromAddress(_voter),
      EthereumValue.fromUnsignedBigInt(_pollID)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBytes());
  }

  isExpired(_terminationDate: BigInt): boolean {
    let result = super.call("isExpired", [
      EthereumValue.fromUnsignedBigInt(_terminationDate)
    ]);

    return result[0].toBoolean();
  }

  try_isExpired(_terminationDate: BigInt): CallResult<boolean> {
    let result = super.tryCall("isExpired", [
      EthereumValue.fromUnsignedBigInt(_terminationDate)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBoolean());
  }

  pollEnded(_pollID: BigInt): boolean {
    let result = super.call("pollEnded", [
      EthereumValue.fromUnsignedBigInt(_pollID)
    ]);

    return result[0].toBoolean();
  }

  try_pollEnded(_pollID: BigInt): CallResult<boolean> {
    let result = super.tryCall("pollEnded", [
      EthereumValue.fromUnsignedBigInt(_pollID)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBoolean());
  }

  token(): Address {
    let result = super.call("token", []);

    return result[0].toAddress();
  }

  try_token(): CallResult<Address> {
    let result = super.tryCall("token", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toAddress());
  }
}

export class StartPollCall extends EthereumCall {
  get inputs(): StartPollCall__Inputs {
    return new StartPollCall__Inputs(this);
  }

  get outputs(): StartPollCall__Outputs {
    return new StartPollCall__Outputs(this);
  }
}

export class StartPollCall__Inputs {
  _call: StartPollCall;

  constructor(call: StartPollCall) {
    this._call = call;
  }

  get _voteQuorum(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _commitDuration(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _revealDuration(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class StartPollCall__Outputs {
  _call: StartPollCall;

  constructor(call: StartPollCall) {
    this._call = call;
  }

  get pollID(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class CommitVotesCall extends EthereumCall {
  get inputs(): CommitVotesCall__Inputs {
    return new CommitVotesCall__Inputs(this);
  }

  get outputs(): CommitVotesCall__Outputs {
    return new CommitVotesCall__Outputs(this);
  }
}

export class CommitVotesCall__Inputs {
  _call: CommitVotesCall;

  constructor(call: CommitVotesCall) {
    this._call = call;
  }

  get _pollIDs(): Array<BigInt> {
    return this._call.inputValues[0].value.toBigIntArray();
  }

  get _secretHashes(): Array<Bytes> {
    return this._call.inputValues[1].value.toBytesArray();
  }

  get _numsTokens(): Array<BigInt> {
    return this._call.inputValues[2].value.toBigIntArray();
  }

  get _prevPollIDs(): Array<BigInt> {
    return this._call.inputValues[3].value.toBigIntArray();
  }
}

export class CommitVotesCall__Outputs {
  _call: CommitVotesCall;

  constructor(call: CommitVotesCall) {
    this._call = call;
  }
}

export class CommitVoteCall extends EthereumCall {
  get inputs(): CommitVoteCall__Inputs {
    return new CommitVoteCall__Inputs(this);
  }

  get outputs(): CommitVoteCall__Outputs {
    return new CommitVoteCall__Outputs(this);
  }
}

export class CommitVoteCall__Inputs {
  _call: CommitVoteCall;

  constructor(call: CommitVoteCall) {
    this._call = call;
  }

  get _pollID(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _secretHash(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }

  get _numTokens(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _prevPollID(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }
}

export class CommitVoteCall__Outputs {
  _call: CommitVoteCall;

  constructor(call: CommitVoteCall) {
    this._call = call;
  }
}

export class RevealVotesCall extends EthereumCall {
  get inputs(): RevealVotesCall__Inputs {
    return new RevealVotesCall__Inputs(this);
  }

  get outputs(): RevealVotesCall__Outputs {
    return new RevealVotesCall__Outputs(this);
  }
}

export class RevealVotesCall__Inputs {
  _call: RevealVotesCall;

  constructor(call: RevealVotesCall) {
    this._call = call;
  }

  get _pollIDs(): Array<BigInt> {
    return this._call.inputValues[0].value.toBigIntArray();
  }

  get _voteOptions(): Array<BigInt> {
    return this._call.inputValues[1].value.toBigIntArray();
  }

  get _salts(): Array<BigInt> {
    return this._call.inputValues[2].value.toBigIntArray();
  }
}

export class RevealVotesCall__Outputs {
  _call: RevealVotesCall;

  constructor(call: RevealVotesCall) {
    this._call = call;
  }
}

export class RescueTokensCall extends EthereumCall {
  get inputs(): RescueTokensCall__Inputs {
    return new RescueTokensCall__Inputs(this);
  }

  get outputs(): RescueTokensCall__Outputs {
    return new RescueTokensCall__Outputs(this);
  }
}

export class RescueTokensCall__Inputs {
  _call: RescueTokensCall;

  constructor(call: RescueTokensCall) {
    this._call = call;
  }

  get _pollID(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class RescueTokensCall__Outputs {
  _call: RescueTokensCall;

  constructor(call: RescueTokensCall) {
    this._call = call;
  }
}

export class RequestVotingRightsCall extends EthereumCall {
  get inputs(): RequestVotingRightsCall__Inputs {
    return new RequestVotingRightsCall__Inputs(this);
  }

  get outputs(): RequestVotingRightsCall__Outputs {
    return new RequestVotingRightsCall__Outputs(this);
  }
}

export class RequestVotingRightsCall__Inputs {
  _call: RequestVotingRightsCall;

  constructor(call: RequestVotingRightsCall) {
    this._call = call;
  }

  get _numTokens(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class RequestVotingRightsCall__Outputs {
  _call: RequestVotingRightsCall;

  constructor(call: RequestVotingRightsCall) {
    this._call = call;
  }
}

export class RevealVoteCall extends EthereumCall {
  get inputs(): RevealVoteCall__Inputs {
    return new RevealVoteCall__Inputs(this);
  }

  get outputs(): RevealVoteCall__Outputs {
    return new RevealVoteCall__Outputs(this);
  }
}

export class RevealVoteCall__Inputs {
  _call: RevealVoteCall;

  constructor(call: RevealVoteCall) {
    this._call = call;
  }

  get _pollID(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _voteOption(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _salt(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class RevealVoteCall__Outputs {
  _call: RevealVoteCall;

  constructor(call: RevealVoteCall) {
    this._call = call;
  }
}

export class RescueTokensInMultiplePollsCall extends EthereumCall {
  get inputs(): RescueTokensInMultiplePollsCall__Inputs {
    return new RescueTokensInMultiplePollsCall__Inputs(this);
  }

  get outputs(): RescueTokensInMultiplePollsCall__Outputs {
    return new RescueTokensInMultiplePollsCall__Outputs(this);
  }
}

export class RescueTokensInMultiplePollsCall__Inputs {
  _call: RescueTokensInMultiplePollsCall;

  constructor(call: RescueTokensInMultiplePollsCall) {
    this._call = call;
  }

  get _pollIDs(): Array<BigInt> {
    return this._call.inputValues[0].value.toBigIntArray();
  }
}

export class RescueTokensInMultiplePollsCall__Outputs {
  _call: RescueTokensInMultiplePollsCall;

  constructor(call: RescueTokensInMultiplePollsCall) {
    this._call = call;
  }
}

export class WithdrawVotingRightsCall extends EthereumCall {
  get inputs(): WithdrawVotingRightsCall__Inputs {
    return new WithdrawVotingRightsCall__Inputs(this);
  }

  get outputs(): WithdrawVotingRightsCall__Outputs {
    return new WithdrawVotingRightsCall__Outputs(this);
  }
}

export class WithdrawVotingRightsCall__Inputs {
  _call: WithdrawVotingRightsCall;

  constructor(call: WithdrawVotingRightsCall) {
    this._call = call;
  }

  get _numTokens(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class WithdrawVotingRightsCall__Outputs {
  _call: WithdrawVotingRightsCall;

  constructor(call: WithdrawVotingRightsCall) {
    this._call = call;
  }
}

export class ConstructorCall extends EthereumCall {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _token(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}
