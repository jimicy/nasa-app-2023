import React, { useRef, useState, useCallback, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import Controls from "./Controls";
import "./MultiMedia.css";

const MediaControls = ({
  audioRef,
  duration,
  forward,
  back,
  readingIndex,
  total,
}) => {
  const progressBarRef = useRef();
  const [timeProgress, setTimeProgress] = useState(0);
  const playAnimationRef = useRef();

  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    // @ts-ignore
    progressBarRef.current.value = currentTime;
    // @ts-ignore
    progressBarRef.current.max = audioRef.current.duration;
    // @ts-ignore
    progressBarRef.current.style.setProperty(
      "--range-progress",
      // @ts-ignore
      `${(progressBarRef.current.value / duration) * 100}%`
    );

    // @ts-ignore
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  //if audio source duration is changed make sure progress bar is refreshed
  useEffect(() => {
    repeat();
  }, [duration]);

  function clamp(min, max, value) {
    return Math.min(Math.max(value, min), max);
  };

  const handlePlay = () => {
    audioRef.current.play();
    // @ts-ignore
    playAnimationRef.current = requestAnimationFrame(repeat);
  };

  const handlePause = () => {
    audioRef.current.pause();
    // @ts-ignore
    playAnimationRef.current = requestAnimationFrame(repeat);
  };

  const handleSkipForWard = () => {
    // make sure they can't skip past duration causes exceptions
    audioRef.current.currentTime = clamp(0, audioRef.current.duration - 0.5, audioRef.current.currentTime + 5);;
    // @ts-ignore
    playAnimationRef.current = requestAnimationFrame(repeat);
  };

  const handleSkipBackWard = () => {
    audioRef.current.currentTime -= 5;
    // @ts-ignore
    playAnimationRef.current = requestAnimationFrame(repeat);
  };

  return (
    <div className="audio-player">
      <div className="controls">
        <ProgressBar
          progressBarRef={progressBarRef}
          audioRef={audioRef}
          timeProgress={timeProgress}
          duration={duration}
        />
        <div
          style={{
            paddingLeft: "10px",
            paddingRight: "10px",
            minWidth: "fit-content",
          }}
        >
          {" "}
          pages {readingIndex}/{total}
        </div>
        <Controls
          prev={back}
          next={forward}
          onPlay={handlePlay}
          onPause={handlePause}
          // @ts-ignore
          playAnimationRef={playAnimationRef}
          audioRef={audioRef}
          skipBackward={handleSkipBackWard}
          skipForward={handleSkipForWard}
        />
      </div>
    </div>
  );
};

export default MediaControls;
