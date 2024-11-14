import React from 'react';
import './App.css';
import ImageUploader from './components/ImageUploader';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Image to Text Extractor</h1>
        <ImageUploader />
      </header>
    </div>
  );
}

export default App;