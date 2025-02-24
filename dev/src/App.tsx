import React from 'react';

function App() {
  const [count, setCount] = React.useState(0);
  
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Component Development Environment</h1>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setCount(c => c + 1)}>
          Count is: {count}
        </button>
      </div>
    </div>
  );
}

export default App;
