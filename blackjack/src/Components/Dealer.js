import React, { Component } from 'react';
import Hand from './Hand'

class Dealer extends Component {
    render() {
        return (
            <div>
                {this.props.handTotal}
                <Hand hand={this.props.dealerHand} />
            </div>
        )
    }
}



export default Dealer;