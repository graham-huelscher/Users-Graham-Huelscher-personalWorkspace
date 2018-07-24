import React, { Component } from 'react';

class Hand extends Component {
    render(){

        const cardsJSX = this.props.hand.map((card,i) => {
            return <span key={i}>{card.face}</span>
        })

        return (
            <span>
                {cardsJSX}
            </span>
        )
    }
}



export default Hand;