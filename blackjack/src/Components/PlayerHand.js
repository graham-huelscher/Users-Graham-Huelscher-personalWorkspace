import React, { Component } from 'react';

class PlayerHand extends Component {
    render(){

        const cardsJSX = this.props.playerHand.map((card,i) => {
            return <p key={i}>{card.face}</p>
        })

        return (
            <div>
                {cardsJSX}
            </div>
        )
    }
}



export default PlayerHand;