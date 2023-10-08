import React, { useRef, useState, useCallback, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import Controls from "./Controls";
import "./multiMedia.css";


const MediaControls = ({ audioRef, duration, forward, back, readingIndex, total }) => {
    const progressBarRef = useRef()
    const [timeProgress, setTimeProgress] = useState(0);
    const playAnimationRef = useRef();


const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.max = audioRef.current.duration
    progressBarRef.current.style.setProperty(
        '--range-progress',
        `${(progressBarRef.current.value / duration) * 100}%`
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
    }, [audioRef, duration, progressBarRef, setTimeProgress]);

    //if audio source duration is changed make sure progress bar is refreshed
    useEffect(() => {
       repeat()
    }, [duration]);
    
  const handlePlay = () => {
    audioRef.current.play()
    playAnimationRef.current = requestAnimationFrame(repeat);
  };

  const handlePause = () => {
    audioRef.current.pause()
    playAnimationRef.current = requestAnimationFrame(repeat);
  }

  const handleSkipForWard = () => {
    audioRef.current.currentTime += 5;
    playAnimationRef.current = requestAnimationFrame(repeat);
  }

  const handleSkipBackWard = () => {
    audioRef.current.currentTime -= 5;
    playAnimationRef.current = requestAnimationFrame(repeat);
  }


  return (

    <div className="audio-player">
      <div className="controls">
        <ProgressBar progressBarRef={progressBarRef} audioRef={audioRef} timeProgress={timeProgress} duration={duration}/>
        <div style={{paddingLeft: "10px", minWidth: "fit-content"}}> pages {readingIndex}/{total}</div>
        <Controls prev={back} next={forward} onPlay={handlePlay} onPause={handlePause} playAnimationRef={playAnimationRef} skipBackward={handleSkipBackWard} skipForward={handleSkipForWard}/>
       </div>        
    </div>

  );

};


export default MediaControls;