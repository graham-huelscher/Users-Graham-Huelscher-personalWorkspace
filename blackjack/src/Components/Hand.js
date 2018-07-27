import React, { Component } from 'react';

class Hand extends Component {
    render(){

        const cardsJSX = this.props.hand.map((card,i) => {
            return <img key={i} style={{width:'98px', height:'auto;'}} src={'./cards/7_of_clubs.png'} alt="test"/>
        })

        return (
            <div >
                {cardsJSX}
            </div>
        )
    }
}



export default Hand;