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
      <div className="flex space justify-center">
        <button onClick={prev} className="audio-button">
          <IoPlaySkipBackSharp color="#868686" />
        </button>
        <button onClick={skipBackward} className="audio-button">
          <IoPlayBackSharp color="#868686" />
        </button>

        <button
          onClick={togglePlayPause}
          className="btn btn-circle btn-xs"
          id="circle-button"
        >
          {isPlaying ? (
            <IoPauseSharp color="gray" />
          ) : (
            <IoPlaySharp color="gray" />
          )}
        </button>
        <button onClick={skipForward} className="audio-button">
          <IoPlayForwardSharp color="#868686" />
        </button>
        <button onClick={next} className="audio-button">
          <IoPlaySkipForwardSharp color="#868686" />
        </button>
      </div>
    </div>
  );
};

export default Controls;