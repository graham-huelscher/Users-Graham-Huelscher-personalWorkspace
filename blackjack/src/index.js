import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

function Card(face, suit, value) {
    this.face = face
    this.suit = suit
    this.value = Number(value)
}

class Person {
    hand = []
    handTotal = 0
    aceCheckWithTransformOption = (transformOption) => {
        let aceIndex = this.getAceIndex()
        if (aceIndex !== -1) {
            if(transformOption) this.aceTransform(aceIndex)
            else return true
        }
        else return false
    }
    aceTransform = (aceIndex) => {
        this.hand[aceIndex].value = 1
    }
    getAceIndex = () => {
        return this.hand.findIndex((card) => card.face === 'A' && card.value === 11)
    }
    sumHand = () => {
        return this.hand.reduce((total, card) => total + card.value, 0)
    }

    addCard = (card) => {
        this.hand.push(card)
    }

    doubleAcesCheck = () => {
        if (this.sumHand() === 22) {
            this.hand[0].value = 1
            return true
        }
        else return false
    }

    handCheck = () => {
        let handBusted = true
        this.handTotal = this.sumHand()
        if (this.handTotal > 21) {
            if (this.aceCheckWithTransformOption(true)) {
                this.handTotal = this.sumHand()
                handBusted = false
            }
            else {
                console.log('handOver')
            }
        }
        else handBusted = false
        return handBusted
    }

}

class Player extends Person {
    constructor(chips) {
        super()
        this.chips = chips
        this.currentBet = 0
    }
}

class Dealer extends Person {
    constructor(deck) {
        super()
        this.deck = this.shuffleDeck(deck)
    }

    deal = () => {
        return this.deck.pop()
    }

    shuffleDeck = (deck) => {
        let tempDeck = []
        while (deck.length > 0) {
            let randomCard = Math.floor(Math.random() * deck.length)
            tempDeck.push(deck.splice(randomCard, 1)[0])
        }
        return tempDeck
    }

    play = () => {
        setTimeout(() => {
            let playAgain = false
            this.handTotal = this.sumHand()
            console.log(this.handTotal)
            if (this.handCheck());
            else if (this.handTotal === 17 && this.aceCheckWithTransformOption(false)){
                this.hit()
                playAgain = true
            }
            else if (this.handTotal < 17){
                this.hit()
                playAgain = true
            }
            else console.log('dealer stays with ' + this.handTotal)

            if(playAgain){
                this.play()
            }

        }, 1500)
    }

    hit = () => {
        this.addCard(this.deal())
        console.log(this.hand)
    }


}

class Game {
    dealer = new Dealer(createDeck())
    player = new Player(10000)

    initialDeal = () => {
        this.dealer.hand.push(new Card('2', 'h', 2))
        this.dealer.hand.push(new Card('2', 'h', 2))
        this.dealer.doubleAcesCheck()
        this.dealer.handTotal = this.dealer.sumHand()



        this.player.hand.push(this.dealer.deal())
        this.player.hand.push(this.dealer.deal())
        this.player.handTotal = this.player.sumHand()
        console.log(this.player.hand)
    }

    playerHit = () => {
        this.player.addCard(this.dealer.deal())
        console.log(this.player.hand)
        let playerHandBusted = this.player.handCheck()
        console.log(this.player.handTotal)
    }

    playerStay = () => {
        this.dealer.play()
    }


}

let game = new Game()





let shuffleDeck = (deck) => {
    let tempDeck = []
    while (deck.length > 0) {
        let randomCard = Math.floor(Math.random() * deck.length)
        tempDeck.push(deck.splice(randomCard, 1)[0])
    }
    return tempDeck
}

  let createDeck = () => {
    let deck = []
    const suits = ['spades', 'hearts', 'clubs', 'diamonds']
    for (let i = 0; i < suits.length; i++) {
        deck.push(new Card('A', suits[i], 11))
        deck.push(new Card('K', suits[i], 10))
        deck.push(new Card('Q', suits[i], 10))
        deck.push(new Card('J', suits[i], 10))
        for (let j = 2; j <= 10; j++) {
            deck.push(new Card(j, suits[i], j))
        }
    }
    return deck
}

ReactDOM.render(<App game={game} shuffleDeck={shuffleDeck} createDeck={createDeck} />, document.getElementById('root'));
registerServiceWorker();
