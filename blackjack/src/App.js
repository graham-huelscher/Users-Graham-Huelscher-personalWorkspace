import React, { Component } from 'react';
import './App.css';
import PlayerBoard from './Components/PlayerBoard'

class App extends Component {
  state = {
    deck: this.props.shuffleDeck(this.props.createDeck()),
    dealerHand: [],
    dealerTotal: 0,
    playerHand: [],
    playerTotal: 0,
    playerChips: this.props.playerChips
  }

  Card = (face, suit, value) => {
    this.face = face
    this.suit = suit
    this.value = Number(value)
}

  initialDeal = () => {
    this.state.dealerHand.push(new this.Card('2', 'h', 2))
    this.state.dealerHand.push(new this.Card('2', 'h', 2))
    this.dealer.doubleAcesCheck()
    this.dealer.handTotal = this.dealer.sumHand()



    this.player.hand.push(this.dealer.deal())
    this.player.hand.push(this.dealer.deal())
    this.player.handTotal = this.player.sumHand()
    console.log(this.player.hand)
}

  render() {
    const { dealerPlay } = this.props.game
    return (
      <div className="App">
        <button onClick={this.initialDeal} type="button" className="btn btn-success">Start Game</button>
        <button onClick={dealerPlay} type="button" className="btn btn-success">Dealer play</button>
        <button onClick={this.props.game.dealer.hit} type="button" className="btn btn-success">Give dealer a card</button>
        <button onClick={this.props.game.playerHit} type="button" className="btn btn-success">Player hit</button>
        <button onClick={this.props.game.playerStay} type="button" className="btn btn-success">Player stay</button>
        <PlayerBoard playerHand={this.props.game.player.hand} />
      </div>
    );
  }
}

export default App;
