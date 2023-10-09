import React, { useState, useEffect } from "react";
import { getStories } from "../../lib/story_api";

function Gallery() {

  const [gallery, setGalleryData] = useState([]);

  useEffect(() => {
    getStories().then((data) => {
      setGalleryData(data);
    });
  }, []);
  
  return (
    <div data-theme="dark" className="hero min-h-screen bg-base-200">
      <div className="hero text-center" style={{ overflow: "scroll" }}>
        <div className="max-w-screen-2xl">
          <div className="carousel carousel-center rounded-box space-x-4">

            {gallery.map(function (book, index) {
                return (
                  <div className="carousel-item w-80 card card-compact w-96 bg-base-100 shadow-xl" key={index}>
                    <figure>
                      <img
                        src={book.cover_image_url}
                        alt={book.description}
                      />
                    </figure>
                    <div className="card-body justify-start">
                      <h2 className="card-title">{book.title}</h2>
                      <p className="text-left">
                        {book.description}
                      </p>
                      <div className="card-actions">
                        <a href={`/story?book=${book.id}`}>
                          <button className="btn btn-outline">Read</button>
                        </a>
                      </div>
                    </div>
                  </div>);
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
