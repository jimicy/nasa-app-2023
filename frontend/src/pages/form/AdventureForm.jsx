function AdventureForm() {
    return (
      <div data-theme="dark" className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-xl">
            <p className="py-6">
              <div className="card border">
                <div className="card-body">
                  <h2 className="card-title">What is an exoplanet?</h2>
                  <p className="text-left">
                    An exoplanet is any planet beyond our solar system. Most
                    orbit other stars, but free-floating exoplanets, called
                    rogue planets, orbit the galactic center and are untethered
                    to any star.
                  </p>

                  {/* Form start below here */}
                  <div className="form-control w-full max-w-lg">
                    <label className="label">
                      <span className="label-text">Title of your story</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-lg	"
                    />
                  </div>

                  <label className="label">
                    <span className="label-text">
                      Description of what happens in your story
                    </span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered"
                    placeholder="Description"
                  ></textarea>

                  <button className="btn btn-primary">Generate a story</button>
                  {/* Form ends */}
                </div>
              </div>
            </p>
          </div>
        </div>
      </div>
    );
}

export default AdventureForm;
