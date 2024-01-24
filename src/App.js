import React from 'react';
import QRCodeGenerator from './components/QRCodeGenerator/QRCodeGenerator';
import './App.css';

function App() {
  return (
    <div className="App">
      <QRCodeGenerator />
      <div className="footer">
        <h4>2024 &copy; Karam Afandi</h4>
      </div>
    </div>
  );
}

export default App;
