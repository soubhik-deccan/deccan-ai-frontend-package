import React from 'react';

function App() {
  const [count, setCount] = React.useState(0);
  
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Component Development Environment</h1>
      <div style={{ marginBottom: '1rem' }}>
        <button 
          onClick={() => setCount(c => c + 1)}
          style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Clicked {count} times
        </button>
      </div>
    </div>
  );
}

export default App;
