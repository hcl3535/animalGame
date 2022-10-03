import { useState } from 'react'
import bloop from './audio/Cartoon Accent.mp3'
import fail from './audio/Fail 2.mp3'
import cheering from './audio/Kids Cheering.mp3'
import singing from './audio/Lucy Lockey Game Audio.mp3'
import volumeIcon from './images/Speaker_Icon.svg.png'

function VolumeSlider({setVolume}){

  let bloopSound = new Audio(bloop)
  let failSound = new Audio(fail)
  let cheeringSound = new Audio(cheering)
  let singingSound = new Audio(singing)

  const allSounds = [bloopSound, failSound, cheeringSound, singingSound]
  const [currentVolume, setCurrentVolume] = useState(.1)
  
  

    return(
      <div className='volumeContainer'>
        <img
          src={volumeIcon} 
          alt=''
          className='volumeIcon'
          />
        <input
          className='volumeSlider'
          type="range"
          min={0}
          max={1}
          step={0.02}
          value={currentVolume}
          onChange={event => {
            setCurrentVolume(event.target.valueAsNumber)
            setVolume(event.target.valueAsNumber)
          }}
        />
      </div>
    )
}

export default VolumeSlider