import React from 'react';

const Home = ({ handleImageChange }) => {
  return (
    <div>
      <h1>Welcome to Music Recommender</h1>
      <p>Discover new music based on your listening preferences.</p>
      
      {/* Option to toggle image in the sidebar */}
      <div className="image-toggle">
        <label>
          <input 
            type="checkbox" 
            onChange={(e) => handleImageChange(e.target.checked)} 
          /> 
          Toggle Sidebar Image
        </label>
      </div>
    </div>
  );
};

export default Home;
