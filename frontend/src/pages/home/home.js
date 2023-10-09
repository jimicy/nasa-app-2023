import React from "react";
import "./home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div data-theme="dark" className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-xl">
          <h1 className="text-7xl font-bold">
            NASA Habitable Exoplanet Adventure
          </h1>
          <p className="py-6">
            <div className="card border">
              <div className="card-body">
                <h2 className="card-title">What is an exoplanet?</h2>
                <p className="text-left">
                  An exoplanet is any planet beyond our solar system. Most orbit
                  other stars, but free-floating exoplanets, called rogue
                  planets, orbit the galactic center and are untethered to any
                  star.
                </p>
              </div>
            </div>
          </p>

          <p className="py-4 text-sm text-left">
            Uses publicly available information on habitable worlds to generate
            a new habitable exoplanet and adventure!
          </p>
          <div className="flex space-x-6 justify-center">
            <Link to="/create">
              <button className="btn btn-primary">Get Started</button>
            </Link>
            <Link to="/gallery">
              <button className="btn btn-primary">Browse Gallery</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;