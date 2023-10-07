import HTMLFlipBook from "react-pageflip";
import React, { useState, useCallback, useRef } from "react";
import TextToSpeech from "../../componenets/TextToSpeech";
import "./story.css";

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
  const [text, setText] = useState(props.story[0]);
  const book = useRef();

  const onFlip = useCallback((e) => {
    console.log('Current page: ' + e.data);
    // if page is more than cover page
    if (e.data > 0 && e.data + 1 < props.story.length) {
      setText(props.story[e.data] + " " + props.story[e.data+1])
    } else {
      setText(props.story[e.data])
    }
  });

  function speakingDone(e) {
    console.log(e)
    book.current.pageFlip().flipNext()
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
          {props.story.map(function(content, index) {
            if(index === 0) {
              return (
                <PageCover>{content}</PageCover>
              )
            } else if(index === props.story.length-1) {
              return (
                <PageCover>{content}</PageCover>
              )
            } else {
              return (
                <Page number={index}>
                  <hr></hr>
                  {content}
                </Page>
              )
            }
          })}
        </HTMLFlipBook>
        <br></br>
        <br></br>
      </div>
      <div className="formContainer"><TextToSpeech text={text} endHandler={speakingDone}/></div>
    </body>
  );
}

export default MyAlbum;