import { API_ADDRESS } from "../../lib/config";

function AdventureForm() {
  const tooltip = {
    "Kepler-452b": `Kepler-452b is the first near-Earth-size world to be found in the habitable zone of star that is similar to our sun. Kepler-452b is the first planet orbiting a star about the same size and temperature as the sun.`,
    "Kepler-22b": `Kepler-22b is a super-Earth that could be covered in a super ocean. At 2.4 times Earth’s radius, it might even be gaseous. But theoretically an ocean world tipped on its side – a bit like our solar system’s ice giant, Uranus – turns out to be comfortably habitable based on recent computer modeling.`,
  };

  const onSubmit = async () => {
    const requestBody = {
      language_code: "en",
      exoplant: "Kepler-452b",
      character: {
        name: "John Doe",
        age: 6,
        gender: "male",
        race: "white",
        ethnicity: "not hispanic or latino",
        bio: "John is quick on his feet.",
      },
    };

    fetch(`${API_ADDRESS}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    // @ts-ignore
    document.getElementById("my_modal_1").showModal();
  };

  return (
    <>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box" data-theme="dark">
          <h3 className="font-bold text-lg">Success!</h3>
          <p className="py-4">
            You have submitted the request to generate a custom adventure.
          </p>
          <p>
            It'll take 2-5 minutes to show up in the gallery. In the meantime,
            read other stories in the gallery!
          </p>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <a href="/gallery">
              <button className="btn">Go to Gallery</button>
            </a>
          </div>
        </div>
      </dialog>
      >>>>>>> ae672fe (Add form.)
      <div data-theme="dark" className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-xl">
            <p className="py-6">
              <div className="card border">
                <div className="card-body">
                  <h2 className="card-title">
                    Generate an Exoplanet adventure!
                  </h2>
                  <p className="text-left">
                    We'll generate a custom story using AI on the habitable
                    exoplanet you selected and also insert the character you
                    described into the story!
                  </p>

                  <label className="label">
                    <span className="label-text">Language</span>
                  </label>
                  <select className="select select-bordered w-full max-w-xs">
                    <option>English</option>
                    <option>Chinese</option>
                  </select>

                  <label className="label">
                    <span className="label-text">Habitable Exoplanet</span>
                  </label>

                  <div className="form-control">
                    <label className="label cursor-pointer justify-start space-x-4">
                      <input
                        type="radio"
                        name="radio-10"
                        className="radio checked:bg-blue-500"
                        checked
                      />
                      <span className="label-text">
                        <div
                          className="tooltip tooltip-bottom"
                          data-tip={tooltip["Kepler-452b"]}
                        >
                          Kepler-452b
                        </div>
                      </span>
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer justify-start space-x-4">
                      <input
                        type="radio"
                        name="radio-10"
                        className="radio checked:bg-blue-500"
                        checked
                      />
                      <span className="label-text">
                        <div
                          className="tooltip tooltip-bottom"
                          data-tip={tooltip["Kepler-22b"]}
                        >
                          Kepler-22b
                        </div>
                      </span>
                    </label>
                  </div>

                  <br />
                  <h2 className="card-title">Define your story's character!</h2>
                  <p className="text-left">
                    Write up a quick bio about your character. How would you
                    describe their personality? What are some of their hobbies?
                  </p>

                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-lg	"
                  />

                  <label className="label">
                    <span className="label-text">Age</span>
                  </label>
                  <input
                    type="number"
                    className="input input-bordered w-full max-w-lg	"
                  />

                  <label className="label">
                    <span className="label-text">Gender</span>
                  </label>
                  <select className="select select-bordered w-full max-w-xs">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Non-binary</option>
                  </select>

                  <label className="label">
                    <span className="label-text">Race</span>
                  </label>
                  <select className="select select-bordered w-full max-w-xs">
                    <option>White</option>
                    <option>Black or African American</option>
                    <option>Asian</option>
                    <option>American Indian or Alaska Native</option>
                    <option>Native Hawaiian or Other Pacific Islander</option>
                  </select>

                  <label className="label">
                    <span className="label-text">Ethnicity</span>
                  </label>
                  <select className="select select-bordered w-full max-w-xs">
                    <option>Not Hispanic or Latino</option>
                    <option>Hispanic or Latino</option>
                  </select>

                  <label className="label">
                    <span className="label-text">Character Biography</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered"
                    placeholder="Describe your character!"
                  ></textarea>

                  <button className="btn btn-primary" onClick={onSubmit}>
                    Generate a story
                  </button>
                  {/* Form ends */}
                </div>
              </div>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdventureForm;
