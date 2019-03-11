import React, { Component } from 'react';
import posed from 'react-pose'

import airpodSvg from '../_assets/AirPods_Vector.svg'

const AirpodImage = React.forwardRef((props, ref) => (
  <div>
    <img id='airpode-img' draggable={false} onLoad={props.onLoad} ref={ref} src={airpodSvg} className='airpod'/>
  </div>
))

const Airpod = posed(AirpodImage)({
  draggable: 'x',
  init: { scale: 1.0 },
  drag: { scale: 1.1 },
  dragBounds: { left: '-230%', right: '10%' },
})

export default Airpod
