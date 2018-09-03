import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios'
import SongsList from './SongsList';
import SongDetails from './SongDetails';
import NavBar from './NavBar'
import '../App.css';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStepBackward, faPlay, faPause, faStepForward, faVolumeDown, faVolumeUp } from '@fortawesome/free-solid-svg-icons'

const Handle = Slider.Handle;
library.add(faStepBackward, faPause, faPlay, faStepForward, faVolumeDown, faVolumeUp)

function Song(source, title, id, album, artist) {
  this.source = source;
  this.title = title;
  this.id = id;
  this.isSelected = false;
  this.album = album;
  this.artist = artist
}


let songs = [
  new Song('/music/Beauty-Behind-the-Madness/01-Real-Life.mp3', 'Real Life', 0, '../albums/beauty-behind-the-madness.jpg', 'The Weeknd')
]

class App extends Component {
  state = {
    currentSongIndex: 0,
    isCurrentlyPlayingSong: false,
    songDuration: null,
    currentTime: '0:00',
    currentPosition: 0,
    mouseHolding: false,
    songs: songs
  }

  componentDidMount() {
    axios.get('/songs')
      .then((response) => {
        this.setState({
          songs: response.data.songs
      })})
      .catch((err) => {
        console.log(err)
      })
  }

  updateStateCurrentSongIndex = (currentSongIndex) => {
    let newSongs = [...this.state.songs]
    newSongs[this.state.currentSongIndex].isSelected = false
    newSongs[currentSongIndex].isSelected = true

    this.setState({
      songs: newSongs,
      currentSongIndex
    }, () => {
      this.audio.load()
      this.state.isCurrentlyPlayingSong ? this.play() : this.pause()
    })
  }

  getDuration = (e) => {
    this.setState({
      songDuration: e.target.duration
    })
  }

  changeSong = (id) => {
    let newSongId = this.state.songs.find(song => (song.id === id)).id
    this.setState({
      isCurrentlyPlayingSong: true
    })
    this.updateStateCurrentSongIndex(newSongId)
  }

  previous = () => {
    this.updateStateCurrentSongIndex(this.state.currentSongIndex - 1)
  }

  play = () => {
    this.audio.play()
    this.setState({
      isCurrentlyPlayingSong: true
    })
  }

  pause = () => {
    this.audio.pause()
    this.setState({
      isCurrentlyPlayingSong: false
    })
  }

  next = () => {
    this.updateStateCurrentSongIndex(this.state.currentSongIndex + 1)
  }

  handle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
      <Tooltip
        prefixCls="rc-slider-tooltip"
        overlay={value}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </Tooltip>
    )
  }

  songPosition = (time) => {

    let minutes = Math.floor(time / 60)
    let seconds = String(Math.round(time - minutes * 60))
    if (seconds.length === 1)
      seconds = '0' + seconds
    else if (seconds.length === 0)
      seconds = '00'

    this.setState({
      currentTime: minutes + ':' + seconds,
      currentPosition: time
    })
  }

  mouseReleaseOnSong = () => {
    this.audio.currentTime = this.state.currentPosition
    this.setState({
      mouseHolding: false
    })
  }

  volumeChange = (volumeValue) => {
    volumeValue = volumeValue / 100
    this.audio.volume = volumeValue
  }

  updateCurrentTime = () => {
    if (!this.state.mouseHolding) {
      let time = this.audio.currentTime
      let minutes = Math.floor(time / 60)
      let seconds = String(Math.round(time - minutes * 60))
      if (seconds.length === 1)
        seconds = '0' + seconds
      else if (seconds.length === 0)
        seconds = '00'

      this.setState({
        currentTime: minutes + ':' + seconds,
        currentPosition: this.audio.currentTime
      })
    }
  }

  disableTimeUpdate = () => {
    this.setState({
      mouseHolding: true
    })
  }

  render() {
    const { songs } = this.state
    
    const minutes = Math.floor(this.state.songDuration / 60)
    let seconds = String(Math.round(this.state.songDuration - minutes * 60))
    if (seconds.length === 1)
      seconds = '0' + seconds
    else if (seconds.length === 0)
      seconds = '00'

    return (
      <div className="App">
        <NavBar />
        <div className='container'>

          <Switch>
            <Route exact path="/" render={() => <SongsList isCurrentlyPlayingSong={this.state.isCurrentlyPlayingSong} songs={songs} changeSong={this.changeSong} />} />
            <Route path='/:songId' render={(props) => <SongDetails {...props} songs={songs} changeSong={this.changeSong}/>} />
          </Switch>

        </div>

        <div className='song-play-bar'>

          <div className='play-bar-left'>
            <div className='play-bar-album'>
              <img style={{ height: '60px' }} src={songs[this.state.currentSongIndex].album} alt='album cover' className='play-bar-album' />
            </div>
            <div className='play-bar-info'>
              <h6>{songs[this.state.currentSongIndex].title}</h6>
              <div>
                {songs[this.state.currentSongIndex].artist}
              </div>
            </div>
          </div>


          <div className='play-bar-center'>
            <div className='button-controls'>
              <audio onTimeUpdate={this.updateCurrentTime} onLoadedMetadata={e => { this.getDuration(e) }} ref={audio => this.audio = audio}>
                <source src={'..' + songs[this.state.currentSongIndex].source} />
              </audio>

              <button className="btn btn-secondary btn-sm" onClick={this.previous} disabled={this.state.currentSongIndex === 0}><FontAwesomeIcon icon='step-backward' /></button>
              {(!this.state.isCurrentlyPlayingSong ?
                <button className='btn btn-success btn-sm' onClick={this.play}><FontAwesomeIcon icon="play" /></button> :
                <button className='btn btn-danger btn-sm' onClick={this.pause}><FontAwesomeIcon icon="pause" /></button>)}
              <button className="btn btn-secondary btn-sm" onClick={this.next} disabled={this.state.currentSongIndex === this.state.songs.length - 1} ><FontAwesomeIcon icon='step-forward' /></button>
            </div>

            <div className='song-scrubber'>
              {this.state.currentTime}
              <Slider min={0} max={Math.floor(this.state.songDuration)} value={this.state.currentPosition} defaultValue={0} onBeforeChange={this.disableTimeUpdate} onAfterChange={this.mouseReleaseOnSong} onChange={(value) => this.songPosition(value)} />
              {minutes + ':' + seconds}
            </div>
          </div>


          <div className='play-bar-right'>
            <div className='volume-icon'>
              <FontAwesomeIcon icon='volume-down' />
            </div>
            <div className='volume'>
              <Slider min={0} max={100} defaultValue={50} onChange={(value) => this.volumeChange(value)} handle={this.handle} />
            </div>
            <div className='volume-icon'>
              <FontAwesomeIcon icon="volume-up" />
            </div>
          </div>


        </div>
      </div>
    );
  }
}

export default App;
