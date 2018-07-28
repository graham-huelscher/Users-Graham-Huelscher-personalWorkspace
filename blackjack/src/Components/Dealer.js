import React, { Component } from 'react';
import Hand from './Hand'

class Dealer extends Component {
    render() {
        return (
            <div style={{margin: 'auto'}}>
                <Hand hand={this.props.dealerHand} />
            </div>
        )
    }
}



export default Dealer;