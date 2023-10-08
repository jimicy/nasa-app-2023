import { useState } from 'react';

// icons
import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
} from 'react-icons/io5';

import './Controls.css';

const Controls = ({onPlay, onPause, skipForward, skipBackward, prev, next}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
    if(isPlaying) {
        onPause();
    } else {
        onPlay();
    }
  };

  return (
    <div className="controls-wrapper">
      <div className="controls">
        <button onClick={prev} className='button'>
          <IoPlaySkipBackSharp color='#868686'/>
        </button>
        <button onClick={skipBackward} className='button'>
          <IoPlayBackSharp color='#868686'/>
        </button>
        <button onClick={togglePlayPause} className='circle-button'>
          {isPlaying ? <IoPauseSharp color='white'/> : <IoPlaySharp color='white'/>}
        </button>
        <button onClick={skipForward} className='button'>
          <IoPlayForwardSharp color='#868686'/>
        </button>
        <button onClick={next} className='button'>
          <IoPlaySkipForwardSharp color='#868686'/>
        </button>
      </div>
    </div>
  );
};

export default Controls;