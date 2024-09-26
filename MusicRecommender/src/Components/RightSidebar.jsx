import React from 'react';

function RightSidebar() {
  return (
    <div className="right-sidebar">
      <h3>Who To Follow</h3>
      <ul>
        <li>
          <p>Cornelia Davis</p>
          <button>Follow</button>
        </li>
        <li>
          <p>Jimmy French</p>
          <button>Follow</button>
        </li>
        {/* Add more users */}
      </ul>
      <div className="your-likes">
        <h3>Your Likes</h3>
        <ul>
          <li>Why Use External</li>
        </ul>
      </div>
      <div className="sponsor">
        <h3>Sponsored</h3>
        <div className="ads">ADS</div>
      </div>
    </div>
  );
}

export default RightSidebar;
