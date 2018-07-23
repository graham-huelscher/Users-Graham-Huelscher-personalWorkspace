import React, { Component } from 'react';
import PlayerHand from './PlayerHand'
import Summary from './Summary'

class Player extends Component {
    render() {
        return (
            <div>
            <PlayerHand playerHand={this.props.playerHand} />
            <Summary handTotal={this.props.handTotal} />
            </div>
        )
    }
}



export default Player;