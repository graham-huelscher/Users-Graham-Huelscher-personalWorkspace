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
    dealersTurn: null,
    message: `Player's turn`
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
    if (blackJackCheck(playerTotal, dealerTotal)) {
      this.setMessage('Player has blackjack!')
      this.setState({
        dealersTurn: true,
        playerChips: this.state.playerChips + this.state.playerCurrentBet * 1.5
      }, () => setTimeout(this.nextHand, 5000))

    }
    else
    this.setState({
      playerHand,
      playerTotal,
      dealerHand,
      dealerTotal,
      dealersTurn: false,
      message: `Player's turn`
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
    }), 4000)
  }

  playerHit = (isDoubleDown) => {
    let newPlayerHand = [...this.state.playerHand]
    let newCard = this.state.deck.pop()
    if(isDoubleDown) newCard.doubleDown = true;
    newPlayerHand.push(newCard)
    this.setState({
      playerHand: newPlayerHand,
      playerTotal: sumHand(newPlayerHand)
    }, () => this.playerCheck(isDoubleDown))
  }

  playerCheck = (isDoubleDown) => {
    let hand = this.state.playerHand
    let handTotal = sumHand(hand)
    let hasAnAce = aceCheck(hand)

    if (handTotal > 21 && hasAnAce)
      this.aceTransform(hand, 'player')
    else if (handTotal > 21 && !hasAnAce) {
      this.setState({
        playerChips: this.plusMinusChips('-')
      }, this.nextHand)
      this.setMessage(`Player busts! Player loses ${this.state.playerCurrentBet} chips`)
    }
    else if (handTotal === 21) {
      this.playerStay()
    }
    else if(isDoubleDown){
      this.playerStay()
    }
  }

  playerStay = () => {
    this.setState({
      dealersTurn: true
    }, this.dealerPlay)
    this.setMessage(`Dealer's turn`)
  }

  playerDoubleDown = () => {
    this.setState({
      playerCurrentBet: this.state.playerCurrentBet*2
    })
    this.playerHit(true)
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
        this.setMessage(`Dealer busts! Player wins ${this.state.playerCurrentBet} chips`)
        this.setState({
          playerChips: this.plusMinusChips('+')
        }, this.nextHand)
      }
      else {
        this.setMessage('Dealer stays with ' + handTotal)
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
    setTimeout(() => {
      const { playerTotal, dealerTotal } = this.state
      if (playerTotal > dealerTotal) {
        this.setMessage(`Player wins! ${this.state.playerCurrentBet} chips added.`)
        this.setState({
          playerChips: this.plusMinusChips('+')
        })
      }
      else if (dealerTotal > playerTotal) {
        this.setMessage(`Player loses. ${this.state.playerCurrentBet} chips lost.`)
        this.setState({
          playerChips: this.plusMinusChips('-')
        })
      }
      else this.setMessage(`It's a push.`)

      this.nextHand()
    }, 2000);
  }

  setMessage = (message) => {
    this.setState({
      message
    })
  }

  render() {
    const { playerHand, playerTotal, playerChips, playerCurrentBet, dealerHand, dealersTurn } = this.state
    let visibleDealerHand = (dealersTurn ? dealerHand : dealerHand.slice(0, 1))

    return (
      <div className="App">
        {this.state.startButton && <button onClick={this.startGame} type="button" className="btn btn-success centralize">Start Game</button>}


        {!this.state.startButton && (
          this.state.playerCurrentBet === 0 ?
            <div className='container'>
              <div className='centralize'>
                <h3>Place bet for the next hand</h3>
              </div>
              <div className='bet'>
                <BetForm collectBet={this.collectBet} />
              </div>
              <div>
                <h5>Current chip count: {this.state.playerChips} </h5>
              </div>
            </div> :
            <div className='container'>
              <div className='row'>
                <h1>Dealer's Cards</h1>
              </div>
              <div className="row dealer-row">
                <Dealer dealerHand={visibleDealerHand}/>
              </div>
              <div className="row">
                <h1 className="message-area"><strong>{this.state.message}</strong></h1>
              </div>
              <div className='row player-box'>
                <div className='col-12 col-sm-12 col-md-12 col-lg-12'>
                  <div className='row player-info'>
                    <button onClick={() => this.playerHit(false)} type="button" className="btn btn-success game-btn">HIT</button>
                    <button onClick={this.playerStay} type="button" className="btn btn-danger game-btn">STAY</button>
                    <button onClick={this.playerDoubleDown} type="button" className="btn btn-warning game-btn">DOUBLE</button>

                    <div className='hand-total'>
                      <h3> Hand total is: {sumHand(this.state.playerHand)} </h3>
                    </div>

                    <ChipSummary playerChips={this.state.playerChips} playerCurrentBet={this.state.playerCurrentBet} />
                  </div>
                </div>

                <Player
                  playerHand={playerHand}
                  handTotal={playerTotal}
                  playerChips={playerChips}
                  collectBet={this.collectBet}
                  playerCurrentBet={playerCurrentBet}
                />
              </div>
            </div>)
        }
      </div>
    );
  }
}

export default App;
