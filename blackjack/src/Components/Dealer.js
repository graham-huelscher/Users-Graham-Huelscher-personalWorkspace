import React, { Component } from 'react';
import Hand from './Hand'
import Summary from './Summary'

class Dealer extends Component {
    render() {
        return (
            <div>
                <Hand hand={this.props.dealerHand} />
                <Summary handTotal={this.props.handTotal} />
            </div>
        )
    }
}



export default Dealer;