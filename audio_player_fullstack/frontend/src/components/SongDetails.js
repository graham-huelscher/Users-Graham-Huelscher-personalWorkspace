import React, { Component } from 'react';

class SongDetails extends Component {

    render() {
        let songIdSplit = this.props.match.params.songId.split('-')
        const songId = songIdSplit[1]

        const songs = this.props.songs

        let song = songs.find(song => (song.id === Number(songId)))
        let album = song.source.split('/')[2]

        return (
            <div className="row">
                <div className="col-md-4">
                    <img className='img-fluid' src={song.album} alt='' />
                    <button onClick={() => this.props.changeSong(song.id)} type="button" className="btn-success btn play-button-details">
                    Play
                </button>
                </div>
                <div className="col-md-8">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Artist</th>
                                <td>{song.artist}</td>
                            </tr>
                            <tr>
                                <th scope="row">Song Title</th>
                                <td>{song.title}</td>
                            </tr>
                            <tr>
                                <th scope="row">Album</th>
                                <td>{album}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default SongDetails;