import React, { Component } from 'react';
import Hand from './Hand'

class Player extends Component {
    render() {
        const { playerHand } = this.props
        return (
            <div style={{margin: 'auto'}}>
                <Hand hand={playerHand} />
            </div>
        )
    }
}



export default Player;