import React from "react";
import "./home.css";

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Home Page
        </p>
        <a
          className="App-link"
          href="/about"
          target="_blank"
          rel="noopener noreferrer"
        >
            StoryTime
        </a>
      </header>
    </div>
  );
}

export default Home;