import React from 'react';
import { PButton, PInput } from '../../src';
import '../../src/styles/index.scss';

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Component Development Environment</h1>
      <div style={{ marginBottom: '1rem' }}>
        <PButton variant="contained">Test Button</PButton>
      </div>
      <div>
        <PInput placeholder="Test Input" />
      </div>
    </div>
  );
}

export default App;
