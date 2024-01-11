// GenrePage.tsx

import React from 'react';

const GenrePage: React.FC = () => {
  return (
    <div>
      <h1>Select a Genre</h1>
      <div className="flex flex-wrap justify-center">
        <div className="genre-card">
          <p>Classical</p>
        </div>
        <div className="genre-card">
          <p>Romantic</p>
        </div>
        <div className="genre-card">
          <p>Hip Hop</p>
        </div>
        <div className="genre-card">
          <p>Jazz</p>
        </div>
        <div className="genre-card">
          <p>Pop</p>
        </div>
        <div className="genre-card">
          <p>Rock</p>
        </div>
      </div>
    </div>
  );
};

export default GenrePage;
