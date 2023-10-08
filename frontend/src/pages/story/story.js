import HTMLFlipBook from "react-pageflip";
import React, { useState, useCallback, useRef, useEffect } from "react";
import MediaControls from "../../componenets/multiMedia/multiMedia";
import "./story.css";
import { getStory } from "../../lib/story_api";

const PageCover = React.forwardRef((props, ref) => {
  return (
    <div className="cover" ref={ref} data-density="hard">
      <div>
        <h2>{props.children}</h2>
      </div>
    </div>
  );
});

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="page" ref={ref}>
      <h1>Page Header</h1>
      <p>{props.children}</p>
      <p>{props.number}</p>
    </div>
  );
});

function MyAlbum(props) {
  const book = useRef();
  const audio = useRef();
  const [audioStreamIndex, setAudioStreamIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [duration, setDuration] = useState(0);

  const [storyData, setStoryData] = useState(null);

  useEffect(() => {
    getStory(1).then((data) => {
      console.log(`useEffect storyData`, data);
      setStoryData(data);
    });
  }, []);

  const onFlip = useCallback((e) => {
    // set audio to start of new page
    setAudioStreamIndex(e.data);
  });

  const onLoadedMetadata = () => {
    const seconds = audio.current.duration;
    setDuration(seconds);
  };

  function onPlay(e) {
    setAutoPlay(true);
  }

  function flipForward() {
    book.current.pageFlip().flipNext();
  }

  function flipBackward() {
    book.current.pageFlip().flipPrev();
  }

  function onPause(e) {
    setAutoPlay(false);
  }

  function speakingDone(e) {
    var currentPageFinished = book.current.pageFlip().getCurrentPageIndex();
    //page zero is cover so no page spread just flip over or if book is in portrait mode as then there is no spread
    if (currentPageFinished == 0 || book.current.pageFlip().getOrientation() === 'portrait') {
      flipForward();
      //if audio has gone ahead of shown pages then its time to flip
    } else if (audioStreamIndex > currentPageFinished) {
      flipForward();
    } else if (currentPageFinished + 1 < props.story.length) {
      // if page is not cover or back then there is page spread
      // set audio stream to the spread page
      setAudioStreamIndex(currentPageFinished + 1);
    }
    setAutoPlay(true);
  }

  if (storyData === null) {
    return null;
  }

  return (
    <body>
      <div>
        <HTMLFlipBook
          width={550}
          height={650}
          minWidth={315}
          maxWidth={1000}
          minHeight={420}
          maxHeight={1350}
          showCover={true}
          onFlip={onFlip}
          flippingTime={1000}
          style={{ margin: "0 auto" }}
          maxShadowOpacity={0.5}
          className="album-web"
          ref={book}
        >
          {props.story.map(function (content, index) {
            if (index === 0) {
              return <PageCover>{content}</PageCover>;
            } else if (index === props.story.length - 1) {
              return <PageCover>{content}</PageCover>;
            } else {
              return (
                <Page number={index}>
                  <hr></hr>
                  {content}
                </Page>
              );
            }
          })}
        </HTMLFlipBook>
        <br></br>
        <br></br>
      </div>
      <div className="formContainer">
        <audio
          onLoadedMetadata={onLoadedMetadata}
          src={props.audio[audioStreamIndex]}
          onEnded={speakingDone}
          onPlay={onPlay}
          onPause={onPause}
          autoPlay={autoPlay}
          ref={audio}
        >
          Your browser does not support the audio element.
        </audio>
        <MediaControls
          audioRef={audio}
          duration={duration}
          forward={flipForward}
          back={flipBackward}
          readingIndex={audioStreamIndex}
          total={props.audio.length - 1}
        ></MediaControls>
      </div>
    </body>
  );
}

export default MyAlbum;
