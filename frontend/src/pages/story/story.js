import HTMLFlipBook from "react-pageflip";
import React, { useState, useCallback, useRef, useEffect } from "react";
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
  const [audioStreamIndex, setAudioStreamIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  const [storyData, setStoryData] = useState(null);

  useEffect(() => {
    getStory(1).then((data) => {
      console.log(`useEffect storyData`, data);
      setStoryData(data);
    });
  }, []);

  const onFlip = useCallback((e) => {
    console.log("Current page: " + e.data);
    // set audio to start of new page
    setAudioStreamIndex(e.data);
  });

  function onPlay(e) {
    setAutoPlay(true);
  }

  function onPause(e) {
    setAutoPlay(false);
  }

  function speakingDone(e) {
    var currentPageFinished = book.current.pageFlip().getCurrentPageIndex();
    //page zero is cover so no page spread just flip over
    if (currentPageFinished == 0) {
      book.current.pageFlip().flipNext();
      //if audio has gone ahead of shown pages then its time to flip
    } else if (audioStreamIndex > currentPageFinished) {
      book.current.pageFlip().flipNext();
    } else if (currentPageFinished + 1 < props.story.length) {
      // if page is not cover or back then there is page spread
      // set audio stream to the spread page
      setAudioStreamIndex(currentPageFinished + 1);
    }
    setAutoPlay(true);
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
          controls
          src={props.audio[audioStreamIndex]}
          onEnded={speakingDone}
          onPlay={onPlay}
          onPause={onPause}
          autoPlay={autoPlay}
        >
          Your browser does not support the audio element.
        </audio>
      </div>
    </body>
  );
}

export default MyAlbum;
