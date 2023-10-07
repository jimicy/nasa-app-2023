# nasa-app-2023

# Setup project for the first time
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
# Run the Python Flask Backend (in one tab)
This activates the local python version
```
source ./venv/bin/activate
```

Run the web server
```
flask run
```

# Run the frontend (in another tab, run the frontend)
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