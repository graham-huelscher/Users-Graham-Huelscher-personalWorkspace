import React, { Component } from 'react';
import Hand from './Hand'

class Player extends Component {
    render() {
        const { playerHand, handTotal} = this.props
        return (
            <div>
                <Hand hand={playerHand} />
                <div>{handTotal}</div>
            </div>
        )
    }
}



export default Player;