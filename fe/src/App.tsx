import "./App.scss";
import {Route, Routes} from "react-router-dom";
import HomeView from "./views/HomeView";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeView />}/>
        <Route path="/how-to-play" />
        <Route path="/categories" />
        <Route path="/gameplay" />
      </Routes>
    </div>
  );
}

export default App;
