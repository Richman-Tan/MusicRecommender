import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TopTracks() {
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    const fetchTopTracks = async () => {
      const response = await axios.get('http://localhost:8080/api/top-tracks', { withCredentials: true });
      setTopTracks(response.data.top_tracks);
    };
    fetchTopTracks();
  }, []);

  return (
    <div className="top-tracks">
      <h2>Your Spotify Top Tracks</h2>
      <div className="track-list">
        {topTracks.map((track, index) => (
          <div className="track-item" key={index}>
            <div className="track-info">
              <img src={track.album_cover} alt={track.track_name} className="album-cover" />
              <div>
                <h4>{track.track_name}</h4>
                <p>{track.artist}</p>
                <p>Duration: {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')} mins</p>
              </div>
            </div>
            <div className="track-controls">
              <button>Play</button>
              <span>{track.duration} secs</span>
              <button>Download</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopTracks;
