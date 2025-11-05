import "./App.scss";
import { Route, Routes } from "react-router-dom";
import HomeView from "./views/HomeView.tsx";
import HowToPlayView from "./views/HowToPlayView.tsx";
import CategoriesView from "./views/CategoriesView.tsx";
import GamePlay from "./views/GamePlay.tsx";
import { CATEGORIES } from "./categories.ts";
import { GameProvider } from "./contexts/GameContext.tsx";

function App() {
  return (
    <GameProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/how-to-play" element={<HowToPlayView />} />
          <Route
            path="/categories"
            element={<CategoriesView categories={CATEGORIES} />}
          />
          <Route path="/gameplay" element={<GamePlay />} />
        </Routes>
      </div>
    </GameProvider>
  );
}

export default App;
