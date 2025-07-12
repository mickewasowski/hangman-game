import "./App.scss";
import {Route, Routes} from "react-router-dom";
import HomeView from "./views/HomeView.tsx";
import HowToPlayView from "./views/HowToPlayView.tsx";
import CategoriesView from "./views/CategoriesView.tsx";

const CATEGORIES = ['movies', 'tv shows', 'countries', 'capital cities', 'animals', 'sports'];
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeView />}/>
        <Route path="/how-to-play" element={<HowToPlayView />} />
        <Route path="/categories" element={<CategoriesView categories={CATEGORIES}/>}/>
        {/* <Route path="/gameplay" /> */}
      </Routes>
    </div>
  );
}

export default App;
