import React, { Component } from 'react';
import Hand from './Hand'

class Dealer extends Component {
    render() {
        return (
            <div>
                <Hand hand={this.props.dealerHand} />
                <div>{this.props.handTotal} </div>
            </div>
        )
    }
}



export default Dealer;