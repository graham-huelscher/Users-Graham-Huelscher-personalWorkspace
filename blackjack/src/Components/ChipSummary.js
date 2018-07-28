import React, { Component } from 'react';

class ChipSummary extends Component {
    render() {
        const {playerChips, playerCurrentBet } = this.props
        return (
            <div className='chipSummary'>
                <div> Total chip count is: {playerChips} </div>
                <div> Current bet is: {playerCurrentBet} </div>
            </div>
        )
    }
}



export default ChipSummary;