import React, { Component } from 'react';
import Hand from './Hand'
import Summary from './Summary'
import BetForm from './BetForm'

class Player extends Component {
    render() {
        return (
            <div>
            <Hand hand={this.props.playerHand} />
            <Summary handTotal={this.props.handTotal} />
            </div>
        )
    }
}



export default Player;