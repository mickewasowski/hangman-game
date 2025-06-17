import "./App.scss";
import {Route, Routes} from "react-router-dom";
import HomeView from "./views/HomeView";
import HowToPlayView from "./views/HowToPlayView";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeView />}/>
        <Route path="/how-to-play" element={<HowToPlayView />} />
        {/* <Route path="/categories" /> */}
        {/* <Route path="/gameplay" /> */}
      </Routes>
    </div>
  );
}

export default App;
