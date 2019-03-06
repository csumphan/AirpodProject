import React, { Component } from 'react';
import posed from 'react-pose'

import airpodSvg from '../_assets/AirPods_Vector.svg'
////s//
const AirpodImage = React.forwardRef((props, ref) => (
  <div>
    <img id='airpode-img' draggable={false} ref={ref} src={airpodSvg} className='airpod'/>
  </div>
))

const Airpod = posed(AirpodImage)({
  draggable: 'x',
  init: { scale: 1.0 },
  drag: { scale: 1.1 },
  dragBounds: { left: '-230%', right: '10%' },
  // passive: {
  //   opacity: ['x', interpolate(
  //     [-200, -100, 100, 200],
  //     [0, 1, 1, 0]
  //   )]
  // }
})

export default Airpod