import './App.css';

import BulbOffIcon from './assets/BulbOffIcon';
import { useState } from 'react';
import BulbOnIcon from './assets/BulbOnIcon';

function App() {

  const [toggle, setToggle] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        {toggle ? <BulbOnIcon /> : <BulbOffIcon />}

        <button onClick={()=>setToggle((toggle)=>!toggle)}>Click</button>
      </header>
    </div>
  );
}

export default App;
