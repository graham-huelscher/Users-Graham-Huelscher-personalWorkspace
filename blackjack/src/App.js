import React, { Component } from 'react';
import './App.css';
import Player from './Components/Player'
import Dealer from './Components/Dealer'
import BetForm from './Components/BetForm'
import ChipSummary from './Components/ChipSummary'
import { DeckFunctions, HelperFunctions } from './helpers'

const { shuffleDeck, createSixDeck } = DeckFunctions
const { sumHand, doubleAcesCheck, blackJackCheck, aceCheck, getAceIndex } = HelperFunctions




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

  collectBet = (playerCurrentBet) => {
    playerCurrentBet = Number(playerCurrentBet)
    this.setState({
      playerCurrentBet
    }, this.stateInitialize)
  }

  stateInitialize = () => {
    let dealerHand = this.initialDeal()
    let dealerTotal = sumHand(dealerHand)
    let playerHand = this.initialDeal()
    let playerTotal = sumHand(playerHand)
    console.log(playerHand)
    console.log(dealerHand)
    if (blackJackCheck(playerTotal, dealerTotal)) {
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
    if (doubleAcesCheck(deck))
      deck[0].value = 1
    return deck
  }

  nextHand = () => {
    if (!this.enoughCards()) {
      this.setState({
        deck: shuffleDeck(createSixDeck())
      })
    }
    setTimeout(() => this.setState({
      playerCurrentBet: 0
    }), 2000)
  }

  playerHit = () => {
    let newPlayerHand = [...this.state.playerHand]
    newPlayerHand.push(this.state.deck.pop())
    this.setState({
      playerHand: newPlayerHand,
      playerTotal: sumHand(newPlayerHand)
    }, this.playerCheck)
  }

  playerCheck = () => {
    let hand = this.state.playerHand
    let handTotal = sumHand(hand)
    let hasAnAce = aceCheck(hand)

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

  aceTransform = (hand, person) => {
    let aceIndex = getAceIndex(hand)
    let newHand = [...hand]
    newHand[aceIndex].value = 1
    this.setState({
      [person + 'Hand']: newHand,
      [person + 'Total']: sumHand(newHand)
    }, () => {
      if (person === 'dealer') {
        this.dealerPlay()
      }
    })
  }

  dealerPlay = () => {
    let hand = [...this.state.dealerHand]
    let handTotal = sumHand(hand)

    setTimeout(() => {
      let hasAnAce = aceCheck(hand)
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
    let newDealerTotal = sumHand(newDealerHand)
    let hasAnAce = aceCheck(newDealerHand)
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
      })
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
    let visibleDealerHand = (dealersTurn ? dealerHand : dealerHand.slice(0, 1))
    let visibleDealerTotal = (dealersTurn ? dealerTotal : '?')
    return (
      <div className="App">
        {this.state.startButton && <button onClick={this.startGame} type="button" className="btn btn-success">Start Game</button>}


        {!this.state.startButton && (
          <div className='container'>
            {this.state.playerCurrentBet === 0 ?
              <div>
                <BetForm collectBet={this.collectBet} />
              </div> :
              <div>
                <div className="row dealer-row">
                  <Dealer dealerHand={visibleDealerHand} handTotal={visibleDealerTotal} />
                </div>
                <div className="row">
                  <h1 className="message-area">This is where the messages go</h1>
                </div>
                <div className="row player-row">
                  <div className="row">
                    <div>
                      <button onClick={this.playerHit} type="button" className="btn btn-success">Player hit</button>
                      <button onClick={this.playerStay} type="button" className="btn btn-success">Player stay</button>
                    </div>
                  </div>
                  <Player
                    playerHand={playerHand}
                    handTotal={playerTotal}
                    playerChips={playerChips}
                    collectBet={this.collectBet}
                    playerCurrentBet={playerCurrentBet}
                  />

                  <ChipSummary playerChips={this.state.playerChips} playerCurrentBet={this.state.playerCurrentBet} />
                </div>
              </div>}


          </div>)}




      </div>
    );
  }
}

export default App;
