import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

    function Card (face, suit, value) {
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
          deck.push(new Card(k, suits[j], k))
        }
      }
    }
    return deck
  }

  let firstDeck = shuffleDeck(createSixDeck())

ReactDOM.render(<App  firstDeck={firstDeck}/>, document.getElementById('root'));
registerServiceWorker();
