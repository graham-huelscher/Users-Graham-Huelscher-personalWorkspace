import React, { Component } from 'react';
import PlayerHand from './PlayerHand'

class PlayerBoard extends Component {
    render(){
        return (
            <PlayerHand playerHand={this.props.playerHand} />

        )
    }
}



export default PlayerBoard;