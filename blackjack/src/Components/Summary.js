import React, { Component } from 'react';

class Summary extends Component {
    render() {
        const { handTotal, playerChips, playerCurrentBet } = this.props
        return (
            <div>
                <div>Sum of cards is:  {handTotal} </div>
                {playerChips && <div> Total chip count is: {playerChips} </div>}
                {playerCurrentBet && <div> Current bet is: {playerCurrentBet} </div> }
            </div>
        )
    }
}



export default Summary;