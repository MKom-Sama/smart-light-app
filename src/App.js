import './App.css';

import BulbOffIcon from './assets/BulbOffIcon';
import { useState } from 'react';
import BulbOnIcon from './assets/BulbOnIcon';
import styled from 'styled-components';

function App() {

  const [toggle, setToggle] = useState(false);
  return (
    <div className="App">
      <Header className="App-header" toggle={toggle}>
        <div onClick={()=>setToggle((toggle)=>!toggle)}>
          <IconWrapper toggle={toggle}>
            <BulbOnIcon />
          </IconWrapper>
          <IconWrapper toggle={!toggle}>
            <BulbOffIcon />
          </IconWrapper>
        </div>
      </Header>
    </div>
  );
}

const IconWrapper = styled.div`
  opacity: ${props => props.toggle ? "1" : "0"};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  transition: all .3s ease-in-out;
`

const Header = styled.div`
  background-color:${props => props.toggle ? "white" : "#282c34"};
  transition: all .3s ease-in-out;
`

export default App;
