# MoonRabbit AI - Exoplanet Adventure

MoonRabbit is a AI powered storybook generator that creates customized storytelling experience with comic book style visuals of astronauts exploring the exoplanets and discovered the new habitable worlds. It supports 133 languages for the story and also provides audio narration.

This project is aim to create a customized and tailored storytelling experience to the audience. It allows interactive components for users to create their favorite characters on their own to embark the exploration journey to exoplanets. We combine both the latest technology of ChatGPT and Stable Diffusion to create unique story for the children, we will this will be an inclusive experience and also inspire children to learn about the space and exoplanets.

Submitted as part of: https://www.spaceappschallenge.org/2023/find-a-team/moonrabbit/?tab=project

# Code References
Built with the following open source languages/frameworks/libraries.

+ Website
  + [React](https://react.dev/)
  + [TailwindCSS](https://tailwindcss.com/)
  + [DaisyUI](https://daisyui.com/)
  + [St Page Flip](https://nodlik.github.io/react-pageflip/)

+ Backend
  + Python
  + Flask

+ APIs we relied on
  + [GPT API](https://platform.openai.com/) to generate a unique story based on the exoplanet.
  + [Stable diffusion API](https://stability.ai/) to generate images from descriptions.
  + Text to Speech APIs ([Google Cloud](https://cloud.google.com/text-to-speech?hl=en), [Eleven Labs](https://elevenlabs.io/))

# Setup
## Setup project for the first time
Setup local python environment
```
python3 -m venv venv
source ./venv/bin/activate
pip install -r requirements.txt
```

Setup frontend react environment
```
cd frontend
npm install
```
## Run the Python Flask Backend (in one tab)
This activates the local python version
```
source ./venv/bin/activate
```

Run the web server
```
flask run
```

## Run the frontend (in another tab, run the frontend)
```
cd frontend
npm start
```

Navigate to the url `npm run dev` outputs.

## Frontend coding
All frontend web calls to python flask backend should use the `API_ADDRESS` defined in App.tsx

```typescript
const response = await fetch(`${API_ADDRESS}/upload`, {
    method: "POST",
    body: formData,
});
```

All assets should be added to `frontend/public` folder. When referencing the assets.
Use the `PUBLIC_URL` defined in App.tsx
```tsx
<img src={`${PUBLIC_URL}/toucan_logo.svg`} alt="toucan logo" />
```