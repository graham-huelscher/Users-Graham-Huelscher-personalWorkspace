import React, { Component } from 'react';
import './App.css';
import Player from './Components/Player'
import Dealer from './Components/Dealer'
import BetForm from './Components/BetForm'


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
    startButton: true,
    deck: null,    
    playerHand: [],
    playerTotal: 0,
    playerChips: this.props.playerChips,
    playerCurrentBet: 0,
    dealerHand: [],
    dealerTotal: 0,
    dealersTurn: null
  }

  startGame = () => {
    this.setState({
      startButton: false,
      deck: shuffleDeck(createSixDeck())
    })
  }

  enoughCards = () => {
    return this.state.deck.length > 35
  }

  sumHand = (hand) => {
    return hand.reduce((total, card) => total + card.value, 0)
  }

  collectBet = (playerCurrentBet) => {
    playerCurrentBet = Number(playerCurrentBet)
    this.setState({
      playerCurrentBet
    }, this.stateInitialize)
  }

  stateInitialize = () => {
    let dealerHand = this.initialDeal()
    let dealerTotal = this.sumHand(dealerHand)
    let playerHand = this.initialDeal()
    let playerTotal = this.sumHand(playerHand)
    console.log(playerHand)
    console.log(dealerHand)
    if (this.blackJackCheck(playerTotal, dealerTotal)) {
      console.log('player has blackjack!')
      this.setState({
        playerChips: this.state.playerChips + this.state.playerCurrentBet * 1.5
      }, () => setTimeout(this.nextHand, 5000))

    }
    this.setState({
      playerHand,
      playerTotal,
      dealerHand,
      dealerTotal,
      dealersTurn: false
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

  blackJackCheck = (playerTotal, dealerTotal) => {
    if (playerTotal === 21 && dealerTotal !== 21) return true
    else return false
  }

  nextHand = () => {
    if (!this.enoughCards()) {
      this.setState({
        deck: shuffleDeck(createSixDeck())
      })
    }
    this.setState({
      playerCurrentBet: 0
    }, () => setTimeout(this.stateInitialize, 3000))
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
    let hand = this.state.playerHand
    let handTotal = this.sumHand(hand)
    let hasAnAce = this.aceCheck(hand)

    if (handTotal > 21 && hasAnAce)
      this.aceTransform(hand, 'player')
    else if (handTotal > 21 && !hasAnAce) {
      this.setState({
        playerChips: this.plusMinusChips('-')
      }, this.nextHand)
      console.log('player busts!')
    }
    else if (handTotal === 21) {
      console.log('player stays')
      this.playerStay()
    }
  }

  playerStay = () => {
    this.setState({
      dealersTurn: true
    }, this.dealerPlay)
  }

  plusMinusChips(operator) {
    return (operator === '+' ?
      this.state.playerChips + this.state.playerCurrentBet :
      this.state.playerChips - this.state.playerCurrentBet)
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
      if (person === 'dealer') {
        this.dealerPlay()
      }
    })
  }

  dealerPlay = () => {
    //ace condition not working
    let hand = [...this.state.dealerHand]
    let handTotal = this.sumHand(hand)

    setTimeout(() => {
      let hasAnAce = this.aceCheck(hand)
      if (handTotal === 17 && hasAnAce)
        this.dealerHit()
      else if (handTotal < 17)
        this.dealerHit()
      else if (handTotal > 21 && hasAnAce)
        this.aceTransform(hand, 'dealer')
      else if (handTotal > 21 && !hasAnAce) {
        console.log('dealer busts!')
        this.setState({
          playerChips: this.plusMinusChips('+')
        }, this.nextHand)
      }
      else {
        console.log('dealer stays with ' + handTotal)
        this.winCheck()
      }
    }, 1500)
  }

  dealerHit = () => {
    let newDealerHand = [...this.state.dealerHand]
    newDealerHand.push(this.state.deck.pop())
    let newDealerTotal = this.sumHand(newDealerHand)
    let hasAnAce = this.aceCheck(newDealerHand)
    if (newDealerTotal > 21 && hasAnAce) {
      this.aceTransform(newDealerHand, 'dealer')
    }
    else {
      this.setState({
        dealerHand: newDealerHand,
        dealerTotal: newDealerTotal
      }, () => {
        this.dealerPlay()
      })
    }
  }

  winCheck = () => {
    const { playerTotal, dealerTotal } = this.state
    if (playerTotal > dealerTotal) {
      console.log('player wins')
      this.setState({
        playerChips: this.plusMinusChips('+')
      }, this.nextHand)
    }
    else if (dealerTotal > playerTotal) {
      console.log('dealer wins')
      this.setState({
        playerChips: this.plusMinusChips('-')
      })
    }
    else console.log('its a tie')

    this.nextHand()
  }

  render() {
    const { playerHand, playerTotal, playerChips, playerCurrentBet, dealerHand, dealerTotal, dealersTurn } = this.state
    let visibleDealerHand = (dealersTurn ? dealerHand : dealerHand.slice(0,1))
    let visibleDealerTotal = (dealersTurn ? dealerTotal : '?')
    return (
      <div className="App">
        {this.state.startButton && <button onClick={this.startGame} type="button" className="btn btn-success">Start Game</button>}
        {!this.state.startButton && (
          <div>
            {this.state.playerCurrentBet === 0 ? <BetForm collectBet={this.collectBet} /> : <div> <button onClick={this.playerHit} type="button" className="btn btn-success">Player hit</button>
            <button onClick={this.playerStay} type="button" className="btn btn-success">Player stay</button>

            <Player
              playerHand={playerHand}
              handTotal={playerTotal}
              playerChips={playerChips}
              collectBet={this.collectBet}
              playerCurrentBet={playerCurrentBet}
            />
            <Dealer dealerHand={visibleDealerHand} handTotal={visibleDealerTotal} /> </div>}

            
          </div>)}
      </div>
    );
  }
}

export default App;
