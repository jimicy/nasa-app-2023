import React from "react";
import "./home.css";

function Home() {
  return (
    <div data-theme="dark" className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold">
            NASA Habitable Exoplanet Adventure Creator
          </h1>
          <p className="py-6">
            What is an exoplanet? An exoplanet is any planet beyond our solar
            system. Most orbit other stars, but free-floating exoplanets, called
            rogue planets, orbit the galactic center and are untethered to any
            star.
          </p>
          <p className="py-4 text-sm">
            Use publicly available information on habitable worlds to generate a
            new habitable exoplanet and adventure!
          </p>
          <div className="flex space-x-6 justify-center">
            <a href="/create">
              <button className="btn btn-primary">Get Started</button>
            </a>
            <a href="/gallery">
              <button className="btn btn-primary">Browse Gallery</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;