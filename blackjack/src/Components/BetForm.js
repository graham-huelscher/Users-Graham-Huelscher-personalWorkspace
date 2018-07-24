import React, { Component } from 'react';

class BetForm extends Component {
    render() {
        return (
            <form onSubmit={(e) => {
                e.preventDefault()
                this.props.collectBet(e.target.text.value)
                e.target.text.value = ''
            }}>
                <div className="input-group">
                    <span className="input-group-btn">
                        <button type="submit" className="btn btn-warning">Place bet</button>
                    </span>
                    <input type="number" step="500" className="form-control" name="text" required placeholder="Enter your bet, incements of 500 only" autoComplete="off" />
                </div>
            </form>
        )
    }
}



export default BetForm;