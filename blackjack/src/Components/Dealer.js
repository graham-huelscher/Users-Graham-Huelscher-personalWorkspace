import React, { Component } from 'react';

class Dealer extends Component {
    state = {
        hand: [],
        handTotal: 0
    }
    render() {
        return (
            <PlayerHand playerHand={this.props.playerHand} />

        )
    }
}



export default Player;