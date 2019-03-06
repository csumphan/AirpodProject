import React, { Component } from 'react'
import posed, { PoseGroup } from 'react-pose'
import ProgressButton from 'react-progress-button'

import Airpod from '../component/Airpod'

import honne from '../_assets/honne.mp3'
import walking from '../_assets/walking.mp3'
import boy from '../_assets/boy4.svg'
import person from '../_assets/person.png'

import "react-progress-button/react-progress-button.css"

const AnimationContainer = posed.div({
  enter: { y: 0, opacity: 1, delay: 300  },
  exit: { y: 50, opacity: 0 }
});

const SubtitleContainer = posed.div({
  enter: { y: 0, opacity: 1, delay: 1000 },
  exit: {
    opacity: 0,
    transition: { duration: 1000 }
  }
})

class Landing extends Component {
  constructor(props) {
    super(props)
    this.song1 = React.createRef()
    this.song2 = React.createRef()

    this.state = {
      song1Playing: true,
      animateStart: false,
      airPodPosition: 0,
      startPosition: 0,
      buttonState: '',
      airPodLoaded: false,
      boyLoaded: false
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

    // Set the point in playback that fadeout begins. This is for a 2 second fade out.
    var fadePoint = sound.currentTime + 0.5;

    var fadeAudio = setInterval(() => {
        // console.log(sound.volume, sound.currentTime, fadePoint)
        // Only fade if past the fade out point or not at zero already
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
    // console.log(x)
    this.setState({ airPodPosition: parseFloat(x) })
  }

  onDragStart = (x) => {
    console.log('DRAG START', this.state.airPodPosition)
    this.setState({ startPosition: this.state.airPodPosition })
  }

  onDragEnd = (blah) => {
    console.log('DRAG END', this.state.airPodPosition)

    if ((this.state.airPodPosition < -88.00 && this.state.startPosition >= -88.00) || (this.state.airPodPosition > -88.00 && this.state.startPosition <= -88.00) ) {
      this.getSoundAndFadeAudio()
    }
  }

  startAnimations = () => {
     this.setState({ animateStart: true })
     this.song1.current.play()
     this.song2.current.play()
  }

  render() {
    return (
      <div className='parent-container'>
        <div className='intro-container'>
          <div className='inner-intro'>
            <h1 className='title'>
              a week without airpods
            </h1>
            <PoseGroup>
            {
              this.state.animateStart && this.state.buttonState === 'success' ?
                <SubtitleContainer key='second'>
                  <h2 className='subtitle'>
                    Drag the airpod off and on the ear.
                  </h2>
                </SubtitleContainer>
                :
                <SubtitleContainer key='first'>
                  <h2 className='subtitle'>
                    This is an interactive application showing stuff. Please press Start to begin.
                  </h2>
                  <div className='button-container'>
                    <ProgressButton onClick={this.startAnimations} state={this.state.buttonState}>
                      start
                    </ProgressButton>
                  </div>
                </SubtitleContainer>
            }
            </PoseGroup>
          </div>
        <audio
          id='song1'
          ref={this.song1}
          src={honne}
          type="audio/mpeg"
          onCanPlay={(x) => console.log('canplay')}
          onCanPlayThrough={() => console.log('can play')}
          loop
          />
        <audio
          id='song2'
          ref={this.song2}
          src={walking}
          type="audio/mpeg"
          onCanPlay={() => {
          }}
          onCanPlayThrough={() => console.log('can play2')}
          muted
          loop
          />

        </div>
          {
            this.state.animateStart &&  (
              <AnimationContainer key='animationcontainer' className='landing-container'>
                <img src={boy} className='boy-image' onLoad={() => this.setState({ boyLoaded: true }, () => this.state.boyLoaded && this.state.airPodLoaded ? this.setState({buttonState: 'success'}) : null)} />
                <Airpod
                  onDragStart={this.onDragStart}
                  onDragEnd={this.onDragEnd}
                  onValueChange={{x: this.onDrag}}
                  onLoad={() => this.setState({ airPodLoaded: true }, () => this.state.boyLoaded && this.state.airPodLoaded ? this.setState({buttonState: 'success'}) : null)}
                />
              </AnimationContainer>
            )
          }

      </div>
    )
  }
}

export default Landing
