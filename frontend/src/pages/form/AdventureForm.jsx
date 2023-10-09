import { useState } from "react";
import { API_ADDRESS, SupportedLanguages } from "../../lib/config";

function AdventureForm() {
  const [languageCode, setLanguageCode] = useState("en");
  const [planet, setPlanet] = useState("Kepler-452b");
  const [character, setCharacter] = useState({gender: "Male", race: "White", ethnicity: "Not Hispanic or Latino"});

  const tooltip = {
    "Kepler-452b": `Kepler-452b is the first near-Earth-size world to be found in the habitable zone of star that is similar to our sun. Kepler-452b is the first planet orbiting a star about the same size and temperature as the sun.`,
    "Kepler-22b": `Kepler-22b is a super-Earth that could be covered in a super ocean. At 2.4 times Earth’s radius, it might even be gaseous. But theoretically an ocean world tipped on its side – a bit like our solar system’s ice giant, Uranus – turns out to be comfortably habitable based on recent computer modeling.`,
  };

  function handleOnChangePlanet(e) {
    setPlanet(e.target.value);
  }

  function handleNameChange(e) {
    console.log(character)
    setCharacter({...character, name: e.target.value})
    console.log(character)
  }

  function handleAgeChange(e) {
    setCharacter({...character, age: e.target.value})
  }

  function handleGenderChange(e) {
    setCharacter({...character, gender: e.target.value})
  }

  function handleRaceChange(e) {
    setCharacter({...character, race: e.target.value})
  }

  function handleEthnicChange(e) {
    setCharacter({...character, ethnicity: e.target.value})
  }

  function handleBioChange(e) {
    setCharacter({...character, bio: e.target.value})
  }

  const onSubmit = async () => {
    const requestBody = {
      language_code: languageCode,
      exoplant: planet,
      character: character,
    };

    if (character.name === undefined || character.age === undefined || character.bio === undefined) {
      // @ts-ignore
      document.getElementById("my_modal_2").showModal();
    } else {
      fetch(`${API_ADDRESS}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      // @ts-ignore
      document.getElementById("my_modal_1").showModal();
    }
  };

  function closeModal2() {
    // @ts-ignore
    document.getElementById("my_modal_2").close();
  }

  return (
    <>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box" data-theme="dark">
          <h3 className="font-bold text-lg">Keep writing!</h3>
          <p className="py-4">
            You must fill in all empty fields.
          </p>
          <p>
            Your story awaits!
          </p>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
              <button className="btn" onClick={closeModal2}>Close</button>
          </div>
        </div>
      </dialog>
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
      <div data-theme="dark" className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center" style={{marginTop: '60px'}}>
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
                  <select
                    className="select select-bordered w-full max-w-xs"
                    value={languageCode}
                    onChange={(e) => {
                      console.log(e)
                      setLanguageCode(e.target.value)
                    }}
                  >
                    {SupportedLanguages.map((language, index) => {
                      return (
                        <option key={index} value={language.locale}>
                          {language.language}
                        </option>
                      );
                    })}
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
                        value="Kepler-452b"
                        onChange={handleOnChangePlanet}
                        checked={planet === "Kepler-452b"}
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
                        value="Kepler-22b"
                        onChange={handleOnChangePlanet}
                        checked={planet === "Kepler-22b"}
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
                    onChange={handleNameChange}
                    className="input input-bordered w-full max-w-lg	"
                  />

                  <label className="label">
                    <span className="label-text">Age</span>
                  </label>
                  <input
                    type="number"
                    onChange={handleAgeChange}
                    className="input input-bordered w-full max-w-lg	"
                  />

                  <label className="label">
                    <span className="label-text">Gender</span>
                  </label>
                  <select className="select select-bordered w-full max-w-xs" onChange={handleGenderChange}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                  </select>

                  <label className="label">
                    <span className="label-text">Race</span>
                  </label>
                  <select className="select select-bordered w-full max-w-xs" onChange={handleRaceChange}>
                    <option value="White">White</option>
                    <option value="Black or African American">Black or African American</option>
                    <option value="Asian">Asian</option>
                    <option value="American Indian or Alaska Native">American Indian or Alaska Native</option>
                    <option value="Native Hawaiian or Other Pacific Islander">Native Hawaiian or Other Pacific Islander</option>
                  </select>

                  <label className="label">
                    <span className="label-text">Ethnicity</span>
                  </label>
                  <select className="select select-bordered w-full max-w-xs" onChange={handleEthnicChange}>
                    <option>Not Hispanic or Latino</option>
                    <option>Hispanic or Latino</option>
                  </select>

                  <label className="label">
                    <span className="label-text">Character Biography</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered"
                    placeholder="Describe your character!"
                    onChange={handleBioChange}
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
