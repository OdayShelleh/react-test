import "./App.css";
import Header from "./components/Header";
import StolenBikes from "./components/StolenBikes/StolenBikes";

function App() {
  return (
    <>
      <Header />
      <main>
        <StolenBikes />
      </main>
    </>
  );
}

export default App;
