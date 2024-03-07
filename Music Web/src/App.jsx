import { NavBar } from "./components/Navbar";
import { CardsDisplay } from "./components/CardsDisplay";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

function App() {
  return (
    <>
      <NavBar />
      <main>
        <CardsDisplay />
      </main>
    </>
  );
}

export default App;
