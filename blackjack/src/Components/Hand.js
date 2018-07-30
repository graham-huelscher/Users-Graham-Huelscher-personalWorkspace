import React, { Component } from 'react';

class Hand extends Component {
    render() {
        let cardStyle = {
            width: '150px',
            height: 'auto',
            margin: '0px 10px',
        }
        const cardsJSX = this.props.hand.map((card, i) => {
            let transformClass = ''
            if(card.doubleDown) transformClass = 'double-down'
            return <img className={transformClass + ' img-fluid'} key={i} style={cardStyle} src={'./cards/' + card.face + '-' + card.suit + '.svg'} alt="test" />
            
        })

        return (
            <div>
                {cardsJSX}
                {(this.props.hand.length === 1 ? <img style={{
                    width: '150px',
                    height: 'auto',
                    margin: '0px 10px',
                    borderRadius: '8px'
                }} src={'./cards/card-back.svg'} alt="test" /> : '')}
            </div>
        )
    }
}



export default Hand;