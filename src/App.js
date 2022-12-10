import './App.css';

import BulbOffIcon from './assets/BulbOffIcon';
import { useState } from 'react';
import BulbOnIcon from './assets/BulbOnIcon';

function App() {

  const [toggle, setToggle] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <div onClick={()=>setToggle((toggle)=>!toggle)}>
         {toggle ? <BulbOnIcon /> : <BulbOffIcon />}
        </div>
      </header>
    </div>
  );
}

export default App;
