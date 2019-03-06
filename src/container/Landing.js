import React, { Component } from 'react'
import Airpod from '../component/Airpod'

import honne from '../_assets/honne.mp3'
import walking from '../_assets/walking.mp3'

class Landing extends Component {
  constructor(props) {
    super(props)
    this.song1 = React.createRef()
    this.song2 = React.createRef()

    this.state = {
      song1Playing: true,
      airPodPosition: 0,
      startPosition: 0,
    }
  }

  rampAudio = (s) => {
    var rampAudio = setInterval(() => {
        // console.log(sound.volume, sound.currentTime, fadePoint)
        // Only fade if past the fade out point or not at zero already
        console.log(s.currentTime, s.volume)
        if ((s.volume >= 0.0)) {
            if (s.volume + 0.1 > 0.9) {
              s.volume = 1
            }
            else {
              s.volume += 0.1;
            }
        }
        // When volume at zero stop all the intervalling
        if (s.volume >= 1.0) {
            clearInterval(rampAudio);
        }
    }, 50);
  }

  getSoundAndFadeAudio = () => {

    const sound = this.state.song1Playing ? this.song1.current : this.song2.current
    const sound2 = this.state.song1Playing ? this.song2.current : this.song1.current

    console.log('sound', sound)
    // Set the point in playback that fadeout begins. This is for a 2 second fade out.
    var fadePoint = sound.currentTime + 0.5;

    var fadeAudio = setInterval(() => {
        // console.log(sound.volume, sound.currentTime, fadePoint)
        // Only fade if past the fade out point or not at zero already
        console.log(sound.currentTime)
        if ((sound.currentTime >= fadePoint) && (sound.volume > 0.0)) {
            if (sound.volume - 0.1 < 0.09) {
              sound.volume = 0
            }
            else {
              sound.volume -= 0.1;
            }
        }
        // When volume at zero stop all the intervalling
        if (sound.volume <= 0.0) {
            clearInterval(fadeAudio);
            console.log(sound2)
            if (sound2.muted) {
              sound2.muted = false
              sound2.volume = 0.0;
            }
            this.rampAudio(sound2)
            this.setState({ song1Playing: !this.state.song1Playing })
        }
    }, 50);
  }

  onDrag = (x) => {
    console.log(x)
    this.setState({ airPodPosition: parseFloat(x) })
  }

  onDragStart = (x,y) => {
    this.setState({ startPosition: this.state.airPodPosition })
  }

  onDragEnd = (blah) => {
    console.log(blah)

    if ((this.state.airPodPosition < -120.00 && this.state.startPosition >= -120.00) || (this.state.airPodPosition > -120.00 && this.state.startPosition <= -120.00) ) {
      this.getSoundAndFadeAudio()
    }
  }

  render() {
    this.song1.current && console.log(this.song1, '')

    return (
      <div>
        <div className='intro-container'>
        <audio
          id='song1'
          ref={this.song1}
          src={honne}
          type="audio/mpeg"
          onCanPlay={() => console.log('can play')}
          onCanPlayThrough={() => console.log('can play')}
          autoPlay
          loop
          />
        <audio
          id='song2'
          ref={this.song2}
          src={walking}
          type="audio/mpeg"
          onCanPlay={() => console.log('can play2')}
          onCanPlayThrough={() => console.log('can play2')}
          muted
          autoPlay
          loop
          />
          <h1 className='title'>
            A week without my AirPods
          </h1>
          <h2 className='subtitle'></h2>
        </div>
        <div className='landing-container'>
          <Airpod
            onDragStart={this.onDragStart}
            onDragEnd={this.onDragEnd}
            onValueChange={{x: this.onDrag}}
          />
        </div>
      </div>
    )
  }
}

export default Landing
