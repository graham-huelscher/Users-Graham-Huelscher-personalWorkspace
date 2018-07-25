import React, { Component } from 'react';

class BetForm extends Component {
    render() {
        return (
            <form onSubmit={(e) => {
                e.preventDefault()
                this.props.collectBet(e.target.bet.value)
                e.target.bet.value = ''
            }}>
                <div className="input-group">
                    <span className="input-group-btn">
                        <button type="submit" className="btn btn-warning">Place bet</button>
                    </span>
                    <input defaultValue={500} type="number" step="500" className="form-control" name='bet' required placeholder="Enter your bet, incements of 500 only" autoComplete="off" />
                </div>
            </form>
        )
    }
}



export default BetForm;