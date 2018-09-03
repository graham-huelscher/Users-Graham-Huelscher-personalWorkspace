import React, { Component } from 'react';
import SongCard from './SongCard'

class SongsList extends Component {
    render() {

        let songListJSX = this.props.songs.map((song) => {
            let cardColor = 'border-primary'
            let buttonColor = 'btn-outline-success'
            let linkColor = {}
            
            if(song.isSelected && this.props.isCurrentlyPlayingSong){
                cardColor = 'bg-primary'
                buttonColor = 'btn-success'
                linkColor = {color: 'black'}
            }
            else if(song.isSelected){
                cardColor = 'bg-secondary'
            }


            return (
                <SongCard key={song.id} {...song} {...this.props} cardColor={cardColor} buttonColor={buttonColor} linkColor={linkColor} />
            )
        })
        return (
            <div className='card-deck'>
                {songListJSX}
            </div>
        )
    }
}

export default SongsList;