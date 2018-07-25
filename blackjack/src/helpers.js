function Card(face, suit, value) {
    this.face = face
    this.suit = suit
    this.value = Number(value)
}

let DeckFunctions = {
    shuffleDeck: (deck) => {
        let tempDeck = []
        while (deck.length > 0) {
            let randomCard = Math.floor(Math.random() * deck.length)
            tempDeck.push(deck.splice(randomCard, 1)[0])
        }
        return tempDeck
    },
    createSixDeck: () => {
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
}

let HelperFunctions = {
    sumHand: (hand) => {
        return hand.reduce((total, card) => total + card.value, 0)
    },
    doubleAcesCheck: (hand) => {
        if (HelperFunctions.sumHand(hand) === 22)
            return true
        else return false
    },
    blackJackCheck: (playerTotal, dealerTotal) => {
        if (playerTotal === 21 && dealerTotal !== 21) return true
        else return false
    },
    aceCheck: (hand) => {
        let aceIndex = HelperFunctions.getAceIndex(hand)
        if (aceIndex === -1) return false
        else return true
    },
    getAceIndex: (hand) => {
        return hand.findIndex((card) => card.face === 'A' && card.value === 11)
    }

}

export { DeckFunctions, HelperFunctions }