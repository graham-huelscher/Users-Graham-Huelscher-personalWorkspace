import React, { Component } from 'react';
import './App.css';
import Player from './Components/Player'
import Dealer from './Components/Dealer'


function Card(face, suit, value) {
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
    dealerBust: false,
    playerHand: [],
    playerTotal: 0,
    playerChips: this.props.playerChips,
    playerCurrentBet: 0,
    playerBust: false
  }

  stillEnoughCards = () => {
    return this.state.deck.length < 35
  }

  sumHand = (hand) => {
    return hand.reduce((total, card) => total + card.value, 0)
  }

  stateInitialize = () => {
    let a = new Card('A', 'h', 11)
    let b = new Card('6', 'h', 6)
    let dealerHand = [a, b]
    let playerHand = this.initialDeal()
    this.setState({
      dealerHand,
      dealerBust: false,
      dealerTotal: this.sumHand(dealerHand),
      playerHand,
      playerBust: false,
      playerTotal: this.sumHand(playerHand)
    })
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

  nextHand = () => {
    if (this.stillEnoughCards()) {
      this.setState({
        deck: shuffleDeck(createSixDeck())
      })
    }
    this.stateInitialize()
  }

  playerHit = () => {
    let newPlayerHand = [...this.state.playerHand]
    newPlayerHand.push(this.state.deck.pop())
    this.setState({
      playerHand: newPlayerHand,
      playerTotal: this.sumHand(newPlayerHand)
    }, this.playerCheck)
  }

  playerCheck = () => {
    if (this.bustCheck(this.state.playerHand, 'player')) {
      this.setState({
        playerResult: 'bust',
        playerChips: this.state.playerChips - this.state.playerCurrentBet
      }, this.nextHand)
      console.log('player Busts!')
    }
  }

  playerStay = () => {
    this.dealerPlay(this.state.dealerHand, 'dealer')
  }

  bustCheck = (hand, person) => {
    // let handTotal = this.sumHand(hand)
    // if (handTotal > 21) {
    //   if (this.aceCheckWithTransformOption(true, hand, person))
    //     return false
    //   else return true
    // }
    // else return false
  }

  aceCheck = (hand) => {
    let aceIndex = this.getAceIndex(hand)
    if (aceIndex === -1) return false
    else return true
  }

  getAceIndex = (hand) => {
    return hand.findIndex((card) => card.face === 'A' && card.value === 11)
  }

  aceTransform = (hand, person) => {
    let aceIndex = this.getAceIndex(hand)
    let newHand = [...hand]
    newHand[aceIndex].value = 1
    this.setState({
      [person + 'Hand']: newHand,
      [person + 'Total']: this.sumHand(newHand)
    }, () => {
      if(person === 'dealer'){
        this.dealerHit()
      }
    })
  }

  dealerPlay = () => {
    //ace condition not working
    let hand = this.state.dealerHand
    let handTotal = this.sumHand(hand)
    setTimeout(() => {

      console.log('DealerPlay__')
      console.log(hand)
      console.log(handTotal)


      //let bust = this.bustCheck(hand, 'dealer')
      console.log(this.aceCheckWithTransformOption(false, hand, 'dealer'))
      if (handTotal === 17 && this.aceCheck(hand))
        this.dealerHit()
      else if (handTotal < 17)
        this.dealerHit()
      else if (handTotal > 21 && this.aceCheck(hand)) {
        this.aceTransform(hand, 'dealer')
        let aceIndex = this.getAceIndex(hand)
        let newHand = [...hand]
        newHand[aceIndex].value = 1
        this.setState({
          ['dealerHand']: newHand,
          ['dealerTotal']: this.sumHand(newHand)
        }, ()=>this.dealerPlay())
        console.log('dealer busts!')
      }
      else console.log('dealer stays with ' + handTotal)
    }, 1500)
  }

  dealerHit = () => {
    let newDealerHand = [...this.state.dealerHand]
    newDealerHand.push(this.state.deck.pop())
    this.setState({
      dealerHand: this.sumHand(newDealerHand),
      dealerTotal: 
    }, () => {
      console.log('dealerHit__________________')
      console.log(this.state.dealerHand)
      console.log(this.state.dealerTotal)
      this.dealerPlay()
    })
  }

  // dealerPlay = () => {
  //   //ace condition not working
  //   let hand = this.state.dealerHand
  //   let handTotal = this.sumHand(hand)
  //   setTimeout(() => {
  //     console.log('dealerPlay_________________________')
  //     console.log(hand)
  //     console.log(handTotal)
  //     let bust = this.bustCheck(hand, 'dealer')

  //     if (handTotal === 17 && this.aceCheckWithTransformOption(false, hand, 'dealer'))
  //       this.dealerHit()
  //     else if (handTotal < 17)
  //       this.dealerHit()
  //     else if (bust) {
  //         console.log('dealer busts!')
  //     }
  //     else console.log('dealer stays with ' + handTotal)
  //   }, 1500)
  // }

  // dealerHit = () => {
  //   let newDealerHand = [...this.state.dealerHand]
  //   newDealerHand.push(this.state.deck.pop())
  //   this.setState({
  //     dealerHand: newDealerHand,
  //     dealerTotal: this.sumHand(newDealerHand)
  //   }, () => { 
  //     console.log('dealerHit__________________')
  //     console.log(this.state.dealerHand)
  //     console.log(this.state.dealerTotal)
  //     this.dealerPlay()
  //   })
  // }

  // winCheck = () => {
  //   {playerBust}
  //   if(!this.state.playerBust && !this.state.dealerBust){
  //     if(thi)
  //   }
  // }

  render() {
    return (
      <div className="App">
        <button onClick={this.stateInitialize} type="button" className="btn btn-success">Start Game</button>
        <button onClick={this.playerHit} type="button" className="btn btn-success">Player hit</button>
        <button onClick={this.playerStay} type="button" className="btn btn-success">Player stay</button>
        <Player playerHand={this.state.playerHand} handTotal={this.state.playerTotal} />
        <Dealer dealerHand={this.state.dealerHand} handTotal={this.state.dealerTotal} />
      </div>
    );
  }
}

export default App;
