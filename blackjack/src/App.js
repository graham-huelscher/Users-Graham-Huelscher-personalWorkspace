import React, { Component } from 'react';
import './App.css';
import Player from './Components/Player'


let Card = (face, suit, value) => {
  this.face = face
  this.suit = suit
  this.value = Number(value)
}

let shuffleDeck = (deck) => {
  let tempDeck = []
  while (deck.length > 0) {
    let randomCard = Math.floor(Math.random() * deck.length)
    tempDeck.push(deck.splice(randomCard, 1)[0])
  }
  return tempDeck
}

let createSixDeck = () => {
  let deck = []
  const suits = ['spades', 'hearts', 'clubs', 'diamonds']
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < suits.length; j++) {
      deck.push(new Card('A', suits[j], 11))
      deck.push(new Card('K', suits[j], 10))
      deck.push(new Card('Q', suits[j], 10))
      deck.push(new Card('J', suits[j], 10))
      for (let k = 2; k <= 10; k++) {
        deck.push(new Card(k, suits[k], k))
      }
    }
  }
  return deck
}

class App extends Component {

  state = {
    deck: this.props.firstDeck,
    dealerHand: [],
    dealerTotal: 0,
    playerHand: [],
    playerTotal: 0,
    playerChips: this.props.playerChips,
    playerCurrentBet: 0
  }


  sumHand = (hand) => {
    return hand.reduce((total, card) => total + card.value, 0)
  }

  startGame = () => {
    this.setState({
      dealerHand: this.initialDeal(),
      playerHand: this.initialDeal()
    }, () => this.setState({
      dealerTotal: this.sumHand(this.state.dealerHand),
      playerTotal: this.sumHand(this.state.playerHand)
    }))

  }

  initialDeal = () => {
    let deck = []
    deck.push(this.state.deck.pop())
    deck.push(this.state.deck.pop())
    if (this.doubleAcesCheck(deck))
      deck[0].value = 1
    return deck
  }

  doubleAcesCheck = (hand) => {
    if (this.sumHand(hand) === 22)
      return true
    else return false

  }

  playerHit = () => {
    let newPlayerHand = [...this.state.playerHand]
    newPlayerHand.push(this.state.deck.pop())
    this.setState({
      playerHand: newPlayerHand
    }, () => this.setState({
      playerTotal: this.sumHand(this.state.playerHand)
    },this.playerCheck))
  }

  playerCheck = () => {
    if (this.bustCheck(this.state.playerHand, 'player'))
      console.log('player Busts!')
  }

  playerStay = () => {
    this.dealerPlay(this.state.dealerHand, 'dealer')
  }

  bustCheck = (hand, person) => {
    let handTotal = this.sumHand(hand)
    if (handTotal > 21) {
      if (this.aceCheckWithTransformOption(true, hand, person))
        return false
      else return true
    }
    else return false
  }

  aceCheckWithTransformOption = (transformOption, hand, person) => {
    let aceIndex = this.getAceIndex(hand)
    if (aceIndex !== -1) {
      if (transformOption) this.aceTransform(aceIndex, hand, person)
      return true
    }
    else return false
  }

  getAceIndex = (hand) => {
    return hand.findIndex((card) => card.face === 'A' && card.value === 11)
  }

  aceTransform = (aceIndex, hand, person) => {
    let newHand = [...hand]
    newHand[aceIndex].value = 1
    this.setState({
      [person + 'Hand']: newHand
    }, () => this.setState({
      [person + 'Total']: this.sumHand(hand)
    }))
  }

  dealerPlay = () => {
    let hand = this.state.dealerHand
    setTimeout(() => {
      let handTotal = this.sumHand(hand)
      if (this.bustCheck(hand, 'dealer')) {
        console.log('dealer busts!')
      }
      else if (handTotal === 17 && this.aceCheckWithTransformOption(false, hand, 'dealer'))
        this.dealerHit()
      else if (handTotal < 17)
        this.dealerHit()
      else console.log('dealer stays with ' + handTotal)
    }, 1500)
  }

  dealerHit = () => {
    let newDealerHand = [...this.state.dealerHand]
    newDealerHand.push(this.state.deck.pop())
    this.setState({
      dealerHand: newDealerHand
    }, () => this.setState({
      dealerTotal: this.sumHand(this.state.dealerHand)
    }, () => this.dealerPlay()))
  }




  render() {
    return (
      <div className="App">
        <button onClick={this.startGame} type="button" className="btn btn-success">Start Game</button>
        <button onClick={this.playerHit} type="button" className="btn btn-success">Player hit</button>
        <button onClick={this.playerStay} type="button" className="btn btn-success">Player stay</button>
        <Player playerHand={this.state.playerHand} handTotal={this.state.playerTotal} />
      </div>
    );
  }
}

export default App;
