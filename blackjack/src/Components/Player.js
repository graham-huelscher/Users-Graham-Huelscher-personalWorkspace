import React, { Component } from 'react';
import Hand from './Hand'
import Summary from './Summary'

class Player extends Component {
    render() {
        const { playerHand, handTotal, playerChips, playerCurrentBet } = this.props
        return (
            <div>
                <Hand hand={playerHand} />
                <Summary handTotal={handTotal} playerChips={playerChips} playerCurrentBet={playerCurrentBet} />
            </div>
        )
    }
}



export default Player;