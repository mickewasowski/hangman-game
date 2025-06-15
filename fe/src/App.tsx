import "./App.scss";
import { HomeModal } from "./components/modals/HomeModal";
import { GuideCard } from "./components/GuideCard";

function App() {
  return (
    <div className="App">
      {/* <HomeModal /> */}
      <GuideCard index={0o1} title={'Choose a category'} content={'LLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumorem ipsum'}/>
    </div>
  );
}

export default App;
