import React, { Component } from 'react';


class ActiveGame extends Component {
    state = {

    }
    render() {
        const { playerHit, playerStay, collectBet, playerHand, playerTotal, playerChips, playerCurrentBet, dealerHand, dealerTotal } = this.props
        return (
            <div>
                <BetForm collectBet={collectBet} />


                <button onClick={playerHit} type="button" className="btn btn-success">Player hit</button>
                <button onClick={playerStay} type="button" className="btn btn-success">Player stay</button>
                
                <Player
                    playerHand={playerHand}
                    handTotal={playerTotal}
                    playerChips={playerChips}
                    collectBet={this.collectBet}
                    playerCurrentBet={playerCurrentBet}
                />
                <Dealer dealerHand={dealerHand} handTotal={dealerTotal} />
            </div>
        )
    }
}



export default ActiveGame;