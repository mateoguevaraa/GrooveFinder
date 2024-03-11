import { NavBar } from "./components/navbar.jsx";
import { CardsDisplay } from "./components/CardsDisplay.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

function App() {
  return (
    <>
      <NavBar />
      <CardsDisplay />
    </>
  );
}

export default App;
