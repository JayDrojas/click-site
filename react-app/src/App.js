// import logo from './logo.svg';
import axios from "axios";
import "./App.css";
import ClickButton from "./components/ClickButton";
import { useEffect, useState } from "react";
import GeographyTable from "./components/GeographyTable";

function App() {
  const [stateClicks, setStateClicks] = useState([]);

  async function getStateClicks() {
    const response = await axios({
      url: "/api",
    });

    if (response.status === 200) setStateClicks(response.data);
    return response;
  }

  useEffect(() => {
    getStateClicks();
  }, []);

  return (
    <div className="App">
      <ClickButton getStateClicks={getStateClicks} />
      <GeographyTable stateClicks={stateClicks} />
    </div>
  );
}

export default App;
