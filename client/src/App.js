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
      url: "https://click-site.vercel.app/api",
    });

    if (response.status === 200) setStateClicks(response.data);
    return response;
  }

  useEffect(() => {
    getStateClicks();
  }, []);

  return (
    <div className="App">
      <div className="heading">
        <h1>Click the Button</h1>
        <div className="heading-description">
          <p>
            Please allow location permission to record your state accurately
          </p>
          <p>Otherwise clicks will be recorded to unknown</p>
        </div>
      </div>
      <div className="main-content">
        <ClickButton getStateClicks={getStateClicks} />
        <GeographyTable stateClicks={stateClicks} />
      </div>
    </div>
  );
}

export default App;
