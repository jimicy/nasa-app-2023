import HTMLFlipBook from "react-pageflip";
import React, { useState, useCallback, useRef, useEffect } from "react";
import MediaControls from "../../componenets/multiMedia/MultiMedia";
import "./story.css";
import { getStory } from "../../lib/story_api";
import { useLocation } from 'react-router-dom';
import "./stars.css";

const PageCover = React.forwardRef((props, ref) => {
  return (
    <div className="cover" ref={ref} data-density="hard">
      <div style={{backgroundImage: `url(${props.image.url})`, height: '100%', backgroundSize: 'cover', paddingTop: '1px'}}>
        <h2 style={{color: "white", fontWeight: "bold", fontSize: "2em"}}>{props.children}</h2>
      </div>
    </div>
  );
});

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="page" ref={ref}>
      <div style={{backgroundImage: `url(${props.image.url})`, height: '50%', backgroundSize: 'cover', paddingTop: '1px'}}>
        <div className="pageNumber" style={{float: props.number % 2 !== 0 ? 'float': 'right'}}>
          {props.number}
        </div>
      </div>
      <p style={{margin:'10px'}}>{props.children}</p>
    </div>
  );
});

function MyAlbum(props) {
  const book = useRef();
  const audio = useRef();
  const [audioStreamIndex, setAudioStreamIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [duration, setDuration] = useState(0);
  const path = useLocation();
  const [storyData, setStoryData] = useState(null);

  useEffect(() => {
    const storyId = new URLSearchParams(path.search).get('book');
    getStory(storyId).then((data) => {
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
    } else if (currentPageFinished + 1 < storyData.pages.length) {
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
    <div className="bookContainer">
      <div className="stars"></div>
      <div className="clouds"></div>
      <div style={{padding: '100px 20px 60px', display: 'flex', justifyContent: 'center'}}>
        <HTMLFlipBook
          width={650}
          height={750}
          minWidth={515}
          maxWidth={800}
          minHeight={620}
          maxHeight={1150}
          showCover={true}
          onFlip={onFlip}
          size="stretch"
          flippingTime={1000}
          maxShadowOpacity={0.5}
          className="album-web"
          ref={book}
        >
          {storyData.pages.map(function (page, index) {
            if(index === 0 ) {
              return <PageCover image={page.story_page_image[0]} key={index}>{page.title}</PageCover>
            }  
            
            else {
              return (
                <Page number={index} image={page.story_page_image[0]} key={index}>
                  {page.text}
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
          src={storyData.pages[audioStreamIndex].story_page_audio.url}
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
          total={storyData.pages.length - 1}
        ></MediaControls>
      </div>
    </div>
  );
}

export default MyAlbum;
