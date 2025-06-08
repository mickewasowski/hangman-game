import "./App.scss";
import { BaseModal } from "./components/modals/BaseModal";
import logo from "./assets/logo.svg";
import IconPlay from "./assets/icon-play.svg?react";

function App() {
  return (
    <div className="App">
      <BaseModal
        header={
          <div>
            <img src={logo} alt={"Hangman-Logo"} />
          </div>
        }
        children={
          <div>
            <button style={{background: 'none', border: 'none'}}>
              <IconPlay />
            </button>
            <button>How to play</button>
          </div>
        }
      />
    </div>
  );
}

export default App;
