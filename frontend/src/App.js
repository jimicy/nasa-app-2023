import Home from './pages/home/home';
import MyAlbum from './pages/story/story';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import './App.css';

const Config = {
  API_ADDRESS: "http://localhost:5000/api",
  WEB_ADDRESS: "http://localhost:5000",
};

// eslint-disable-next-line no-restricted-globals
const ORIGIN_URL = new URL(location.origin);
if (ORIGIN_URL.port === "3000") {
  ORIGIN_URL.port = "5000";
}
export const API_ADDRESS = `${ORIGIN_URL.toString()}api`;

// eslint-disable-next-line no-restricted-globals
export const PUBLIC_URL = location.origin;

// Make a test API call to ensure the API is running
fetch(`${API_ADDRESS}/test`).then((res) => {
  console.log("GET /api/test returned", res);
});

function App() {
  return (
      <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<MyAlbum 
                story={["coverPage","page1", "page2", "page3", "page4", "backPage"]}
                audio={["sample-0.mp3", "sample-1.mp3", "sample-2.mp3", "sample-3.mp3", "sample-4.mp3", "sample-5.mp3"]}/>} />
            </Routes>
      </Router>
  );
}

export default App;
