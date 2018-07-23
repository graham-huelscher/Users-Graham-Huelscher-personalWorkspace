import React, { Component } from 'react';

class PlayerHand extends Component {
    render(){

        const cardsJSX = this.props.playerHand.map((card,i) => {
            return <p>{card.face}</p>
        })
        console.log(cardsJSX)

        return (
            <div>
                {cardsJSX}
            </div>
        )
    }
}



export default PlayerHand;