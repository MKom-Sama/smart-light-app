import "./App.css";

import BulbOffIcon from "./assets/BulbOffIcon";
import { useState } from "react";
import BulbOnIcon from "./assets/BulbOnIcon";
import styled from "styled-components";
import { toast } from "react-toastify";
import ToastWrapper from "./ToastWrapper";

function App() {
  const [toggle, setToggle] = useState(false);
  const notify = () =>
    toast.warn("Motion Detected!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });

  return (
    <div className="App">
      <Header className="App-header" toggle={toggle}>
        <div onClick={() => { setToggle((toggle) => !toggle); notify(); }}>
          <IconWrapper toggle={toggle}>
            <BulbOnIcon />
          </IconWrapper>
          <IconWrapper toggle={!toggle}>
            <BulbOffIcon />
          </IconWrapper>
        </div>
      </Header>
      <ToastWrapper />
    </div>
  );
}

const IconWrapper = styled.div`
  opacity: ${(props) => (props.toggle ? "1" : "0")};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease-in-out;
`;

const Header = styled.div`
  background-color: ${(props) => (props.toggle ? "white" : "#282c34")};
  transition: all 0.3s ease-in-out;
`;

export default App;
