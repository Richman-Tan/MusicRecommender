import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Sidebar';  // Import Sidebar component
import TopTracks from './Components/TopTracks';  // Import TopTracks component
import './App.css';  // Import your CSS for styling

// Home component with login button
function Home() {
  const loginWithSpotify = () => {
    // Redirect to Flask backend login route for Spotify authentication
    window.location.href = 'http://localhost:8080/login';  
  };

  return (
    <div>
      <h1>Spotify Song Analysis</h1>
      <button onClick={loginWithSpotify}>Login with Spotify</button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/top-tracks"
          element={
            <div className="dashboard">
              <Sidebar /> {/* Render Sidebar */}
              <div className="main-content">
                <TopTracks /> {/* Render TopTracks in main content */}
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
