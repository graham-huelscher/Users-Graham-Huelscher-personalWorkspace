const express = require('express')
const app = express()
const port = process.argv[2] || 8080

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
app.use(express.static('public'))

app.get('/songs', (req, res) => {
    res.send({songs})
})

function Song(source, title, id, album, artist) {
    this.source = source;
    this.title = title;
    this.id = id;
    this.isSelected = false;
    this.album = album;
    this.artist = artist
  }

const songs = [
    new Song('/music/Beauty-Behind-the-Madness/01-Real-Life.mp3', 'Real Life', 0, '../albums/beauty-behind-the-madness.jpg', 'The Weeknd'),
    new Song('/music/Beauty-Behind-the-Madness/02-Losers-(feat.-Labrinth).mp3', 'Losers (feat. Labrinth)',1,'../albums/beauty-behind-the-madness.jpg', 'The Weeknd'),
    new Song('/music/Beauty-Behind-the-Madness/03-Tell-Your-Friends.mp3', 'Tell Your Friends', 2, '../albums/beauty-behind-the-madness.jpg', 'The Weeknd'),
    new Song('/music/Beauty-Behind-the-Madness/04-Often.mp3', 'Often', 3,'../albums/beauty-behind-the-madness.jpg', 'The Weeknd'),
    new Song('/music/Beauty-Behind-the-Madness/05-The-Hills.mp3', 'The Hills', 4,'../albums/beauty-behind-the-madness.jpg', 'The Weeknd'),
    new Song('/music/Beauty-Behind-the-Madness/06-Acquainted.mp3', 'Acquainted', 5,'../albums/beauty-behind-the-madness.jpg', 'The Weeknd'),
    new Song("/music/Beauty-Behind-the-Madness/07-Can't-Feel-My-Face.mp3", "Can't Feel My Face",6,'../albums/beauty-behind-the-madness.jpg', 'The Weeknd'),
    new Song('/music/Beauty-Behind-the-Madness/08-Shameless.mp3', 'Shameless', 7,'../albums/beauty-behind-the-madness.jpg', 'The Weeknd'),
    new Song('/music/Beauty-Behind-the-Madness/09-Earned-It-(Fifty-Shades-of-Grey).mp3', 'Earned It (Fifty Shades of Grey)', 8,'../albums/beauty-behind-the-madness.jpg', 'The Weeknd'),
    new Song('/music/Beauty-Behind-the-Madness/10-In-the-Night.mp3', 'In the Night', 9,'../albums/beauty-behind-the-madness.jpg', 'The Weeknd'),
    new Song('/music/Beauty-Behind-the-Madness/11-As-You-Are.mp3', 'As You Are ', 10,'../albums/beauty-behind-the-madness.jpg', 'The Weeknd'),
    new Song('/music/Beauty-Behind-the-Madness/12-Dark-Times-(feat.-Ed-Sheeran).mp3', 'Dark Times (feat. Ed Sheeran)', 11,'../albums/beauty-behind-the-madness.jpg', 'The Weeknd'),
    new Song('/music/Beauty-Behind-the-Madness/13-Prisoner-(feat.-Lana-Del-Rey).mp3', 'Prisoner (feat. Lana Del Rey)', 12,'../albums/beauty-behind-the-madness.jpg', 'The Weeknd'),
    new Song('/music/Beauty-Behind-the-Madness/14-Angel.mp3', 'Angel', 13,'../albums/beauty-behind-the-madness.jpg', 'The Weeknd'),
    new Song('/music/The-Weeknd-Singles/King-Of-The-Fall.mp3', 'King Of The Fall', 14,'../albums/king-of-the-fall.jpg', 'The Weeknd'),
    new Song('/music/The-Weeknd-Singles/Or-Nah-(Remix)-(Ft.-Ty-Dolla-$ign-&-Wiz-Khalifa).mp3', 'Or Nah (Remix) (Ft. Ty Dolla $ign & Wiz Khalifa)', 15,'../albums/or-nah.jpg', 'The Weeknd')
  ]

  songs[0].isSelected = true