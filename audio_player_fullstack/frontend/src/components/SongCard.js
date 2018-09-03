import React from 'react';
import { Link } from 'react-router-dom'

const SongCard = (props) => {
    const { title, id, changeSong, album, cardColor, buttonColor, linkColor } = props
    return (<div className='col-md-4 col-lg-3 d-flex'>
        <div className={cardColor+ " card flex-fill text-center text-white mb-3"}>
            <img style={{ objectFit: 'cover' }} className="card-img-top" src={album} alt="Card cap" />
            <div className="card-body">
            <Link to={'/'+title+'-'+id} ><h5 style={linkColor} className="card-title">{title}</h5></Link>
                <button onClick={() => changeSong(id)} type="button" className={buttonColor + " btn play-button"}>
                    Play
                </button>
            </div>
        </div>

    </div >

    )
}

export default SongCard