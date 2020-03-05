import React, { useState } from 'react';
import { UserContext } from './UserContext';
import Home from './components/Home';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <Home />
      </UserContext.Provider>
    </div>
  );
}

export default App;
